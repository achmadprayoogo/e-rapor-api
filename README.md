# E-Rapor API Server

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen.svg)](https://nodejs.org/)
[![NPM Version](https://img.shields.io/npm/v/express.svg?style=flat)](https://www.npmjs.com/)
[![Build Status](https://img.shields.io/travis/yourusername/e-rapor-api-server/main.svg)](https://travis-ci.org/yourusername/e-rapor-api-server)
[![Coverage Status](https://img.shields.io/codecov/c/github/yourusername/e-rapor-api-server/main.svg)](https://codecov.io/gh/yourusername/e-rapor-api-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dependencies Status](https://img.shields.io/david/yourusername/e-rapor-api-server.svg)](https://david-dm.org/yourusername/e-rapor-api-server)

Backend service for electronic student report card management system.

## Overview

API server for E-Rapor using Express.js and MySQL, providing endpoints for student academic data management.

## Tech Stack

- Node.js & Express.js
- MySQL with Sequelize ORM
- JWT Authentication
- Jest for testing

## Setup

### Prerequisites

```bash
Node.js >= 14
MySQL >= 5.7
```

### Installation

```bash
# Install dependencies
npm install

# Setup database
npm run migrate

# Start development server
npm run dev
```

### Environment Variables

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=erapor_db
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Auth

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user

### Students

- `GET /api/students` - List all students
- `GET /api/students/:id` - Student details
- `POST /api/students` - Add student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Grades

- `GET /api/grades/:studentId` - Student grades
- `POST /api/grades` - Input grades
- `PUT /api/grades/:id` - Update grades

### Report Cards

- `GET /api/reports/:studentId` - Generate report card
- `GET /api/reports/pdf/:studentId` - Download PDF report

## Database Schema

### Tables

- users
- students
- teachers
- classes
- subjects
- grades
- reports

## Scripts

```bash
npm run dev     # Development
npm run build   # Build project
npm start       # Production
npm test        # Run tests
```

## Error Codes

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Security

- JWT Authentication
- Input Validation
- XSS Protection
- Rate Limiting
- CORS enabled

## Testing

```bash
# Run unit tests
npm test

# Coverage report
npm run test:coverage
```

## License

MIT License
