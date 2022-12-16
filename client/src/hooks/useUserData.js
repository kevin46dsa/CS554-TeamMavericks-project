import { useState, useEffect } from "react";
import useUser from "./useUser";
import { db } from "../firebase";
import {
    doc,
    getDoc,  
  } from "firebase/firestore";

const useUserData = ()=>{
    const { user, isLoading } = useUser();
    const [userData, setUserData] = useState(null);
    const [isUserDataLoading, setUserDataLoading] = useState(true);

    useEffect(()=>{
        async function fetchUserData() {
      
           
            if(!isLoading){
                 
              const docRef = doc(db, "users", user.uid);
              const docSnap = await getDoc(docRef);
              let data = undefined
              if (docSnap.exists()) {
                data = docSnap.data()
              }
              
              
              //Calling the clean function for all the data
              
              setUserDataLoading(false) 
              setUserData(data)
              
    
          }}
          //setCurrentUser(auth.currentUser.username)
          fetchUserData();
        }, [user,isLoading]);
     return {userData,isUserDataLoading}
}

export default useUserData