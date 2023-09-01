const {
    getAllAcceptedRecipeRequest,
    getRecipeFeedbackbyRecipeNameRequest
} = require("../service/index.js")

const getAllAcceptedRecipe = async (req, res, next) => {
    try {
        const { db } = req
        const getAllAcceptedRequests = await getAllAcceptedRecipeRequest({ db })
        res.status(200).json({ data: getAllAcceptedRequests })
    } catch (error) {
        next(error)
    }
}

const getRecipeFeedbackbyRecipeName = async (req, res, next) => {
    try {
        const { recipename } = req.body
        const { db } = req
        const getbyRecipeNameRequests = await getRecipeFeedbackbyRecipeNameRequest({ db, recipename })
        res.status(200).json({ data: getbyRecipeNameRequests })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllAcceptedRecipe,
    getRecipeFeedbackbyRecipeName
}