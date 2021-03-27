import React, {useEffect} from 'react';
import firebase from '../../Firebase/Firebase';
import './style.css';

const GoogleSignIn = (props) => {

    const logIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch((error) => {
            console.log("error:=",error)
        });
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log(`${ user.displayName} with ${user.email} is logged in`,user);
              props.setIsLoggedIn(true)
              props.setUser({
                  ...props.user,
                  id:user.uid,
                  name:user.displayName,
                  email:user.email,
                picture:user.photoURL
              });

            } else {
              // No user is signed in.
              console.log(" user is not logged in yet");
            }
          });
    })

    return (
        // <div className="d-flex align-items-center justify-content-center">        
        //     <div className="login-area w-75 card mx-auto mt-5">
        //         <div className="card-body  p-5">
        //             <h2 className="text-center mt-4">
        //                 Login
        //             </h2>
        //             <button type="button" className=" d-block mx-auto btn btn-primary text-white" onClick={logIn}>
        //                 Sign in with Google
        //             </button>
        //         </div>
            
        //     </div>
        // </div>

        <div className="login-form">
  
        <img src="http://www.androidpolice.com/wp-content/themes/ap2/ap_resize/ap_resize.php?src=http%3A%2F%2Fwww.androidpolice.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fnexus2cee_Search-Thumb-150x150.png&w=150&h=150&zc=3" /> 

        <button className="sign-in-btn" onClick={logIn} >Sign in</button>
   
</div>

    )
}

export default GoogleSignIn;
