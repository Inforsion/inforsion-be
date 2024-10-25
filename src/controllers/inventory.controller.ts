import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

// 전체 재고 조회
const getAllInventory = async (req: Request, res: Response) => {
  try {
    const inventory = await prisma.inventory.findMany({
      include: { ingredient: true },
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: '재고 목록을 가져오는 데 실패했습니다.' });
  }
};

// 특정 재고 조회
const getInventoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const inventoryItem = await prisma.inventory.findUnique({
      where: { id: Number(id) },
      include: { ingredient: true },
    });
    if (inventoryItem) {
      res.json(inventoryItem);
    } else {
      res.status(404).json({ error: '재고 항목을 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: '재고 항목을 가져오는 데 실패했습니다.' });
  }
};

// 재고 추가
const createInventory = async (req: Request, res: Response) => {
  try {
    const { ingredientId, quantity, expiryDate, storeId } = req.body;
    const newInventory = await prisma.inventory.create({
      data: {
        ingredientId: Number(ingredientId),
        quantity: Number(quantity),
        expiryDate: new Date(expiryDate),
        storeId: Number(storeId),
      },
    });
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(400).json({ error: '재고를 추가하는 데 실패했습니다.' });
  }
};

// 재고 수정
const updateInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, expiryDate } = req.body;
    const updatedInventory = await prisma.inventory.update({
      where: { id: Number(id) },
      data: {
        quantity: Number(quantity),
        expiryDate: new Date(expiryDate),
      },
    });
    res.json(updatedInventory);
  } catch (error) {
    res.status(400).json({ error: '재고를 수정하는 데 실패했습니다.' });
  }
};

// 재고 삭제
const deleteInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.inventory.delete({
      where: { id: Number(id) },
    });
    res.json({ message: '재고가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    res.status(400).json({ error: '재고를 삭제하는 데 실패했습니다.' });
  }
};

// 유통기한이 임박한 재고 조회
const getExpiringSoon = async (req: Request, res: Response) => {
  try {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() + 7); // 7일 이내 유통기한

    const expiringSoon = await prisma.inventory.findMany({
      where: {
        expiryDate: {
          lte: thresholdDate,
        },
        quantity: {
          gt: 0,
        },
      },
      include: { ingredient: true },
    });
    res.json(expiringSoon);
  } catch (error) {
    res
      .status(500)
      .json({ error: '유통기한 임박 재고를 조회하는 데 실패했습니다.' });
  }
};

// 재고 부족 조회
const getOutOfStock = async (req: Request, res: Response) => {
  try {
    const outOfStock = await prisma.inventory.findMany({
      where: {
        quantity: {
          lte: 0,
        },
      },
      include: { ingredient: true },
    });
    res.json(outOfStock);
  } catch (error) {
    res
      .status(500)
      .json({ error: '재고 부족 항목을 조회하는 데 실패했습니다.' });
  }
};

export default {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  getExpiringSoon,
  getOutOfStock,
};
