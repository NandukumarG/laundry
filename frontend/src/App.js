import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/Home";
import Stores from "./pages/Stores";
import PriceList from "./pages/Prices";
import DryCleaning from "./pages/DryCleaning";
import SteamIron from "./pages/SteamIron";
import WashFold from "./pages/Wash-Fold";
import WashIron from "./pages/Wash-Iron";
import SchedulePickup from "./pages/SchedulePickup";
import ProfilePage from "./pages/Profile";
import ProfilePage2 from "./pages/Profile2";
import OrderStatus from "./pages/OrderStatus";
import OrderHistory from "./pages/OrderHistory";
import ProtectedRoute from "./pages/ProtectedRoute";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/GetStarted" element={<GetStarted />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/HomePage"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/Stores" element={<Stores />} />
        <Route path="/PriceList" element={<PriceList />} />
        <Route path="/DryCleaning" element={<DryCleaning />} />
        <Route path="/SteamIron" element={<SteamIron />} />
        <Route path="/WashFold" element={<WashFold />} />
        <Route path="/WashIron" element={<WashIron />} />
        <Route path="/SchedulePickup" element={<ProtectedRoute><SchedulePickup /></ProtectedRoute>} />
        <Route
          path="/OrderStatus"
          element={
            <ProtectedRoute>
              <OrderStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProfilePage"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProfilePage2"
          element={
            <ProtectedRoute>
              <ProfilePage2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/OrderHistory"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
