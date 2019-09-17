
var firebaseConfig = {
  apiKey: "AIzaSyAql85CWS1hdX84Q2JnJ2jxiedKjLs1L-s",
  authDomain: "fir-web-e54f7.firebaseapp.com",
  databaseURL: "https://fir-web-e54f7.firebaseio.com",
  projectId: "fir-web-e54f7",
  storageBucket: "",
  messagingSenderId: "12009958262",
  appId: "1:12009958262:web:025cce970974f6e693a857"
};

firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    if (window.location.pathname != '/jogointerface.html') {
      window.location.pathname = '/jogointerface.html'
    }
    $("#photoURL").attr('src', user.photoURL)
    $("#displayName").text(user.displayName)
    $("#email").text(user.email)


    console.log(user);
  } else {
    if (window.location.pathname != '/index.html') {
      window.location = "/index.html";
    }
  }
});

$("#login-google").click(function () {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider)
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
})