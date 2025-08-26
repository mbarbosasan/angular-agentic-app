import { generateText, stepCountIs, tool } from 'ai';
import { createGeminiProvider } from 'ai-sdk-provider-gemini-cli';
import cors from 'cors';
import express from 'express';
import z from 'zod/v4';

const GEMINI_API_KEY = process.env['GEMINI_API_KEY'];

if (!GEMINI_API_KEY) throw Error('An API Key from Gemini is required!');

export const gemini = createGeminiProvider({
  authType: 'api-key',
  apiKey: process.env['GEMINI_API_KEY'],
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

export let users: Array<string> = [];

const tools = {
  addUsers: tool({
    description: 'Add users in the table.',
    inputSchema: z.object({
      name: z.string().describe('Name of the user to be inserted'),
    }),
    execute: ({ name }: { name: string }) => {
      users.push(name);
      return users;
    },
  }),
  removeUsers: tool({
    description: 'Remove users from the table',
    inputSchema: z.object({
      name: z.string().describe('Name of the user to be removed'),
    }),
    execute: ({ name }: { name: string }) => {
      users = users.filter((u) => u !== name);
    },
  }),
};

app.post('/ai/message', async (req, res) => {
  let { messages } = req.body;

  const response = await generateText({
    model: gemini('gemini-2.5-flash'),
    system: 'Você é um agente capaz de adicionar usuários na aplicação por solicitação do usuário',
    tools,
    messages,
  });

  if (response.toolCalls.length) {
    const toolResponse = await generateText({
      model: gemini('gemini-2.5-flash'),
      tools,
      stopWhen: stepCountIs(2),
      messages,
    });

    res.json({
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: toolResponse.text,
        },
      ],
    });
  } else {
    res.json({
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: response.text,
        },
      ],
    });
  }
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
