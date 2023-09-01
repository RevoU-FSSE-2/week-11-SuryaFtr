const { ObjectId } = require("mongodb")
const StandardError = require("../constant/standard-error")

const createFeedbackRequest = async ({ db, id_recipe, feedbackBy, ...request }) => {
    try {
        const user = await db.collection("users").findOne({ username: feedbackBy, role: { $in: ["admin", "viewer"] } })
        if (!user) {
            throw new StandardError({ message: "feedbackBy must be fill with registered username viewer", status: 404 })
        }

        const recipe = await db.collection("recipes").findOne({ _id: new ObjectId(id_recipe), status: { $in: ["accepted"] } })
        if (!recipe) {
            throw new StandardError({ message: "Recipe not found", status: 404 })
        }

        const feedback = await db.collection("feedbacks").findOne({ id_recipe, feedbackBy })
        if (feedback) {
            throw new StandardError({ message: "Feedback is already gifted to this recipe", status: 404 })
        }

        const feedbackRequest = {
            id_recipe,
            feedbackBy,
            ...request,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const res = await db.collection("feedbacks").insertOne(feedbackRequest)

        return res
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }

}

const createFeedbackViewerRequest = async ({ db, id_recipe, feedbackBy, ...request }) => {
    try {
        const recipe = await db.collection("recipes").findOne({ _id: new ObjectId(id_recipe), status: { $in: ["accepted"] } })
        if (!recipe) {
            throw new StandardError({ message: "Recipe not found", status: 404 })
        }

        const feedback = await db.collection("feedbacks").findOne({ id_recipe, feedbackBy })
        if (feedback) {
            throw new StandardError({ message: "Feedback is already gifted to this recipe", status: 404 })
        }

        const feedbackRequest = {
            id_recipe,
            feedbackBy,
            ...request,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const res = await db.collection("feedbacks").insertOne(feedbackRequest)

        return res
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }

}

const getAllFeedbackRequest = async ({ db }) => {
    try {
        const feedbackRequests = await db.collection("feedbacks").find().toArray()
        return feedbackRequests
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const getFeedbacksViewerRequest = async ({ db, feedbackBy }) => {
    try {
        const feedbackRequests = await db.collection("feedbacks").find({ feedbackBy }).toArray()
        return feedbackRequests
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const updateFeedbacksRequest = async ({ db, id, feedbackBy, ...request }) => {
    try {
        const user = await db.collection("feedbacks").findOne({ _id: new ObjectId(id), feedbackBy })
        if (!user) {
            throw new StandardError({ message: "Feedback is not found", status: 404 })
        }

        const feedbackUpdateRequest = {
            ...request,
            feedbackBy,
            updatedAt: new Date()
        }

        const res = await db.collection('feedbacks').updateOne({ _id: new ObjectId(id) }, { $set: feedbackUpdateRequest })
        if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Feedback request not found", status: 404 })
        }
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const updateFeedbacksViewerRequest = async ({ db, id, feedbackBy, ...request }) => {
    const feedbackUpdateRequest = {
        ...request,
        feedbackBy,
        updatedAt: new Date()
    }

    try {
        const res = await db.collection('feedbacks').updateOne({ _id: new ObjectId(id) }, { $set: feedbackUpdateRequest })
        if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Feedback request not found", status: 404 })
        }
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const deleteFeedbacksRequest = async ({ db, id }) => {
    try {
        const res = await db.collection('feedbacks').deleteOne({ _id: new ObjectId(id) })
        if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Feedback request not found", status: 404 })
        }
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}

const deleteFeedbacksViewerRequest = async ({ db, id, feedbackBy }) => {
    try {
        const user = await db.collection("feedbacks").findOne({ _id: new ObjectId(id), feedbackBy })
        if (!user) {
            throw new StandardError({ message: "Feedback is not found or unauthorize", status: 404 })
        }

        const res = await db.collection('feedbacks').deleteOne({ _id: new ObjectId(id) })
        if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Feedback request not found", status: 404 })
        }
    } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
    }
}



module.exports = {
    createFeedbackRequest,
    createFeedbackViewerRequest,
    getAllFeedbackRequest,
    getFeedbacksViewerRequest,
    updateFeedbacksRequest,
    updateFeedbacksViewerRequest,
    deleteFeedbacksRequest,
    deleteFeedbacksViewerRequest
}