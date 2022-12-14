import React from "react";
import { Routes as Switch, Route as Routing, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../Components/login/login";
import Home from "../Components/Home";
import Signup from "../Components/Signup/Signup";
import Profile from "../Components/profile/profile";
import CreatePost from "../Components/CreatePost/CreatePost";
import EditProfile from "../Components/EditProfile/EditProfile";
import Search from "../Components/Search/Search";
import PrivateRoute from "../PrivateRoute";
import DisableIfAuth from "../DisableIfAuth";
import LostTrack from "../Components/LostTrack";

const Routesr = () => {

  const [alert, setAlert] = useState(null);

  return (
    <>
      
        <Switch>
          
          <Routing exact path="/" element={ <Home /> }/>
          <Routing exact path="/login" element={<Login />} />
          <Routing exact path="/signup" element={<Signup />} /> 
          <Routing path="/profile" element={<PrivateRoute />} >           
            <Routing exact path="/profile" element={<Profile />} />
          </Routing>
          <Routing exact path="/EditProfile" element={<EditProfile />} />
          
          <Routing path="/createpost" element={<PrivateRoute />}>
            <Routing exact path="/createpost" element={<CreatePost setAlert={setAlert}/>} />
          </Routing>
         
          {/* <Routing exact path="/CreatePost" element={<CreatePost />} /> */}
          <Routing exact path="/Search" element={<Search />} />


          
          
       

          
          
          
          
          
          
          {/* Auth Routes */}
          <Routing path="/login" element={<DisableIfAuth />}> 
          <Routing exact path="/login" element={<Login />} />
          </Routing> 
          <Routing path="/signup" element={<DisableIfAuth />}> 
          <Routing exact path="/signup" element={<Signup />} /> 
          </Routing>
          
          <Routing exact path="*" element={<LostTrack />} />
          
        </Switch>
    </>
  );
};
export default Routesr;
