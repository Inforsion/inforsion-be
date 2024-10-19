import { Request, Response } from 'express';
import { Product, User } from '@prisma/client';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  isStoreOwner,
} from '../services/product.service';

export const postProduct = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const userId = (req.user as User).id;

    if (!(await isStoreOwner(userId, body.storeId))) {
      return res
        .status(403)
        .json({ message: '해당 가게에 대한 권한이 없습니다.' });
    }

    const product = await createProduct(body as Product);
    if (product) {
      res.status(201).json({
        message: '상품이 성공적으로 생성되었습니다.',
        productInfo: product,
      });
    } else {
      res.status(400).json({ message: '상품 생성 중 문제 발생' });
    }
  } catch (err: any) {
    console.error('상품 생성 중 문제 발생', err);
    res.status(400).json({
      message: '상품 생성 중 문제 발생',
      cause: err.message,
    });
  }
};

export const putProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const userId = (req.user as User).id;

    const existingProduct = await getProductById(Number(id));
    if (!existingProduct) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    if (!(await isStoreOwner(userId, existingProduct.storeId))) {
      return res
        .status(403)
        .json({ message: '해당 가게에 대한 권한이 없습니다.' });
    }

    const updatedProduct = await updateProduct(Number(id), body as Product);
    res.status(200).json({
      message: '상품이 성공적으로 수정되었습니다.',
      productInfo: updatedProduct,
    });
  } catch (err: any) {
    console.error('상품 수정 중 문제 발생', err);
    res.status(400).json({
      message: '상품 수정 중 문제 발생',
      cause: err.message,
    });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req.user as User).id;

    const existingProduct = await getProductById(Number(id));
    if (!existingProduct) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    if (!(await isStoreOwner(userId, existingProduct.storeId))) {
      return res
        .status(403)
        .json({ message: '해당 가게에 대한 권한이 없습니다.' });
    }

    await deleteProduct(Number(id));
    res.status(200).json({ message: '상품이 성공적으로 삭제되었습니다.' });
  } catch (err: any) {
    console.error('상품 삭제 중 문제 발생', err);
    res.status(400).json({
      message: '상품 삭제 중 문제 발생',
      cause: err.message,
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req.user as User).id;

    const product = await getProductById(Number(id));
    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    if (!(await isStoreOwner(userId, product.storeId))) {
      return res
        .status(403)
        .json({ message: '해당 가게에 대한 권한이 없습니다.' });
    }

    res.status(200).json({ productInfo: product });
  } catch (err: any) {
    console.error('상품 조회 중 문제 발생', err);
    res.status(400).json({
      message: '상품 조회 중 문제 발생',
      cause: err.message,
    });
  }
};

export const getAllProductsByStore = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const userId = (req.user as User).id;

    if (!(await isStoreOwner(userId, Number(storeId)))) {
      return res
        .status(403)
        .json({ message: '해당 가게에 대한 권한이 없습니다.' });
    }

    const products = await getAllProducts(Number(storeId));
    res.status(200).json({ products });
  } catch (err: any) {
    console.error('상품 목록 조회 중 문제 발생', err);
    res.status(400).json({
      message: '상품 목록 조회 중 문제 발생',
      cause: err.message,
    });
  }
};
