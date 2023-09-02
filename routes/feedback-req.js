const { Router } = require('express');
const {
    createFeedback,
    createFeedbackViewer,
    getAllFeedbacks,
    getFeedbacksViewer,
    updateFeedbacks,
    updateFeedbackViewer,
    deleteFeedbacks,
    deleteFeedbackViewer
} = require('../controller/feedback.js');
const { authorizationMiddleware } = require('../middleware/auth.js');

const feedbacksReqRouter = Router();

feedbacksReqRouter.post('/admin', authorizationMiddleware({ role: ['admin'] }), createFeedback);
feedbacksReqRouter.post('/viewer', authorizationMiddleware({ role: ['viewer'] }), createFeedbackViewer);
feedbacksReqRouter.get('/admin', authorizationMiddleware({ role: ['admin'] }), getAllFeedbacks);
feedbacksReqRouter.get('/viewer', authorizationMiddleware({ role: ['viewer'] }), getFeedbacksViewer);
feedbacksReqRouter.put('/admin/:id', authorizationMiddleware({ role: ['admin'] }), updateFeedbacks);
feedbacksReqRouter.put('/viewer/:id', authorizationMiddleware({ role: ['viewer'] }), updateFeedbackViewer);
feedbacksReqRouter.delete('/admin/:id', authorizationMiddleware({ role: ['admin'] }), deleteFeedbacks);
feedbacksReqRouter.delete('/viewer/:id', authorizationMiddleware({ role: ['viewer'] }), deleteFeedbackViewer);

module.exports = feedbacksReqRouter;