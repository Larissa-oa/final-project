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
  import Navbar from "./components/Navbar";
  import ProtectedRoute from "./components/ProtectedRoute";
  import Footer from './components/Footer';
  import TypePage from './pages/TypePage';
  import ForumDetailPage from './pages/ForumDetailPage';
  import PlantCard from './pages/PlantCard';
  import './App.css'


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
              <Route path="/" element={<HomePage/>} />
              <Route path="/about" element={<AboutPage/>} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/garden" element={<GardenPage />} />
              <Route path="/garden/:typeTitle" element={<TypePage/>} />
              <Route path="/forum/:id" element={<ForumDetailPage />} />
              <Route path="/type-details/:plantsType/:itemId" element={<PlantCard/>} />
              <Route path="/notfound" element={<NotFoundPage/>} />
          </Routes>
      <Footer />
  </>
    )
  }

  export default App
