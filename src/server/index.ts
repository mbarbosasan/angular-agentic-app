import { convertToModelMessages, generateText } from 'ai';
import { createGeminiProvider } from 'ai-sdk-provider-gemini-cli';
import cors from 'cors';
import express from 'express';

const GEMINI_API_KEY = process.env['GEMINI_API_KEY'];

if (GEMINI_API_KEY) throw Error('An API Key from Gemini is required!')

export const gemini = createGeminiProvider({
  authType: 'api-key',
  apiKey: process.env['GEMINI_API_KEY'],
})


const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

app.post('/ai/message', async (req, res) => {
  const { message} = req.body;
  
  const response = await generateText({
    model: gemini('gemini-2.5-pro'),
    prompt: convertToModelMessages(message),
  })
  res.json({
    type: 'system',
    // @ts-expect-error
    message: response.content[0].text
  });
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})