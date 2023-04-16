import React, { useState } from 'react';
import User from './components/User';
// import { navigateToUserPage } from './Navigation';
import './index.css';
import './App.css';  
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink} from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStore } from './hook/useStore';


function App() {
  // ---about---
  const [showMoreText, setShowMoreText] = useState(false);

  const handleClick = () => {
    setShowMoreText(!showMoreText);
  }
  // ---google---

	// const setAuthData = useStore((state) => state.setAuthData);
  // const navigate = useNavigate();
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();
  async function handleLoginSuccess(credentialResponse) {
    console.log(credentialResponse);
    const { data } = await axios.post('http://localhost:3000/auth/redirect', {
      token: credentialResponse.credential,
    });
    localStorage.setItem('AuthData', JSON.stringify(data));
    setAuthData(data);
    navigate('/User'); // chuyển hướng đến trang User
  }


  // ------------------------
  return(
    <div id='background'>
      <div id='img-bgr'>
        <img src='https://scontent.fhan7-1.fna.fbcdn.net/v/t1.15752-9/340643093_596400379070783_3878122968672345092_n.png?stp=dst-png_s2048x2048&_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=AUm6a0QSrkIAX8mCFsX&_nc_ht=scontent.fhan7-1.fna&oh=03_AdQfSFHx6PTH2wc737RSC7sCi3Bqhqz2k8Ojhn_xkgtz_A&oe=645F7184'
            alt=''></img>
      </div>
      {/* ----------------- */}
      <div className='container'>
        {/* -1- */}
        <div className='text-left'>
          <img id='logo' 
              src='https://scontent.fhan9-1.fna.fbcdn.net/v/t1.15752-9/339255555_750608299929623_1819700425197158191_n.png?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_ohc=yYoj_WYn7Z0AX8PzNYr&_nc_ht=scontent.fhan9-1.fna&oh=03_AdRnnu-WE8_nVZ6izRu8zO412-xU4FN7VD1RZFE1_Xy5qg&oe=645DE2E8'
              alt=''
          />
          
          {/* -more- */}
          <div className="about">
            <p id='text-1'>Welcome!</p>
            <p id='line'></p>
            <div style={{width:'600px'}}>
            <p className="short-text">Selected is a place that gathers the best music from top artists and music producers from around the world. Here, you can easily explore the latest music, search for playlists by genre, or save your favorite songs.</p>
            <p className={showMoreText ? "full-text" : "full-text hide"}> We are committed to bringing you the best music experience, with a team of experienced and passionate music experts. With Selected, you will find your passion and love for music!</p>
            {!showMoreText && <button className="more-button" onClick={handleClick}>More</button>}
            {showMoreText && <button className="more-button" onClick={() => setShowMoreText(false)}>Back</button>}
            </div>
          </div>  
          {/* -- */}
        </div>

        {/* -2- */}
        <div className='text-right'>
          <div className='sign-text'>
            <p className='signin'>
              <p>USER</p> 
              <p style={{color:' rgb(72, 8, 184)'}}>LOGIN</p> 
            </p>

            <div id='text-link'>
              <p>Dont't have account ?</p>
              <NavLink style={{color: 'black', textDecoration:'none',
                               marginTop:'16px', marginLeft:'5px',
                               fontWeight:'600'}} to="https://accounts.google.com/signup/v2/createaccount?flowName=GlifWebSignIn&flowEntry=SignUp" activeClassName="active-link">Sign up</NavLink>
            </div>
          </div>

        
          <div>
            <img id='google' src=''
                alt='' />
      {/* ---- */}
            <div className='login'>
              <div>
              {!useStore((state) => state.authData) ? (
  <>
    <GoogleOAuthProvider
      clientId='392820952736-nj4lm9s0al83vve0fmudse8t24bpopia.apps.googleusercontent.com'
    >
      <GoogleLogin
        useOneTap={true}
        onSuccess={handleLoginSuccess} // thay đổi ở đây
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  </>
) : (
  <>
    <User />
  </>
)}

                      
                  {/* {!useStore((state) => state.authData) ? (
				<>
					<GoogleOAuthProvider
						clientId='392820952736-nj4lm9s0al83vve0fmudse8t24bpopia.apps.googleusercontent.com'
					>
						<GoogleLogin
							useOneTap={true}
							onSuccess={async (credentialResponse) => {
								console.log(credentialResponse);
								const { data } = await axios.post(
									'http://localhost:3000/auth/redirect',
									{
										// pass the token as part of the req body
										token: credentialResponse.credential,
									},
								);
								localStorage.setItem(
									'AuthData',
									JSON.stringify(data),
								);
								setAuthData(data);
								navigate.push('/User');
							}}
							onError={() => {
								console.log('Login Failed');
							}}
						/>
					</GoogleOAuthProvider>
				</>
			) : (
				<>
					<User />
				</>
			)} */}
              </div>
            </div>
      {/* ---- */}
          </div>

        </div>
      </div>
      {/* ----------------- */}
    </div>
  )
}

export default App;
