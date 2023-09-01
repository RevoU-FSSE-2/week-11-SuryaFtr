const { Router } = require('express');
const {
    createRecipe,
    createRecipeMaker,
    getAllRecipe,
    getRecipesMaker,
    updateRecipeStatus,
    updateRecipes,
    updateRecipeMaker,
    deleteRecipes
} = require('../controller/recipe.js');
const { authorizationMiddleware } = require('../middleware/auth.js');

const recipesReqRouter = Router();

recipesReqRouter.post('/admin', authorizationMiddleware({ role: ['admin'] }), createRecipe);
recipesReqRouter.post('/maker', authorizationMiddleware({ role: ['maker'] }), createRecipeMaker);
recipesReqRouter.get('/admin', authorizationMiddleware({ role: ['admin'] }), getAllRecipe);
recipesReqRouter.get('/maker', authorizationMiddleware({ role: ['maker'] }), getRecipesMaker);
recipesReqRouter.patch('/admin/:id', authorizationMiddleware({ role: ['admin'] }), updateRecipeStatus);
recipesReqRouter.put('/admin/:id', authorizationMiddleware({ role: ['admin'] }), updateRecipes);
recipesReqRouter.put('/maker/:id', authorizationMiddleware({ role: ['maker'] }), updateRecipeMaker);
recipesReqRouter.delete('/admin/:id', authorizationMiddleware({ role: ['admin'] }), deleteRecipes);
recipesReqRouter.delete('/maker/:id', authorizationMiddleware({ role: ['maker'] }), deleteRecipes);

module.exports = recipesReqRouter;