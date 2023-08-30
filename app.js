require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const OpenApiValidator = require('express-openapi-validator')
const yaml = require('yaml')
const swaggerUi = require('swagger-ui-express')
const databaseMiddleware = require('./middleware/database.js')
const authRouter = require('./routes/auth.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')


const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.parse(require('fs').readFileSync('./doc/openapi.yaml', 'utf8'))))
app.use(OpenApiValidator.middleware({
    apiSpec: './doc/openapi.yaml'
}))
app.use(databaseMiddleware)

app.use('/v1/auth', authRouter)

app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})