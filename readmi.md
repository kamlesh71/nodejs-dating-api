# Node.js Express Mongoose Project with TypeScript and JWT Authentication

This project is a robust boilerplate for a Node.js project using Express, Mongoose, TypeScript, and JWT authentication. It provides a secure and structured foundation for building web applications.

## Prerequisites

- Node.js (version 16 or higher)
- MongoDB (version 4.2 or higher)

## Installation

1. Clone the project repository:
```bash
git clone https://github.com/kamlesh71/nodejs-dating-api/tree/main/src
```

2. Install the project dependencies:
```bash
npm install
```

3. Create a `.env` file to store your environment variables. For example:
```
MONGO_URL=mongodb://localhost:27017/your-database-name
JWT_KEY=your-secret-key
```

4. Start the development server:
```bash
npm run dev
```

## Usage

The project includes a simple example API that demonstrates user registration, login, and protected routes using JWT authentication. You can test the API using curl or Postman.

### User Registration

```bash
curl -X POST http://localhost:3000/signup -d '{ "name": "John Doe", "email": "johndoe@example.com", "password": "password123" }'
```

### User Login

```bash
curl -X POST http://localhost:3000/signin -d '{ "email": "johndoe@example.com", "password": "password123" }'
```

### Access Protected Route (requires valid JWT token)

```bash
curl -H 'Authorization: Bearer <your-jwt-token>' http://localhost:3000/protected
```

## License

This project is licensed under the MIT License.