import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

if(!configuration.apiKey) throw new Error("No OpenAI API key provided");

const openai = new OpenAIApi(configuration);