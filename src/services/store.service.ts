import { Model } from 'sequelize';
import db from '../models';

class StoreServiceError extends Error {
  type: string;

  constructor(message: string, type: string) {
    super(message);
    this.name = 'StoreServiceError';
    this.type = type;
  }
}

interface StoreData {
  id: number;
  name: string;
  location: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  openingHours?: string;
  userId: number;
}

async function createStoreService(
  name: string,
  location: string,
  description: string,
  phoneNumber: string,
  email: string,
  openingHours: string,
  userId: number
): Promise<{ id: number; name: string } | void> {
  try {
    const data: Omit<StoreData, 'id'> = {
      name,
      location,
      description,
      phoneNumber,
      email,
      openingHours,
      userId,
    };

    console.log('=>(store.service.ts:23) data', data);

    const isMatch = await db.Store.findOne({ where: { name: name } });
    if (isMatch) {
      throw new StoreServiceError(
        '이름이 같은 스토어가 이미 존재합니다.',
        'DUPLICATE_ERROR'
      );
    }

    if (!name || !location) {
      throw new StoreServiceError(
        '스토어의 이름과 위치는 필수입니다.',
        'VALIDATION_ERROR'
      );
    }

    const response = await db.Store.create(data);
    console.log('=>(store.service.ts:24) Store created:', response.id);
    return { id: response.id, name: response.name };
  } catch (error: any) {
    if (error instanceof StoreServiceError) {
      throw error;
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      throw new StoreServiceError(
        'A store with this name already exists',
        'DUPLICATE_ERROR'
      );
    } else {
      console.error('Unexpected error in createStoreService:', error);
      throw new StoreServiceError(
        'An unexpected error occurred while creating the store',
        'INTERNAL_ERROR'
      );
    }
  }
}

async function getStoreService(userId: number): Promise<Model[]> {
  try {
    return db.Store.findAll({ where: { userId: userId } });
  } catch (error: any) {
    if (error instanceof StoreServiceError) {
      throw error;
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      throw new StoreServiceError(
        'A store with this name already exists',
        'DUPLICATE_ERROR'
      );
    } else {
      console.error('Unexpected error in getStoreService:', error);
      throw new StoreServiceError(
        'An unexpected error occurred while retrieving the stores',
        'INTERNAL_ERROR'
      );
    }
  }
}

async function getStoreDetailService(storeId: number) {
  try {
    return db.Store.findOne({ where: { id: storeId } });
  } catch (error: any) {
    if (error instanceof StoreServiceError) {
      throw error;
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      throw new StoreServiceError(
        'A store with this name already exists',
        'DUPLICATE_ERROR'
      );
    } else {
      console.error('Unexpected error in getStoreDetailService:', error);
      throw new StoreServiceError(
        'An unexpected error occurred while retrieving the store details',
        'INTERNAL_ERROR'
      );
    }
  }
}

async function updateStoreService(
  userId: number,
  storeId: number,
  updateData: Partial<StoreData>
) {
  try {
    const store = await db.Store.findOne({
      where: { userId: userId, id: storeId },
    });

    if (!store) {
      throw new StoreServiceError('Store not found', 'NOT_FOUND');
    }

    return await db.Store.update(
      { ...updateData },
      {
        where: {
          id: store.id,
        },
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new StoreServiceError(
      'An unexpected error occurred while updating the store',
      'INTERNAL_ERROR'
    );
  }
}

async function deleteStoreService(userId: number, storeId: number) {
  try {
    const store = await db.Store.findOne({
      where: { userId: userId, id: storeId },
    });

    if (!store) {
      throw new StoreServiceError('Store not found', 'NOT_FOUND');
    }

    return await db.Store.destroy({
      where: {
        id: store.id,
      },
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
