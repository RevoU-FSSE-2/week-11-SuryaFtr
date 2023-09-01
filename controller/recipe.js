const {
    createRecipeRequest,
    createRecipeMakerRequest,
    getAllRecipeRequest,
    getRecipesMakerRequest,
    updateRecipeStatusRequest,
    updateRecipesRequest,
    updateRecipesMakerRequest,
    deleteRecipesRequest
} = require("../service/recipe.js")
const jwt = require("jsonwebtoken")

const createRecipe = async (req, res, next) => {
    try {
        const { createdBy } = req.body
        const { db, body } = req
        const response = await createRecipeRequest({ db, createdBy, ...body })
        res.status(201).json({ message: "Recipe request created", data: response })
    } catch (error) {
        next(error)
    }
}

const createRecipeMaker = async (req, res, next) => {
    const authorization = req.headers.authorization
    const token = authorization && authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not found" })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        req.username = payload.username
        createdBy = req.username

        const { db, body } = req
        const response = await createRecipeMakerRequest({ db, createdBy, ...body })
        res.status(201).json({ message: "Recipe request created", data: response })
    } catch (error) {
        next(error)
    }
}

const getAllRecipe = async (req, res, next) => {
    try {
        const { db } = req
        const recipeRequests = await getAllRecipeRequest({ db })
        res.status(200).json({ data: recipeRequests })
    } catch (error) {
        next(error)
    }
}

const getRecipesMaker = async (req, res, next) => {
    const authorization = req.headers.authorization
    const token = authorization && authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not found" })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        req.username = payload.username
        createdBy = req.username
        const { db } = req
        const recipeMakerRequests = await getRecipesMakerRequest({ db, createdBy })
        res.status(200).json({ data: recipeMakerRequests })
    } catch (error) {
        next(error)
    }
}

const updateRecipeStatus = async (req, res, next) => {
    try {
        const { db, params, body } = req
        await updateRecipeStatusRequest({ db, id: params.id, ...body })
        res.status(200).json({ message: "Recipe status request updated" })
    } catch (error) {
        next(error)
    }
}

const updateRecipes = async (req, res, next) => {
    try {
        const { createdBy, recipename } = req.body
        const { db, params, body } = req
        await updateRecipesRequest({ db, id: params.id, createdBy, recipename, ...body })
        res.status(200).json({ message: "Recipe request updated" })
    } catch (error) {
        next(error)
    }
}

const updateRecipeMaker = async (req, res, next) => {
    const authorization = req.headers.authorization
    const token = authorization && authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not found" })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        req.username = payload.username
        createdBy = req.username

        const { recipename } = req.body
        const { db, params, body } = req
        await updateRecipesMakerRequest({ db, id: params.id, createdBy, recipename, ...body })
        res.status(200).json({ message: "Recipe request updated" })
    } catch (error) {
        next(error)
    }
}

const deleteRecipes = async (req, res, next) => {
    try {
        const { db, params } = req
        await deleteRecipesRequest({ db, id: params.id })
        res.status(200).json({ message: "Recipe request is deleted" })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createRecipe,
    createRecipeMaker,
    getAllRecipe,
    getRecipesMaker,
    updateRecipeStatus,
    updateRecipes,
    updateRecipeMaker,
    deleteRecipes
}