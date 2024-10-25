import express from 'express';
import ingredientController from '../controllers/ingredient.controller';
import passport from 'passport';

const ingredientRouter = express.Router();

// GET /ingredient/
ingredientRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  ingredientController.getAllIngredients
);

// GET /ingredient/:id
ingredientRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  ingredientController.getIngredient
);

// POST /ingredient/
ingredientRouter.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  ingredientController.addIngredient
);

// PUT /ingredient/:id
ingredientRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  ingredientController.updateIngredient
);

// DELETE /ingredient/:id
ingredientRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  ingredientController.deleteIngredient
);

export default ingredientRouter;
