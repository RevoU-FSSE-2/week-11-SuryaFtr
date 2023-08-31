const { ObjectId } = require("mongodb")
const StandardError = require("../constant/standard-error")

const createRecipeRequest = async ({ db, username, ...request }) => {
    try {
        const user = await db.collection("users").findOne({ username, role: { $in: ["admin", "maker"] } })
        if (!user) {
            throw new StandardError({ message: "Username not found or unauthorize", status: 404 })
        }

        const recipeRequest = {
            username,
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

const createRecipeMakerRequest = async ({ db, username, ...request }) => {
    try {
        const recipeRequest = {
            username,
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

const getRecipesMakerRequest = async ({ db, username }) => {
    try {
        const recipeRequests = await db.collection("recipes").find({ username }).toArray()
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

const updateRecipesRequest = async ({ db, id, username, ...request }) => {
    try {
        const user = await db.collection("users").findOne({ username, role: { $in: ["admin", "maker"] } })
        if (!user) {
            throw new StandardError({ message: "Username not found or unauthorize", status: 404 })
        }

        const recipeUpdateRequest = {
            username,
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

const updateRecipesMakerRequest = async ({ db, id, username, ...request }) => {
    const recipeUpdateRequest = {
        username,
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
        const res = await db.collection('recipes').deleteOne({ _id: new ObjectId(id) })
        if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Recipe request not found", status: 404 })
        }
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const deleteRecipesMakerRequest = async ({ db, id, username }) => {
    try {
        const user = await db.collection("recipes").findOne({ _id: new ObjectId(id), username })
        if (!user) {
            throw new StandardError({ message: "Recipe is not found or unauthorize", status: 404 })
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
    deleteRecipesRequest,
    deleteRecipesMakerRequest
}