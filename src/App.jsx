import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";
import ForumPage from "./pages/ForumPage";
import NotFoundPage  from "./pages/NotFoundPage";
import GardenPage from "./pages/GardenPage";
import CategoryPage from "./pages/CategoryPage"
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from './components/Footer';
import ForumDetailPage from './pages/ForumDetailPage';

function App() {

  return (
    <>
  <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/:id" element={<ForumDetailPage/>}/>
          <Route path="/garden" element={<GardenPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage/>} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/notfound" element={<NotFoundPage/>} />
          </Routes>
          <Footer />
      </>
  )
}

export default App
