import React from 'react';
import styled from 'styled-components';

import FirebaseLogo from '../../assets/firebase-logo.png';
import keepLogo from '../../assets/keep.png';
import reactLogo from '../../assets/logo.svg';
import firebase from '../../Firebase/Firebase'; 

const Header = (props) =>{

    const logout = (event) =>{
        event.preventDefault();
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            props.setIsLoggedIn(false);
          }).catch((error) => {
            // An error happened.
          });
    }

    const Nav = styled.nav`
        display: flex;
        justify-content: space-between;
        align-items : center;
        padding : 4px 24px;
        border-botttom : 1px solid rgba(60, 64, 67, 0.2);
        `
    const ImgWrap = styled.div`
        display: flex;
        align-items: center;
        `
    const Img = styled.img`
        width: 40px;
        height:40px;
        `  
    const UserProfile = styled.div`
        height: 84px;
        width: 87px;
        margin: 10px auto 20px;
        display: block;
    ` 
    const ProfilePic = styled.img`
        border-radius: 50%;
        `

    return (
        <>
        

    <nav className="navbar navbar-expand navbar-light fixed-top" style={{backgroundColor: '#FFFFFF'}}>
    <li className="nav navbar-nav mx-auto">
        <ImgWrap>
                    <Img src={keepLogo} alt="Google keep logo" />
                    <p>+</p>
                    <Img src={reactLogo} alt="React logo" />
                    <p>+</p>
                    <Img  src={FirebaseLogo} alt="Firebase logo" />
                </ImgWrap>

    </li>
    <a className="navbar-brand mx-auto" href="#">Keep Clone</a>
    
           <ul className="nav navbar-nav mx-auto">
               <li className="dropdown">
                   <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false"> 
                       <i className="fas fa-user"></i> <b className="caret"></b>
                   </a>
                   <div className="dropdown-menu dropdown-menu-right" style={{ borderRadius: "12%",boxShadow: "5px 10px #e0e0d1"}}>
                       <UserProfile>
                           <ProfilePic
 
                                className="card-img-top" 
                                src={props.user.picture} 
                                alt="Card image cap" 
                            />
                       </UserProfile>
                       <div className="text-center pb-0">
                           <p>{props.user.name}</p>
                           <p>{props.user.email}</p>
                       </div>
                       
                       
                       <div className="dropdown-divider"></div>
                       <a className="dropdown-item text-center" href="#" onClick={(event)=>logout(event)}><span><i className="far fa-power-off"></i></span>Logout</a>
                   </div>
               </li>
           </ul>
       </nav>

        <button type="button" onClick={logout}>Log out</button>
        </>

    );
};


export default Header;