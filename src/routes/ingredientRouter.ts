import express from 'express';
import ingredientController from '../controllers/ingredient.controller';

const ingredientRouter = express.Router();

// GET /ingredient/
ingredientRouter.get('/', ingredientController.getAllIngredients);

// GET /ingredient/:id
ingredientRouter.get('/:id', ingredientController.getIngredient);

// POST /ingredient/
ingredientRouter.post('/create', ingredientController.addIngredient);

// PUT /ingredient/:id
ingredientRouter.put('/:id', ingredientController.updateIngredient);

// DELETE /ingredient/:id
ingredientRouter.delete('/:id', ingredientController.deleteIngredient);

export default ingredientRouter;
