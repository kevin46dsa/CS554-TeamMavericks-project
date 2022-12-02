import React from "react";
import { Routes as Switch, Route as Routing, Navigate } from "react-router-dom";


import Login from "../Components/login/login";
import Home from "../Components/Home";
import Signup from "../Components/Signup/Signup";

const Routesr = () => {
  return (
    <>
      
        <Switch>
          
          <Routing exact path="/" element={ <Home /> }/>
          <Routing exact path="/login" element={<Login />} />
          <Routing exact path="/signup" element={<Signup />} />
          
          
        </Switch>
    </>
  );
};
export default Routesr;
