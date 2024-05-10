/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import "aos/dist/aos.css";

import {
	FacebookAuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = function ({ children }) {
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const active = onAuthStateChanged(auth, (user) => {
			axios
				.post(
					`${import.meta.env.VITE_APP_URL}/jwt`,
					{
						email: user?.email,
					},
					{ withCredentials: true }
				)
				.then(({ data }) => console.log(data));
			setUser(user);
			setLoading(false);
		});
		return () => active();
	}, []);

	const signUp = async function (email, password, photoUrl, userName) {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(auth.currentUser, {
				displayName: userName,
				photoURL: photoUrl,
			});
			toast.success("Sign up successfully");
		} catch (error) {
			toast.error("Failed to sign up");
		}
	};

	const logIn = async function (...args) {
		try {
			await signInWithEmailAndPassword(auth, ...args);
			toast.success("Log in successfully");
		} catch (error) {
			toast.error("Wrong Credential");
		}
	};

	const logOut = async function () {
		try {
			await signOut(auth);
			await axios.get(`${import.meta.env.VITE_APP_URL}/logout`, {
				withCredentials: true,
			});
			toast.success("Log out successfully");
		} catch (error) {
			toast.error("Failed to log out");
		}
	};

	const logInWithMedia = async function (provider) {
		let finalProvider;
		switch (provider) {
			case "google":
				finalProvider = new GoogleAuthProvider();
				break;
			case "facebook":
				finalProvider = new FacebookAuthProvider();
				break;
			case "github":
				finalProvider = new GithubAuthProvider();
				break;
			default:
				throw new Error("Unknow provider");
		}

		try {
			await signInWithPopup(auth, finalProvider);
			toast.success("Log in successfully");
		} catch (error) {
			toast.error("Failed to log in");
		}
	};

	return (
		<AuthContext.Provider
			value={{
				signUp,
				logIn,
				logOut,
				user,
				logInWithMedia,
				theme,
				setTheme,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = function () {
	const context = useContext(AuthContext);
	if (!context) throw new Error("Call outside the provider");
	return context;
};

export { useAuth, AuthProvider };
