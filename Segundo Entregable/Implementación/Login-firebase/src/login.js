import React, {Component} from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from "firebase/app";
import 'firebase/auth';
//import firebaseConfig from './firebase';


var firebaseConfig = {
    apiKey: "AIzaSyCfKFX7pT4MbEqB4nyEI8ggR0G_MgTMWDY",
    authDomain: "tutoria-20626.firebaseapp.com",
    projectId: "tutoria-20626",
    storageBucket: "tutoria-20626.appspot.com",
    messagingSenderId: "937165411476",
    appId: "1:937165411476:web:98a591d8e8364ac51bd081",
    measurementId: "G-1D480E6ZDQ"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
function login(){
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var user = result.user;(
        <p>HOLA ,{user.displayName}</p>
    )
    console.log(user.displayName);
  }).catch((error) => {
    console.log('NOOOOOOOOOO TERNA');
  });
}
const login2=(()=>{
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;(
          <p>HOLA ,{user.displayName}</p>
      )
      console.log(user.displayName);
    }).catch((error) => {
      console.log('NOOOOOOOOOO TERNA');
    });
})

class Login extends Component{
    render(){
        const{user,signOut,SignInWithGoogle}=this.props;
        return (
            <div>
                {
                    user ?
                    <p>
                        Hello,{user.displayName}
                    </p>
                    :
                    <p>
                   Please sign in 
                    </p>
                }
                {
                    user ? <button onClick={signOut}>Sign Out</button>
                    :
                     <button onClick={login}>Sign in with Google</button>
                }


            </div>

        )
    }
}

const firebaseAppAuth= firebaseApp.auth();
const providers={
    googleProvider: new firebase.auth.GoogleAuthProvider(),

};

//export default withFirebaseAuth({
//    providers,firebaseAppAuth
//})(Login);
 export default login2;