var admin = require("firebase-admin");

var serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log(admin);
