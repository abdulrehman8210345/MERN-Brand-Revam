import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashborad from "./pages/Dashborad";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return <div>
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard/customer" element={<Dashborad/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
