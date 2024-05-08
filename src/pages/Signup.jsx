import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import Lottie from "lottie-react";
import signUpAnimation from "../assets/signup.json";

// import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import InputPassword from "../components/InputPassword";
import ButtonContainer from "../components/Button";

const userSchema = object({
	email: string().required("Email is required"),
	userName: string().required("User name is required"),
	photoUrl: string().required("Photo URL is required"),
	password: string()
		.min(8, "Password must be at least 8 characters long")
		.required("Password is required"),
});

function SignUp() {
	const initialState = {
		email: "",
		password: "",
		userName: "",
		photoUrl: "",
	};
	const { signUp, user } = useAuth();
	const [error, setError] = useState(null);
	const [userInfo, setUserInfo] = useState(initialState);

	const handleUser = (property, e) => {
		setUserInfo({ ...userInfo, [property]: e.target.value });
	};

	const validation = async function () {
		setError(null);
		try {
			await userSchema.validate(userInfo, {
				abortEarly: false,
			});
			return true;
		} catch (error) {
			const errorObj = {};
			error.inner.forEach((err) => {
				errorObj[err.path] = err.message;
			});
			setError(errorObj);
			return false;
		}
	};

	const handleSignup = async function (e) {
		const { email, password, photoUrl, userName } = userInfo;
		e.preventDefault();
		const validated = await validation();
		if (validated && !user) {
			signUp(email, password, photoUrl, userName);
			setUserInfo(initialState);
		}
	};

	return (
		<section className="dark:bg-gray-900 mb-12 lg:mb-0">
			<div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center px-6 mx-auto lg:py-0">
				<figure>
					<Lottie animationData={signUpAnimation} loop={true} />
				</figure>

				<div className="w-full bg-white rounded-lg border shadow-sm dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create an account
						</h1>
						<form
							onSubmit={(e) => e.preventDefault()}
							className="flex flex-col gap-4"
						>
							<TextField
								id="userName"
								label="User Name"
								type="text"
								variant="outlined"
								required={true}
								placeholder="Anunay Argha"
								defaultValue={userInfo.userName}
								onChange={handleUser.bind(null, "userName")}
								error={Boolean(error?.userName)}
								helperText={error?.userName}
							/>

							<TextField
								id="email"
								label="Email"
								type="email"
								variant="outlined"
								required={true}
								placeholder="name@yahoo.com"
								defaultValue={userInfo.email}
								onChange={handleUser.bind(null, "email")}
								error={Boolean(error?.email)}
								helperText={error?.email}
							/>

							<TextField
								id="photoUrl"
								label="Photo URL"
								type="text"
								variant="outlined"
								required={true}
								placeholder="https://picsum.photos/200"
								defaultValue={userInfo.photoUrl}
								onChange={handleUser.bind(null, "photoUrl")}
								error={Boolean(error?.photoUrl)}
								helperText={error?.photoUrl}
							/>

							<InputPassword
								error={Boolean(error?.password)}
								value={userInfo.password}
								onChange={handleUser.bind(null, "password")}
							/>
							<ErrorMessage error={error?.password} />

							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="terms"
										aria-describedby="terms"
										type="checkbox"
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primaryForm-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primaryForm-600 dark:ring-offset-gray-800"
										required={true}
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="terms"
										className="font-light text-gray-500 dark:text-gray-300"
									>
										I accept the{" "}
										<a
											className="font-medium text-primaryForm-600 hover:underline dark:text-primaryForm-500"
											href="#"
										>
											Terms and Conditions
										</a>
									</label>
								</div>
							</div>

							<ButtonContainer event={handleSignup}>
								Create an account
							</ButtonContainer>

							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{" "}
								<Link to="/login">
									<button className="font-medium text-primaryForm-600 hover:underline dark:text-primaryForm-500">
										Login here
									</button>
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SignUp;
