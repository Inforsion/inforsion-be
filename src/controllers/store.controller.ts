import {
  createStoreService,
  StoreServiceError,
  getStoreService,
  deleteStoreService,
  getStoreDetailService,
  updateStoreService,
} from '../services/store.service';
import express, { Express, NextFunction, Request, Response } from 'express';
import { Store } from '../types/Store';

interface User extends Express.User {
  id: number;
}

async function createStore(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, location, description, phoneNumber, email, openingHours } =
      req.body;

    const userId = (req.user as User).id;

    const response = await createStoreService({
      name,
      location,
      description,
      phoneNumber,
      email,
      openingHours,
      userId,
    });
    if (response) {
      res.status(201).json({
        message: '스토어가 정상적으로 생성되었습니다.',
        storeInfo: response,
      });
    }
  } catch (e: any) {
    console.error('스토어 생성 중 문제', e.message);
    res.status(400).json({
      message: '스토어 생성 중 문제 발생',
      cause: e.message,
    });
    next(e);
  }
}

// 하나의 유저가 생성한 모든 가게의 정보
async function getStores(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req.user as User).id;
    const storeList = await getStoreService(userId);
    if (storeList) {
      res.status(200).json({
        message: '가게를 목록입니다.',
        storeList: storeList,
      });
    } else {
      res.status(400).json({
        message: '가게를 목록이 없습니다.',
        storeList: [],
      });
    }
  } catch (e) {
    next(e);
  }
}

async function getStoreDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const storeId = Number(req.params.id);
    const store = await getStoreDetailService(storeId);
    if (store) {
      res.status(200).json({
        message: '가게 세부 내역입니다.',
        store: store,
      });
    } else {
      res.status(400).json({
        message: '조회할 가게가 없습니다.',
      });
    }
  } catch (e) {
    res.status(400).json({
      message: '가게 조회를 실패했습니다.',
    });
    next(e);
  }
}

// 수정
async function updateStore(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req.user as User).id;
    const { id } = req.params;
    const storeId = Number(id);
    const { name, location, description, phoneNumber, email, openingHours } =
      req.body;
    const updateData = {
      name,
      location,
      description,
      phoneNumber,
      email,
      openingHours,
    };
    const store = await updateStoreService(userId, storeId, updateData);

    if (store) {
      res.status(200).json({
        message: '가게를 성공적으로 수정했습니다.',
        storeId: store.id,
        updateData: updateData,
      });
    } else {
      res.status(400).json({
        message: '수정할 가게가 없습니다.',
        storeId: -1,
      });
    }
  } catch (e) {
    next(e);
  }
}

// 삭제
async function deleteStore(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req.user as User).id;
    const { storeId } = req.params;
    const store = await deleteStoreService(userId, Number(storeId));

    console.log('store', store);

    if (store) {
      res.status(200).json({
        message: '가게를 성공적으로 삭제했습니다.',
        storeId: storeId,
      });
    } else {
      res.status(400).json({
        message: '삭제할 가게가 없습니다.',
        storeId: -1,
      });
    }
  } catch (e) {
    next(e);
  }
}

export { createStore, getStores, getStoreDetail, updateStore, deleteStore };
