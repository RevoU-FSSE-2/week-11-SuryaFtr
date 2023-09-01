const {
    createFeedbackRequest,
    createFeedbackViewerRequest,
    getAllFeedbackRequest,
    getFeedbacksViewerRequest,
    updateFeedbacksRequest,
    updateFeedbacksViewerRequest,
    deleteFeedbacksRequest,
    deleteFeedbacksViewerRequest
} = require("../service/feedback.js")
const jwt = require("jsonwebtoken")

const createFeedback = async (req, res, next) => {
    try {
        const { id_recipe, feedbackBy } = req.body
        const { db, body } = req
        const response = await createFeedbackRequest({ db, id_recipe, feedbackBy, ...body })
        res.status(201).json({ message: "Feedback request created", data: response })
    } catch (error) {
        next(error)
    }
}

const createFeedbackViewer = async (req, res, next) => {
    const authorization = req.headers.authorization
    const token = authorization && authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not found" })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        req.username = payload.username
        feedbackBy = req.username

        const { id_recipe } = req.body
        const { db, body } = req
        const response = await createFeedbackViewerRequest({ db, id_recipe, feedbackBy, ...body })
        res.status(201).json({ message: "Feedback request created", data: response })
    } catch (error) {
        next(error)
    }
}

const getAllFeedbacks = async (req, res, next) => {
    try {
        const { db } = req
        const feedbackRequests = await getAllFeedbackRequest({ db })
        res.status(200).json({ data: feedbackRequests })
    } catch (error) {
        next(error)
    }
}

const getFeedbacksViewer = async (req, res, next) => {
    const authorization = req.headers.authorization
    const token = authorization && authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not found" })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        req.username = payload.username
        feedbackBy = req.username

        const { db } = req
        const feedbackViewerRequests = await getFeedbacksViewerRequest({ db, feedbackBy })
        res.status(200).json({ data: feedbackViewerRequests })
    } catch (error) {
        next(error)
    }
}

const updateFeedbacks = async (req, res, next) => {
    try {
        const { feedbackBy } = req.body
        const { db, params, body } = req
        await updateFeedbacksRequest({ db, id: params.id, feedbackBy, ...body })
        res.status(200).json({ message: "Feedback request updated" })
    } catch (error) {
        next(error)
    }
}

const updateFeedbackViewer = async (req, res, next) => {
    const authorization = req.headers.authorization
    const token = authorization && authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not found" })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        req.username = payload.username
        feedbackBy = req.username

        const { db, params, body } = req
        await updateFeedbacksViewerRequest({ db, id: params.id, feedbackBy, ...body })
        res.status(200).json({ message: "Feedback request updated" })
    } catch (error) {
        next(error)
    }
}

const deleteFeedbacks = async (req, res, next) => {
    try {
        const { db, params } = req
        await deleteFeedbacksRequest({ db, id: params.id })
        res.status(200).json({ message: "Feedback request is deleted" })
    } catch (error) {
        next(error)
    }
}

const deleteFeedbackViewer = async (req, res, next) => {
    const authorization = req.headers.authorization
    const token = authorization && authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token not found" })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        req.username = payload.username
        feedbackBy = req.username

        const { db, params } = req
        await deleteFeedbacksViewerRequest({ db, id: params.id, feedbackBy })
        res.status(200).json({ message: "Feedback request is deleted" })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createFeedback,
    createFeedbackViewer,
    getAllFeedbacks,
    getFeedbacksViewer,
    updateFeedbacks,
    updateFeedbackViewer,
    deleteFeedbacks,
    deleteFeedbackViewer
}