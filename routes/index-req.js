const { Router } = require('express');
const {
    getAllAcceptedRecipe,
    getRecipeFeedbackbyRecipeName
} = require('../controller/index.js');

const indexReqRouter = Router();

indexReqRouter.get('/', getAllAcceptedRecipe);
indexReqRouter.get('/recipename', getRecipeFeedbackbyRecipeName);

module.exports = indexReqRouter;