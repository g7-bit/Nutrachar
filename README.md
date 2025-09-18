# Nutrachar - Diet Macro Tracker

Nutrachar is a full-stack web application designed to help users track the macronutrient content of their diet. Users can create diet plans by either uploading images of nutritional labels, which are processed by an AI, or by manually inputting the nutritional data for each food item. The application provides a detailed breakdown and visualization of the macros.

## Features

-   **User Authentication**: Secure user registration and login system using JWT for session management.
-   **Dashboard**: A personalized dashboard where users can view and manage all their created diet plans.
-   **CRUD for Diets**: Full Create, Read, Update, and Delete functionality for diet plans.
-   **AI-Powered OCR**: Upload images of nutritional labels, and Google's Gemini AI will automatically extract the macronutrient data.
-   **Manual Data Entry**: Flexibility to add or edit food items and their nutritional information manually.
-   **Dynamic Calculations**: Interactively adjust food quantities in a diet plan and see the total macros update in real-time.
-   **Data Visualization**: View a pie chart representing the distribution of proteins, carbs, and fats for each diet.
-   **Recommended Ratios**: Compare your diet's macro ratio against recommended ratios for goals like weight loss, maintenance, or muscle gain.
-   **Responsive Design**: A clean and responsive UI that works on both desktop and mobile devices.

## Tech Stack

### Frontend

-   **Framework**: React (Vite)
-   **State Management**: Redux Toolkit
-   **Routing**: React Router
-   **Styling**: Tailwind CSS
-   **HTTP Client**: Axios
-   **Form Management**: React Hook Form
-   **Charting**: Recharts

### Backend

-   **Framework**: Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Tokens (JWT), bcrypt
-   **AI / OCR**: Google Gemini API
-   **File Storage**: Cloudinary for user avatars
-   **File Handling**: Multer

### Deployment

-   **Platform**: Vercel (for both frontend and backend)

## Project Structure

The project is organized into two main directories: `frontend` and `backend`.

```
Nutrachar/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request/response handlers
│   │   ├── db/             # MongoDB connection
│   │   ├── middlewares/    # Express middlewares (auth, file upload)
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions (API responses, error handling, Cloudinary, Gemini)
│   ├── .env              # Environment variables
│   └── vercel.json       # Vercel deployment config
│
└── frontend/
    ├── src/
    │   ├── components/     # Reusable React components
    │   ├── expressBackend/ # Services for API communication
    │   ├── pages/          # Page components
    │   ├── store/          # Redux Toolkit store and slices
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # Application entry point with routing
    ├── .env              # Environment variables
    ├── vite.config.js    # Vite configuration
    └── vercel.json       # Vercel deployment config
```

## Getting Started

### Prerequisites

-   Node.js and npm
-   MongoDB instance
-   API keys for Cloudinary and Google Gemini

### Backend Setup

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file and add the necessary environment variables (e.g., `MONGODB_URI`, `CORS_ORIGIN`, `ACCESS_TOKEN_SECRET`, `GEMINI_API`, Cloudinary credentials).
4.  Start the development server:
    ```sh
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file and add `VITE_BACKEND_URL`.
4.  Start the development server:
    ```sh
    npm run dev
    ```
The application will be available at `http://localhost:5173` (or another port if 5173 is in use). The Vite development server is configured to proxy API requests to the backend server.