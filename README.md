# Netflix Clone

A full-stack Netflix clone built with React, Firebase, and The Movie Database (TMDB) API. This application replicates the core functionality of Netflix, including user authentication, movie browsing, and video playback.

## ✨ Features

- **User Authentication**
  - Sign up with email/password
  - Sign in with Google
  - Protected routes for authenticated users

- **Movie Browsing**
  - Browse movies by categories (Trending, Top Rated, Action, Comedy, etc.)
  - Responsive design for all screen sizes
  - Movie trailers with YouTube integration

- **User Interface**
  - Netflix-like UI with modern design
  - Movie banners with featured content
  - Horizontal scrolling rows for different categories
  - Hover effects on movie cards

- **Responsive Design**
  - Fully responsive layout
  - Mobile-friendly navigation
  - Adaptive image loading

## 🚀 Technologies Used

- **Frontend**
  - React.js
  - React Router for navigation
  - React Context API for state management
  - Axios for API requests
  - Styled with CSS Modules

- **Backend & Authentication**
  - Firebase Authentication
  - Firebase Firestore (for user data)

- **APIs**
  - The Movie Database (TMDB) API
  - YouTube Data API (for trailers)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your API keys:
   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`


## 🙏 Acknowledgments

- [The Movie Database (OMDB) API](https://www.omdbapi.com/)
- [Firebase](https://firebase.google.com/)
- [React](https://reactjs.org/)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
