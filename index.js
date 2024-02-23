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
async function runChatText(){
    const model = genAI.getGenerativeModel({ model: "gemini-pro"})
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: "Hello. I have 2 dogs in my house."
            },
            {
                role: "model",
                parts: "Great to meet you. What would you like to know?"
            }
        ]
    })
    const msg = "How many paws are in my house?"
    const result = await chat.sendMessage(msg)
    const response = await result.response
    const text = response.text()
    console.log(text)
}

async function runEmedding(){
    const model = genAI.getGenerativeModel({ model: "embedding-001"})
    const text = "The quick brown fox jumped over the lazy dog"

    const result = await model.embedContent(text)
    const embedding = result.embedding
    console.log(embedding)
}
runEmedding()