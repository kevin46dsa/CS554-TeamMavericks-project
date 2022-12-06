import React from "react";
import { Routes as Switch, Route as Routing, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "../Components/login/login";
import Home from "../Components/Home";
import Signup from "../Components/Signup/Signup";
import Profile from "../Components/profile/profile";
import CreatePost from "../Components/CreatePost/CreatePost";

const Routesr = () => {

  const [alert, setAlert] = useState(null);

  return (
    <>
      
        <Switch>
          
          <Routing exact path="/" element={ <Navigate to="/login" /> }/>
          <Routing exact path="/login" element={<Login />} />
          <Routing exact path="/signup" element={<Signup />} />
          <Routing exact path="/home" element={<Home />} />
          <Routing exact path="/profile" element={<Profile />} />
          <Routing exact path="/CreatePost" element={<CreatePost setAlert={setAlert}/>} />
          
          
        </Switch>
    </>
  );
};
export default Routesr;
