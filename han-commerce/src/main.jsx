import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NavBar from "./devComponenets/nav.jsx";
import HomePage from "./pages/home.jsx";
import PurchaseHistory from "./pages/history.jsx";
import BlogPage from "./pages/blog.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import CartPage from "./pages/cart.jsx";
import BlogInfo from "./pages/blogInfo.jsx";
import FavoritesPage from "./pages/favPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="blogInfo" element={<BlogInfo />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="history" element={<PurchaseHistory />} />
        <Route path="blogs" element={<BlogPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="Blog/:id" element={<BlogInfo />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);
