### CodeStudy-Edtech-MERN

CodeStydy is a comprehensive full-stack learning management system built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a platform for instructors to create and sell courses while allowing students to purchase and access educational content.

## Features

- **User Authentication** - Secure signup/login with email verification
- **Role-Based Access** - Different interfaces for students and instructors
- **Course Management** - Create, edit, delete, and organize courses into categories
- **Content Delivery** - Video lectures with progress tracking
- **Payment Integration** - Secure transactions via Razorpay
- **User Dashboard** - Track enrolled courses, purchase history, and learning progress
- **Instructor Tools** - Course analytics, student management, and content creation
- **Responsive Design** - Works seamlessly across devices


## Technology Stack

- **Frontend** - React.js, Redux Toolkit, Tailwind CSS
- **Backend** - Node.js, Express.js
- **Database** - MongoDB (with Mongoose)
- **Storage** - Cloudinary (for media files)
- **Authentication** - JWT
- **Payments** - Razorpay
- **Deployment** - Vercel


## Database Model

The database for the platform is built using MongoDB, a NoSQL database that provides a flexible and scalable data storage solution. MongoDB allows for the storage of unstructured and semi-structured data. The database stores the course content, user data, and other relevant information related to the platform.

## Installation

- Clone the repository
```bash
  git clone https://github.com/NareshChauhan01/CodeStudy-Edtech-MERN.git
```

- Navigate to the project directory
```bash
  cd CodeStudy-Edtech-MERN
```

- Install dependencies
```bash
  npm install
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### server .env (Backend)

- **Port No** - `PORT`

- **Fronted API** - `URI`

- **Mongodb** - `MONGODB_URL`

- **Email Credentials** - `MAIL_HOST` `MAIL_USER` `MAIL_PASS`

- **JWT Token** - `JWT_SECRET`

- **Razorpay Credentials** - `RAZORPAY_KEY` `RAZORPAY_SECRET` `CURRENCY` `WEBHOOK_SECRET`

- **Cloudinary** - `CLOUD_NAME` `API_KEY` `API_SECRET` `FOLDER_NAME`

### .env (Fronted)

- **Backend API** - `REACT_APP_BASE_URL`

- **Razorpay Key** - `REACT_APP_RAZORPAY_KEY`


## Run Locally

Start the ***server***

```bash
  cd server
  npm run dev
```

Start the ***src***

```bash
  cd src
  npm start
```

Start ***src*** and ***server*** concurrently

```bash
  cd CodeStudy-Edtech-MERN
  npm run dev
```
