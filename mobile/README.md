# LEXORA — AI Legal Companion

## Project Overview

LEXORA is a proposed AI-powered legal information and attorney consultation platform designed for users in the Philippines.

The system helps users understand general legal information, discover relevant Philippine legal sources, and connect with verified legal professionals.

LEXORA AI is not a lawyer and does not replace professional legal advice.

## Technology Stack

- Frontend: Next.js + TypeScript
- Backend: NestJS + TypeScript
- Database: PostgreSQL
- ORM: Prisma
- AI Integration: OpenAI API
- Video Consultation: LiveKit / WebRTC
- Authentication: JWT with refresh token rotation
- File Storage: Private S3-compatible storage

## User Roles

**User**
- Register and log in
- Ask AI legal questions
- View legal information and references
- Find verified attorneys
- Request private consultations
- Manage legal documents

**Attorney**
- Submit professional credentials for verification
- Manage consultation availability
- Accept or decline consultation requests
- Communicate privately with clients

**Administrator**
- Manage users and attorneys
- Review attorney verification submissions
- Maintain legal knowledge sources
- Review system audit logs
- Manage platform settings

## AI Legal Assistant

The AI assistant retrieves relevant legal materials and generates understandable legal information with source references.

AI-generated content must be clearly labeled. The system must not guarantee legal outcomes or impersonate a licensed attorney.

## Privacy and Security

LEXORA must implement role-based access control, secure authentication, encrypted communication, protected document storage, audit logs, and appropriate data retention controls.

Sensitive legal information must not be exposed to unauthorized users or third-party services without a lawful basis and appropriate safeguards.

## Backend Installation

1. Install a supported Node.js version.
2. Install the NestJS CLI using `npm install -g @nestjs/cli`.
3. Install project dependencies using `npm install`.
4. Configure the environment variables.
5. Configure PostgreSQL and run database migrations.
6. Start the development server using `npm run start:dev`.

## Environment Variables

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `OPENAI_API_KEY`
- `FRONTEND_URL`
- `LIVEKIT_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`

Never commit real credentials or `.env` files to Git.

## Development Priorities

1. Backend setup and database connection
2. Authentication and user roles
3. AI legal information assistant
4. Philippine legal knowledge retrieval
5. Attorney verification and discovery
6. Consultation booking and communication
7. Document management
8. Security testing and deployment

## Project Status

Under development.

**LEXORA — Your Voice. Your Rights. Your Justice.**