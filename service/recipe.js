const { ObjectId } = require("mongodb")
const StandardError = require("../constant/standard-error")

const createRecipeRequest = async ({ db, createdBy, ...request }) => {
    try {
        const user = await db.collection("users").findOne({ username: createdBy, role: { $in: ["admin", "maker"] } })
        if (!user) {
            throw new StandardError({ message: "Username not found, createdBy must using correct role username", status: 404 })
        }

        const recipeRequest = {
            createdBy,
            ...request,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const res = await db.collection("recipes").insertOne(recipeRequest)

        return res
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }

}

const createRecipeMakerRequest = async ({ db, createdBy, ...request }) => {
    try {
        const recipeRequest = {
            createdBy,
            ...request,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const res = await db.collection("recipes").insertOne(recipeRequest)

        return res
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }

}

const getAllRecipeRequest = async ({ db }) => {
    try {
        const recipeRequests = await db.collection("recipes").find().toArray()
        return recipeRequests
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const getRecipesMakerRequest = async ({ db, createdBy }) => {
    try {
        const recipeRequests = await db.collection("recipes").find({ createdBy }).toArray()
        return recipeRequests
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const updateRecipeStatusRequest = async ({ db, id, status }) => {
    try {
        const res = await db.collection('recipes').updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } })
        if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Recipe request not found", status: 404 })
        }
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const updateRecipesRequest = async ({ db, id, createdBy, recipename, ...request }) => {
    try {
        const recipes = await db.collection("recipes").findOne({ _id: new ObjectId(id), createdBy })
        if (!recipes) {
            throw new StandardError({ message: "createdBy must be fill with registered username maker", status: 404 })
        }

        const feedback = await db.collection("feedbacks").findOne({ id_recipe: id })
        if (feedback) {
            await db.collection('feedbacks').updateMany({ id_recipe: id }, { $set: { createdBy, recipename } })
        }

        const recipeUpdateRequest = {
            createdBy,
            recipename,
            ...request,
            updatedAt: new Date()
        }

        const res = await db.collection('recipes').updateOne({ _id: new ObjectId(id) }, { $set: recipeUpdateRequest })
        if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Recipe request not found", status: 404 })
        }
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const updateRecipesMakerRequest = async ({ db, id, createdBy, recipename, ...request }) => {

    const feedback = await db.collection("feedbacks").findOne({ id_recipe: id })
    if (feedback) {
        await db.collection('feedbacks').updateMany({ id_recipe: id }, { $set: { createdBy, recipename } })
    }

    const recipeUpdateRequest = {
        createdBy,
        recipename,
        ...request,
        updatedAt: new Date()
    }

    try {
        const res = await db.collection('recipes').updateOne({ _id: new ObjectId(id) }, { $set: recipeUpdateRequest })
        if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Recipe request not found", status: 404 })
        }
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const deleteRecipesRequest = async ({ db, id }) => {
    try {
        const feedback = await db.collection("feedbacks").findOne({ id_recipe: id })
        if (feedback) {
            await db.collection('feedbacks').deleteMany({ id_recipe: id })
        }

        const res = await db.collection('recipes').deleteOne({ _id: new ObjectId(id) })
        if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Recipe request not found", status: 404 })
        }
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}


module.exports = {
    createRecipeRequest,
    createRecipeMakerRequest,
    getAllRecipeRequest,
    getRecipesMakerRequest,
    updateRecipeStatusRequest,
    updateRecipesRequest,
    updateRecipesMakerRequest,
    deleteRecipesRequest
}