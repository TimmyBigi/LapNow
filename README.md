# LapNow API

A RESTful API for a laptop marketplace platform built with Node.js and Express.js.

## Features 🚀

- User Authentication & Authorization
- Admin Management System
- Laptop Management with Image Upload
- User Search Functionality
- Secure Password Hashing
- JWT-based Authentication
- Cloud Image Storage
- Structured Logging

## Tech Stack 💻

- Node.js & Express.js
- MongoDB with Mongoose
- JWT for Authentication
- Multer for File Handling
- Cloudinary for Image Storage
- Bcrypt for Password Hashing
- Pino Logger
- Morgan for HTTP Logging

## Project Structure 📁

```
├── src/
│   ├── database/        # MongoDB configuration
│   ├── middleware/      # Auth & validation middleware
│   ├── resources/       # Routes, controllers, models
│   │   ├── controllers/ # Business logic
│   │   ├── models/     # Database schemas
│   │   └── router/     # Route definitions
│   └── utils/          # Utility functions
│       ├── image/      # Image handling (Multer/Cloudinary)
│       ├── lib/        # Response helpers
│       └── log/        # Logger configuration
├── uploads/            # Temporary file storage
├── app.js             # Express app setup
└── index.js           # Entry point
```

## Installation 🔧

1. Clone the repository:
```bash
git clone <repository-url>
cd lapnow
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```env
PORT=7000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start development server:
```bash
npm run dev
```

## Detailed Installation Guide 🛠️

### Prerequisites

1. Node.js and npm
```bash
# Windows
# Download and install from https://nodejs.org/

# Verify installation
node --version
npm --version
```

2. MongoDB
```bash
# Install MongoDB Community Edition
# Download from https://www.mongodb.com/try/download/community

# Start MongoDB service on Windows
net start MongoDB

# Verify installation
mongo --version
```

3. Required npm packages
```bash
# Core dependencies
npm install express mongoose

# Authentication & Security
npm install jsonwebtoken bcryptjs

# File Upload
npm install multer

# Image Storage
npm install cloudinary

# Logging
npm install pino morgan

# Development dependencies
npm install nodemon --save-dev
```

### Configuration Setup

1. MongoDB Connection:
```javascript
// In your database configuration file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

2. Cloudinary Setup:
```javascript
// In your cloudinary configuration file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
```

3. JWT Configuration:
```javascript
// In your authentication middleware
const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: '24h'
});
```

4. Multer Setup:
```javascript
// In your file upload middleware
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});
```

5. Logger Configuration:
```javascript
// Pino logger setup
const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

// Morgan HTTP logger
app.use(morgan('dev'));
```

### Development Tools

1. Postman or Insomnia
   - Download from:
     - Postman: https://www.postman.com/downloads/
     - Insomnia: https://insomnia.rest/download

2. VS Code Extensions
   - MongoDB for VS Code
   - REST Client
   - Thunder Client
   - JavaScript (ES6) code snippets

### Environment Setup

Create a `.env` file in your project root:
```env
PORT=7000
MONGO_URI=mongodb://localhost:27017/lapnow
JWT_SECRET=your_secure_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the Project

```bash
# Install all dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## API Documentation 📚

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/user/signup` | Register new user | No |
| POST | `/api/v1/user/login` | User login | No |
| POST | `/api/v1/admin/admin-signup` | Register admin | No |
| POST | `/api/v1/admin/admin-login` | Admin login | No |

### Laptop Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/laptops` | Add new laptop | Yes |
| GET | `/api/v1/ava/laptop` | Get all laptops | Yes |

### Admin Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/admin/users` | Get all users | Yes (Admin) |
| GET | `/api/v1/admin/users/search/:email` | Search users | Yes (Admin) |

## Request & Response Examples

### User Signup
```json
POST /api/v1/user/signup
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "1234567890"
}
```

### Add Laptop
```json
POST /api/v1/laptops
Content-Type: multipart/form-data

{
  "name": "MacBook Pro",
  "brand": "Apple",
  "processor": "M1",
  "ram": "16GB",
  "storage": "512GB",
  "price": "1299.99",
  "image": [file]
}
```

## Error Handling

The API uses consistent error response format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

## Security 🔐

- Password hashing using Bcrypt
- JWT-based authentication
- Protected routes using middleware
- Environment variables for sensitive data
- File upload validation
- Request data validation

## Contributing 🤝

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Create Pull Request

## Scripts 📜

```json
{
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

## Environment Variables 🔧

Required environment variables:
- `PORT` - Server port (default: 7000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `CLOUDINARY_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

## Postman URL Documentation
https://documenter.getpostman.com/view/36618694/2sAYdmm8Sm

## Medium URL Documentation
https://medium.com/@abimbolaayomide223/major-differences-between-encryption-hashing-and-salting-cc61cfb332ed

