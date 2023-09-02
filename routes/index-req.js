const { Router } = require('express');
const {
    getAllAcceptedRecipe,
    getRecipeFeedbackbyRecipeName
} = require('../controller/index.js');

const indexReqRouter = Router();

indexReqRouter.get('/', getAllAcceptedRecipe);
indexReqRouter.post('/recipename', getRecipeFeedbackbyRecipeName);

module.exports = indexReqRouter;