const { ObjectId } = require("mongodb")
const StandardError = require("../constant/standard-error")

const getAllAcceptedRecipeRequest = async ({ db }) => {
    try {
        const recipeRequests = await db.collection("recipes").find({ status: { $in: ["accepted"] } }).toArray()
        return recipeRequests
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const getRecipeFeedbackbyRecipeNameRequest = async ({ db, recipename }) => {
    try {
        const check = await db.collection("feedbacks").findOne({ recipename })
        if (!check) {
            throw new StandardError({ message: "Feedback recipe not found", status: 404 })
        }

        const feedbackRequests = await db.collection("feedbacks").find({ recipename }).toArray()
        return feedbackRequests

    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

module.exports = {
    getAllAcceptedRecipeRequest,
    getRecipeFeedbackbyRecipeNameRequest
}