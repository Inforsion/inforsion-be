import { Prisma, Product } from '@prisma/client';
import prisma from '../../prisma/client';
import ProductUpdateInput = Prisma.ProductUpdateInput;

const validateBody = (body: any): body is Product => {
  if (!body) {
    throw new Error('요청에 body가 없습니다.');
  }

  if (!body.name || !body.price || !body.storeId) {
    throw new Error('name, price, storeId는 필수입니다.');
  }

  return true;
};

export const createProduct = async (body: Product) => {
  try {
    if (validateBody(body)) {
      return prisma.product.create({
        data: {
          name: body.name,
          price: body.price,
          storeId: body.storeId,
          category: body.category,
          description: body.description,
          isSignature: body.isSignature,
          inStock: body.inStock,
          imageUrl: body.imageUrl,
        },
      });
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (
  id: number,
  productData: ProductUpdateInput
) => {
  try {
    return await prisma.product.update({
      where: { id },
      data: {
        name: productData.name,
        price: productData.price,
        category: productData.category,
        description: productData.description,
        isSignature: productData.isSignature,
        inStock: productData.inStock,
        imageUrl: productData.imageUrl,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    return await prisma.product.delete({
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};

export const getProductById = async (id: number) => {
  try {
    return await prisma.product.findUnique({
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};

export const getAllProducts = async (storeId: number) => {
  try {
    return await prisma.product.findMany({
      where: { storeId },
    });
  } catch (err) {
    throw err;
  }
};
