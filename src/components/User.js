import React from 'react';
import { useStore } from '../hook/useStore';
import { googleLogout } from '@react-oauth/google';
import '../User.css';
const User = () => {
	const { authData, setAuthData } = useStore();
	return (
		<div className={'container'}>
			{authData && (
				<>
					<h1>{authData.data.name}</h1>
					<p>{authData.data.email}</p>
					<p>{authData.jwt}</p>
					<img
						src={authData.data.picture}
						alt="profile"
					/>

					<button
						onClick={() => {
							googleLogout();
							localStorage.removeItem('AuthData');
							setAuthData(null);
							window.location.reload();
						}}
						className={'button'}
					>
						Logout
					</button>
				</>
			)}
		</div>
	);
};

export default User;
