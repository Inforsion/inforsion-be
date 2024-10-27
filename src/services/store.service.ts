import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../prisma/client';
import User$storesArgs = Prisma.User$storesArgs;
import StoreSelect = Prisma.StoreSelect;
import { Store } from '../types/Store';

class StoreServiceError extends Error {
  type: string;

  constructor(message: string, type: string) {
    super(message);
    this.name = 'StoreServiceError';
    this.type = type;
  }
}
type StoreData = Omit<Prisma.StoreCreateInput, 'users'> & { userId: number };

async function createStoreService(data: StoreData) {
  try {
    // 같은 사용자의 가게들 중 이름이 중복되는지 확인
    const existingStore = await prisma.store.findFirst({
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

    const response = await prisma.store.create({ data });
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

async function getStoreService(userId: number) {
  try {
    return prisma.store.findMany({ where: { userId } });
  } catch (error: any) {
    console.error('Unexpected error in getStoreService:', error);
    throw new StoreServiceError(
      'An unexpected error occurred while retrieving the stores',
      'INTERNAL_ERROR'
    );
  }
}

async function getStoreDetailService(storeId: number) {
  try {
    return prisma.store.findUnique({ where: { id: storeId } });
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
  updateData: Prisma.StoreUpdateInput
) {
  const store = await prisma.store.findFirst({
    where: { userId, id: storeId },
  });

  if (!store) {
    throw new StoreServiceError(
      '스토어를 찾을 수 없습니다. 해당 가게에 대한 권한이 없거나 가게가 없는지 확인해주세요.',
      'NOT_FOUND'
    );
  }

  return prisma.store.update({
    where: { id: store.id },
    data: updateData,
  });
}

async function deleteStoreService(userId: number, storeId: number) {
  const store = await prisma.store.findFirst({
    where: { userId, id: storeId },
  });

  console.log('store', store);

  if (!store) {
    throw new StoreServiceError(
      '스토어를 찾을 수 없습니다. 해당 가게에 대한 권한이 없거나 가게가 없는지 확인해주세요.',
      'NOT_FOUND'
    );
  }

  return prisma.store.delete({
    where: { id: storeId },
  });
}

const isStoreOwner = async (userId: number, storeId: number) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });
    console.log('store', store);

    if (!store) return false;
    else return store.userId === userId;
  } catch (err) {
    throw err;
  }
};

export {
  isStoreOwner,
  createStoreService,
  StoreServiceError,
  getStoreService,
  getStoreDetailService,
  deleteStoreService,
  updateStoreService,
};
