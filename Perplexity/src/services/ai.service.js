import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-3-flash-preview",
    apiKey: process.env.GEMINI_API_KEY
});


export async function testAi() {
    model.invoke("what is capital of india").then((response) => {
        console.log(response.text)
    })
}