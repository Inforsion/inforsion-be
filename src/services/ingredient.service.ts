import prisma from '../../prisma/client';
import { Prisma } from '.prisma/client';
import IngredientUpdateInput = Prisma.IngredientUpdateInput;

const getAllIngredients = async () => {
  return prisma.ingredient.findMany({
    include: { product: true },
  });
};

const getIngredient = async (id: number) => {
  return prisma.ingredient.findUnique({
    where: { id: Number(id) },
    include: { product: true },
  });
};

const createIngredient = async (
  name: string,
  amount: number,
  unit: string,
  productId: number
) => {
  return prisma.ingredient.create({
    data: {
      name,
      amount: Number(amount),
      unit,
      productId: Number(productId),
    },
  });
};

const updateIngredient = async (
  id: number,
  updateData: IngredientUpdateInput
) => {
  const { name, amount, unit } = updateData;
  return prisma.ingredient.update({
    where: { id: Number(id) },
    data: {
      name,
      amount: Number(amount),
      unit,
    },
  });
};

const deleteIngredient = async (id: number) => {
  return prisma.ingredient.delete({
    where: { id: Number(id) },
  });
};

export default {
  getAllIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
