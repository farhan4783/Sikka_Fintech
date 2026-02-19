# AI Chat Application

This is a web application featuring a frontend interface and a backend server with AI-powered chat agents.

## Features

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- AI Agents: Sage Agent and Wolf Agent
- Chat functionality with memory
- Integrates Google Generative AI and MongoDB

## Setup

1. Clone the repository.
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the backend directory with necessary environment variables (e.g., API keys for Google GenAI, MongoDB connection string).
5. Start the backend server: `npm start`
6. Open `index.html` in your browser to access the frontend.

## Project Structure

- `index.html`, `scripts.js`, `style.css`: Frontend files
- `backend/`: Backend Node.js application
  - `server.js`: Main server file
  - `agents/`: AI agent implementations
  - `models/`: Data models
  - `routes/`: API routes
  - `config/`: Configuration files

## Dependencies

- Express
- Mongoose
- Google Generative AI
- CORS
- Dotenv

## License

ISC
