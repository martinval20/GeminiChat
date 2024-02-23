const {GoogleGenerativeAI} = require('@google/generative-ai')
require('dotenv').config()

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

const model = genAI.getGenerativeModel({ model: "gemini-pro"})

console.log(model)