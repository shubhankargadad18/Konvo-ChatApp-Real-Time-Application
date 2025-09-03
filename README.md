# Konvo ChatApp

Konvo ChatApp is a modern, full-stack real-time chat application designed for seamless and secure communication. It features user authentication, media sharing, and robust security practices, making it suitable for both personal and professional use.

## Features

- Real-time messaging with Socket.io
- User authentication (JWT, bcrypt)
- Secure RESTful API (Express, Helmet, CORS)
- Media uploads (Multer, Cloudinary)
- MongoDB database integration (Mongoose)
- Logging and monitoring (Morgan)
- Input validation (Zod)
- Scalable TypeScript backend
- Modern frontend (see `web/`)

## Tech Stack

**Backend:**

- Node.js, TypeScript
- Express.js
- Socket.io
- MongoDB & Mongoose
- JWT, bcryptjs
- Multer, Cloudinary
- Helmet, CORS, Morgan, Zod

**Frontend:**

- (Details to be added based on `web/` implementation)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Cloudinary account (for media uploads)

### Backend Setup

```bash
cd server
npm install
cp .env.example .env # Fill in environment variables
npm run dev # For development
npm run build && npm start # For production
```

### Environment Variables

Create a `.env` file in `server/` with the following (example):

```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend Setup

See the `web/` folder for frontend instructions.

## Usage

- Register and log in to start chatting.
- Create chat rooms, send messages, and share media.
- All communication is encrypted and secure.

## Scripts

- `npm run dev` — Start backend in development mode
- `npm run build` — Compile TypeScript
- `npm start` — Run compiled backend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
