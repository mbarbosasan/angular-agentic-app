# Simple agentic angular app

Application built with Angular + Express to practice my knowledge in AI. The goal is to create an "agentic" application where the user interacts with the AI, and it executes actions on an MCP server, probably a simple CRUD on some resource.

To run the project, you need to export your Gemini API Key as an environment variable with the following name: `GEMINI_API_KEY`

## How to run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Export your Gemini API Key:

   ```bash
   export GEMINI_API_KEY=your_gemini_api_key
   ```

3. Start the backend server:

   ```bash
   npm run start:server
   ```

4. In another terminal, start the frontend:

   ```bash
   npm start
   ```

5. Access the application at [http://localhost:4200/](http://localhost:4200/)