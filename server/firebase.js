var admin = require("firebase-admin");
//const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
// Fetch the service account key JSON file contents
var serviceAccount = require("./instabuzz-325f2-firebase-adminsdk-t7kea-2494f3ce27.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://instabuzz-325f2-default-rtdb.firebaseio.com"
});
