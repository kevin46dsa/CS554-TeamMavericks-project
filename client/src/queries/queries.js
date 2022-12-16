import {
	collection,
	getDoc,
	getDocs,
    doc,
	limit,
	orderBy,
	query,
	where,
  } from "firebase/firestore";
  import { db } from "../firebase";
  const postCollectionRef = collection(db, "Posts");
  const userCollectionRef = collection(db,"users")
  
  //temp delete line once all queries are done  this line does nothing just a place holder for listing ref
 /*
  let listingsRef = undefined

  const saleListingQuery = query(
    listingsRef,
    where("type", "==", "sale"),
    orderBy("timestamp", "desc"),
   
  );

  const rentListingQuery = query(
    listingsRef,
    where("type", "==", "rent"),
    orderBy("timestamp", "desc"),
    
  );

  const offerListingQuery = query(
    listingsRef,
    where("offer", "==", true),
    orderBy("timestamp", "desc"),
    
  );

  const rentListingHome = query(
    listingsRef,
    where("type", "==", "rent"),
    orderBy("timestamp", "desc"),
    limit(4)
  );

  const offerListingHome = query(
    listingsRef,
    where("offer", "==", true),
    orderBy("timestamp", "desc"),
    limit(4)
  );
  */

  //Query to get list of posts of the users following ordred by timeposted 
  // compares user collection userdata.following array with Posts collections userRef

  


  const userFollowingPostsHome = (userFollowing) =>{
    // still working on this 
   // const usersRef = doc(db, "users", "SF");
   // const docSnap = await getDoc(docRef);
    
    
    //const querySnapshot = await getDocs(queries.userFollowingPostsHome);
				
				//Calling the clean function for all the data
				//const userFollowingPostsData = cleanData(querySnapshot);
    


      return query(
        postCollectionRef,
        where("userRef","in",userFollowing),
        orderBy("timestamp", "desc")
      );
    } 
    
  //} 
  
  
  
  /*
  
  query(
    postCollectionRef,
    where("userRef","in",currentUserFollowing),
    orderBy("timestamp", "desc")
  );


  */


  const queries = {
    
    userFollowingPostsHome,
    
    
}

export default queries