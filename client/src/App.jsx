import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerDashboard from "./pages/CustomerDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorDashboard from "./pages/VendorDashboard";
import PostJob from "./pages/PostJob";
import ProtectedRoute from "./components/ProtectedRoute";
import EditJob from "./pages/EditPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/customer/dashboard" element={<ProtectedRoute allowedUserType="customer"><CustomerDashboard/></ProtectedRoute>} />
          <Route path="/vendor/dashboard" element={<ProtectedRoute allowedUserType="vendor"><VendorDashboard/></ProtectedRoute>} />
          <Route path="/vendor/dashboard/post" element={<ProtectedRoute allowedUserType="vendor"><PostJob/></ProtectedRoute>} />
          <Route
            path="/vendor/dashboard/edit/:jobId"
            element={
              <ProtectedRoute allowedUserType="vendor">
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
