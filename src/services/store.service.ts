import { Prisma, PrismaClient, stores } from '@prisma/client';

const prisma = new PrismaClient();

class StoreServiceError extends Error {
  type: string;

  constructor(message: string, type: string) {
    super(message);
    this.name = 'StoreServiceError';
    this.type = type;
  }
}
type StoreData = Omit<Prisma.storesCreateInput, 'users'> & { userId: number };

async function createStoreService(data: StoreData): Promise<stores> {
  try {
    // 같은 사용자의 가게들 중 이름이 중복되는지 확인
    const existingStore = await prisma.stores.findFirst({
      where: {
        AND: [{ name: data.name }, { userId: data.userId }],
      },
    });

    if (existingStore) {
      throw new StoreServiceError(
        '해당 사용자는 이미 같은 이름의 가게를 가지고 있습니다.',
        'DUPLICATE_ERROR'
      );
    }

    if (!data.name || !data.location) {
      throw new StoreServiceError(
        '스토어의 이름과 위치는 필수입니다.',
        'VALIDATION_ERROR'
      );
    }

    const response = await prisma.stores.create({ data });
    console.log('=>(store.service.ts:24) Store created:', response.id);
    return response;
  } catch (error) {
    if (error instanceof StoreServiceError) {
      throw error;
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new StoreServiceError(
          '예기치 않은 중복 오류가 발생했습니다.',
          'DUPLICATE_ERROR'
        );
      }
    }
    console.error('Unexpected error in createStoreService:', error);
    throw new StoreServiceError(
      'An unexpected error occurred while creating the store',
      'INTERNAL_ERROR'
    );
  }
}

async function getStoreService(userId: number): Promise<stores[]> {
  try {
    return prisma.stores.findMany({ where: { userId } });
  } catch (error: any) {
    console.error('Unexpected error in getStoreService:', error);
    throw new StoreServiceError(
      'An unexpected error occurred while retrieving the stores',
      'INTERNAL_ERROR'
    );
  }
}

async function getStoreDetailService(storeId: number): Promise<stores | null> {
  try {
    return prisma.stores.findUnique({ where: { id: storeId } });
  } catch (error: any) {
    console.error('Unexpected error in getStoreDetailService:', error);
    throw new StoreServiceError(
      'An unexpected error occurred while retrieving the store details',
      'INTERNAL_ERROR'
    );
  }
}

async function updateStoreService(
  userId: number,
  storeId: number,
  updateData: Prisma.storesUpdateInput
): Promise<stores> {
  try {
    const store = await prisma.stores.findFirst({
      where: { userId, id: storeId },
    });

    if (!store) {
      throw new StoreServiceError('Store not found', 'NOT_FOUND');
    }

    return prisma.stores.update({
      where: { id: store.id },
      data: updateData,
    });
  } catch (error: any) {
    console.error(error);
    throw new StoreServiceError(
      'An unexpected error occurred while updating the store',
      'INTERNAL_ERROR'
    );
  }
}

async function deleteStoreService(
  userId: number,
  storeId: number
): Promise<stores> {
  try {
    const store = await prisma.stores.findFirst({
      where: { userId, id: storeId },
    });

    if (!store) {
      throw new StoreServiceError('Store not found', 'NOT_FOUND');
    }

    return prisma.stores.delete({
      where: { id: store.id },
    });
  } catch (error: any) {
    console.error(error);
    throw new StoreServiceError(
      'An unexpected error occurred while deleting the store',
      'INTERNAL_ERROR'
    );
  }
}

export {
  createStoreService,
  StoreServiceError,
  getStoreService,
  getStoreDetailService,
  deleteStoreService,
  updateStoreService,
};
