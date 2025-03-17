# TringTrip - Tourism Management System

A modern tourism management system built using GraphQL, React, Node.js, Express, and PostgreSQL. The system provides users with information about tourism packages, enables booking, and allows user authentication and profile management.

---

## Features

- **User Authentication**: Secure sign-up and login functionality with password hashing.
- **Tour Packages**: View all packages, filter by location, and explore top-rated packages.
- **Booking System**: Book tourism packages and view your booking history.
- **Profile Management**: Update and manage user profile information.
- **Email Notifications**: Receive booking confirmation emails.
- **GraphQL API**: Efficient data querying and management with GraphQL.

---

## Tech Stack

### Frontend
- **Framework**: React with Vite for fast development and bundling.
- **State Management**: React Context API.
- **Routing**: React Router DOM.
- **Styling**: HTML and CSS.

### Backend
- **Framework**: Node.js with Express.
- **API**: GraphQL for flexible querying.
- **Database**: PostgreSQL with `pg` library for database connection.
- **Security**: bcrypt for password hashing and planned JWT implementation.
- **Email Service**: Nodemailer for sending email notifications.

---

## Project Structure

### Frontend
- **Components**: Modular and reusable UI components like buttons, forms, and cards.
- **Pages**: Specific views like Home, Login, Signup, and Package Details.
- **Context**: User state management using React Context API.
- **Routing**: Handled by React Router DOM.

### Backend
- **GraphQL Resolvers**: Application logic handling queries and mutations.
- **Database Connection**: PostgreSQL setup using the `pg` library.
- **Authentication**: Secure password storage with bcrypt.
- **Email Service**: Nodemailer for sending booking confirmation emails.

---

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tring-ragul-r/trip_booking.git
   cd trip_booking
### Install Dependencies

#### Frontend:
```bash
cd frontend
npm install

#### Backend:
```bash
cd backend
npm install

### Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```plaintext
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432

PORT=3000

### Start the Development Servers

#### Backend:
```bash
cd backend
npm start

#### Frontend:
```bash
cd frontend
npm run dev

### Usage

- Access the frontend at: [http://localhost:5173](http://localhost:5173).
- The backend runs on: [http://localhost:3000](http://localhost:3000).
- Use GraphQL Playground or Postman for testing the API.

