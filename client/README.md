# 🧠 OIRS AI Chatbot

An Hybrid AI + Semantic Search Tax Assistant for the Osun Internal Revenue Service (OIRS) designed to help users with tax-related inquiries, payments, compliance guidance, and general support.

---

🔗 Live Demo: https://komabox.netlify.app/

---

## 🚀 Features

- AI-powered tax assistant for OIRS
- Semantic search using vector embeddings
- Hybrid RAG architecture
- Supabase vector database integration
- Intelligent AI fallback system
- Context-aware chat memory
- Response caching for faster replies
- Mobile-responsive chat interface
- Quick action prompts
- Real-time typing indicators
- Markdown link rendering

---

## Architecture

The chatbot uses a hybrid Retrieval-Augmented Generation (RAG) architecture:

1. User messages are converted into embeddings using Gemini Embedding API.
2. Semantic vector search is performed in Supabase.
3. If a strong knowledge-base match is found, the chatbot returns the verified database response directly.
4. If the match confidence is moderate, Gemini AI enhances the response using retrieved context.
5. If no strong match exists, Gemini generates a fallback conversational response.

This approach improves:
- response speed
- reliability
- AI cost efficiency
- factual accuracy

---

## 🏗️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js

### AI & Search
- Google Gemini API
- Gemini Embeddings
- Semantic Search
- Vector Similarity Search

### Database
- Supabase
- pgvector

### Deployment
- cloudflare
- Render

---

## 🔐 Security Architecture

This project follows strict server-side AI control principles:

- No frontend-controlled AI instructions
- No frontend history injection
- No client-side prompt engineering
- All system prompts defined on server
- Knowledge base injected server-side only
- AI responses fully controlled by backend logic

---

## 💬 Chat Flow

1. User sends a message from the frontend
2. Request is sent to `/api/chat`
3. Backend generates embeddings for the query
4. Semantic vector search retrieves the most relevant knowledge base entries
5. Backend evaluates similarity score:
   - High-confidence match → direct verified database response
   - Medium-confidence match → Gemini AI enhances retrieved context
   - Low-confidence match → Gemini AI fallback response
6. Response is returned to frontend
7. UI updates chat history in real time

---

## ⚡ Quick Actions

Quick actions provide guided prompts for users such as:
- Tax payment help
- Tax clearance certificate (TCC)
- Complaint filing
- Office location lookup

---

## 🧠 Knowledge Base System

The chatbot uses a hybrid retrieval-augmented generation (RAG) pipeline:

- User query → embedding generation
- Semantic vector search performed in Supabase
- Most relevant Q&A entries retrieved
- High-confidence matches returned directly from the verified database
- Lower-confidence matches enhanced using Gemini AI context injection

This architecture improves:
- factual accuracy
- response speed
- quota efficiency
- AI reliability

---

## 📦 Installation

### Backend
npm run dev

### Frontend
npm run dev


## 🔑 Environment Variables
GEMINI_API_KEY=your_api_key_here
PORT=3000

## 📡 API Endpoint

- POST /api/chat

## Performance Optimizations

- Cached repeated responses to reduce API calls
- Direct database responses for high-confidence semantic matches
- Reduced Gemini quota usage through hybrid retrieval architecture
- Static greeting system to avoid unnecessary AI requests

## 📈 Future Improvements

- Admin dashboard for managing knowledge base
- Voice input support
- Multi-language support
- Analytics dashboard
- User authentication
- Streaming AI responses

## 📷 Screenshots
![Desktop](public/chat_desktop.PNG)

![Mobile Home View](public/home_mobile.PNG)

![Mobile Chat View](public/chat_mobile.PNG)


## 🏛️ Built For
Osun Internal Revenue Service (OIRS)

## 👨‍💻 Developer Notes

This project is designed with production AI safety principles in mind, ensuring all AI responses are controlled, predictable, and compliant with organizational policies.