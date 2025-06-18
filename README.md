# Water Monitoring System API

A RESTful API for a water monitoring system built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization (Admin/Client roles)
- Product management
- Device readings tracking
- Contact form submissions
- Secure password handling
- Input validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd water-monitoring-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/water_monitoring
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- POST `/api/auth/login` - Login user
- POST `/api/auth/register` - Register new user

### Products

- GET `/api/products` - Get all products (public)
- GET `/api/product/:id` - Get product details (public)
- POST `/api/products` - Add new product (admin only)
- PUT `/api/products/:id` - Update product (admin only)
- DELETE `/api/products/:id` - Delete product (admin only)

### Readings

- GET `/api/readings` - Get all readings (admin only)
- GET `/api/readings/:id` - Get device-specific readings
- POST `/api/readings` - Add new reading

### Users

- GET `/api/users` - List all users (admin only)
- GET `/api/user/:id` - Get user details
- PUT `/api/user/:id` - Update user
- DELETE `/api/user/:id` - Delete user (admin only)

### Contact

- POST `/api/contact` - Submit contact form
- GET `/api/contact` - Get all submissions (admin only)

## Error Handling

The API uses a consistent error response format:

```json
{
  "message": "Error message",
  "errors": [] // Optional validation errors
}
```

## Security

- Passwords are hashed using bcrypt
- JWT-based authentication
- Input validation using express-validator
- CORS enabled
- Helmet for security headers

## Development

To start the development server with hot-reload:

```bash
npm run dev
```

For production:

```bash
npm start
```

## License

ISC
