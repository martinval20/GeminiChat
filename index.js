const {GoogleGenerativeAI} = require('@google/generative-ai')
require('dotenv').config()
const fs = require('fs')
const genAI = new GoogleGenerativeAI(process.env.API_KEY)



function fileToGenerativePart(path, mimeType){
    return{
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType
        }
    }
}
async function runTextGenerator(){
    const model = genAI.getGenerativeModel({ model: "gemini-pro"})
    const prompt = "Write a story about a magic backpack."
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    console.log(text)
}
async function runVisionComparation(){
    const visionModel = genAI.getGenerativeModel({ model: "gemini-pro-vision"})
    const prompt = "What's different between these Pictures?"
    const imageParts = [
        fileToGenerativePart("5.jpeg", "image/jpeg"),
        fileToGenerativePart("10.jpeg", "image/jpeg"),
    ]
    const result = await visionModel.generateContent([prompt, ...imageParts])
    const response = await result.response
    const text = response.text()
    console.log(text)
}
runVisionComparation()