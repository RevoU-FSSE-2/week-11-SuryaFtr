require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const OpenApiValidator = require('express-openapi-validator')
const yaml = require('yaml')
const swaggerUi = require('swagger-ui-express')
const databaseMiddleware = require('./middleware/database.js')
const authRouter = require('./routes/auth.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')
const indexReqRouter = require('./routes/index-req.js')
const recipesReqRouter = require('./routes/recipe-req.js')
const feedbacksReqRouter = require('./routes/feedback-req.js')
const { authenticationMiddleware } = require('./middleware/auth.js')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.parse(require('fs').readFileSync('./doc/openapi.yaml', 'utf8'))))
app.use(OpenApiValidator.middleware({
    apiSpec: './doc/openapi.yaml'
}))
app.use(databaseMiddleware)

app.use('/v1', indexReqRouter)
app.use('/v1/auth', authRouter)
app.use('/v1/recipes', authenticationMiddleware, recipesReqRouter)
app.use('/v1/feedbacks', authenticationMiddleware, feedbacksReqRouter)

app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})