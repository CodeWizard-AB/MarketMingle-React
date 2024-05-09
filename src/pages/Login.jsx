import { useAuth } from "../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login.json";

import TextField from "@mui/material/TextField";
import InputPassword from "../components/InputPassword";
import ButtonContainer from "../components/Button";

function Login() {
	const { logInWithMedia, logIn, user, loading } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const [userData, setUserData] = useState({ email: "", password: "" });

	const handleLogin = (property, e) => {
		setUserData({ ...userData, [property]: e.target.value });
	};

	useEffect(() => {
		if (user) navigate(location.state ? location.state : "/");
	}, [user, navigate, location.state]);

	return (
		<section className="dark:bg-gray-900 mb-12 lg:mb-0 py-10">
			<div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center px-6 mx-auto lg:py-0">
				<figure>
					<Lottie animationData={loginAnimation} loop={true} />
				</figure>
				<div className="w-full bg-white rounded-lg shadow-sm border dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form
							autoComplete="on"
							className="space-y-4 md:space-y-6 flex flex-col"
							onSubmit={(e) => e.preventDefault()}
						>
							<TextField
								id="userEmail"
								label="Email"
								type="email"
								variant="outlined"
								required={true}
								placeholder="name@gmail.com"
								defaultValue={userData.email}
								onChange={handleLogin.bind(null, "email")}
							/>

							<InputPassword
								value={userData.password}
								onChange={handleLogin.bind(null, "password")}
							/>

							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primaryForm-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primaryForm-600 dark:ring-offset-gray-800"
											required={true}
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="remember"
											className="text-gray-500 dark:text-gray-300"
										>
											Remember me
										</label>
									</div>
								</div>
								<a className="text-sm font-medium text-primaryForm-600 hover:underline dark:text-primaryForm-500">
									Forgot password?
								</a>
							</div>
							<ButtonContainer
								event={() => {
									userData.email &&
										userData.password &&
										logIn(userData.email, userData.password);
								}}
							>
								{!loading ? (
									"Sign in"
								) : (
									<span className="loading loading-dots loading-md"></span>
								)}
							</ButtonContainer>
						</form>
						<div>
							<p className="text-center before:content-[''] before:w-full before:bg-gray-200 before:h-[1px] gap-1 flex items-center after:content-[''] after:w-full after:bg-gray-200 after:h-[1px]">
								or
							</p>
							<figure className="flex justify-center items-center gap-4 *:w-20 border-b pb-4 *:border *:p-4 *:rounded-lg my-6">
								<button onClick={logInWithMedia.bind(null, "google")}>
									<img
										src="https://i.postimg.cc/HWwMP6Rw/google.png"
										alt="google"
									/>
								</button>
								<button onClick={logInWithMedia.bind(null, "facebook")}>
									<img
										src="https://i.postimg.cc/2Sf0TRkL/facebook.png"
										alt="facebook"
									/>
								</button>
								<button onClick={logInWithMedia.bind(null, "github")}>
									<img
										src="https://i.postimg.cc/gjH6X08S/github.png"
										alt="github"
									/>
								</button>
							</figure>
							<p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?{" "}
								<Link to="/signup">
									<button className="font-medium text-blue-500 hover:underline">
										Sign up
									</button>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Login;
