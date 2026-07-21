# BrandPilot Backend

AI-powered business operating system backend.

## Tech Stack

- Node.js
- Express
- TypeScript
- Supabase
- PostgreSQL

## Installation

Install dependencies:

npm install

## Environment Setup

Create a file called:

.env

Add your API keys:

- Supabase URL
- Supabase keys
- Gemini API key
- Groq API key
- Hugging Face API key
- Resend API key

## Database Setup

Open Supabase Dashboard.

Go to SQL Editor.

Run:

src/database/schema.sql

## Start Development Server

Run:

npm run dev

Server runs on:

http://localhost:3000


## Authentication Endpoints

### Signup

POST

/api/auth/signup


Example:

{
"name":"John",
"email":"john@example.com",
"password":"password123"
}


### Login

POST

/api/auth/login


### Logout

POST

/api/auth/logout


### Current User

GET

/api/auth/me


## Deployment

Platform:

Render

Build command:

npm install && npm run build

Start command:

npm start


## Future Modules

Module 2:
Business Profile + Memory System

Module 3:
AI Assistant

Module 4:
Content Generator

Module 5:
Marketing + Sales Agents
