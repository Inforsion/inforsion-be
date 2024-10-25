import prisma from '../../prisma/client';
import { Request, Response } from 'express';
import service from '../services/ingredient.service';
// 모든 재료 조회
const getAllIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await service.getAllIngredients();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: '재료 목록을 가져오는 데 실패했습니다.' });
  }
};

// 특정 재료 조회
const getIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ingredient = await service.getIngredient(Number(id));
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({ error: '재료를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: '재료를 가져오는 데 실패했습니다.' });
  }
};

// 재료 추가
const addIngredient = async (req: Request, res: Response) => {
  try {
    const { name, amount, unit, productId } = req.body;
    const newIngredient = await service.createIngredient(
      name,
      amount,
      unit,
      productId
    );

    res.status(201).json({ addedIngredient: newIngredient });
  } catch (error) {
    res.status(400).json({ error: '재료를 추가하는 데 실패했습니다.' });
  }
};

// 재료 수정
const updateIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, amount, unit, productId } = req.body;
    const updatedIngredient = await service.updateIngredient(Number(id), {
      name,
      amountPerProduct: amount,
      unit,
    });
    res.json(updatedIngredient);
  } catch (error) {
    res.status(400).json({ error: '재료를 수정하는 데 실패했습니다.' });
  }
};

// 재료 삭제
const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteIngredient(Number(id));
    if (!deleted) {
      res.status(404).json({ error: '재료를 찾을 수 없습니다.' });
    }

    res.json({ message: '재료가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    res.status(400).json({ error: '재료를 삭제하는 데 실패했습니다.' });
  }
};

export default {
  getAllIngredients,
  getIngredient,
  addIngredient,
  updateIngredient,
  deleteIngredient,
};
