import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Home from "../pages/Home";
import JobDetail from "../pages/JobDetail";
import ErrorPage from "../pages/ErrorPage";
import PostJob from "../pages/PostJob";
import MyPostJobs from "../pages/MyPostJobs";
import JobBids from "../pages/JobBids";
import PrivateRoute from "./PrivateRoute";
import BidRequests from "../pages/BidRequest";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/market-jobs/:id",
				element: (
					<PrivateRoute>
						<JobDetail />
					</PrivateRoute>
				),
				loader: ({ params: { id } }) =>
					fetch(`${import.meta.env.VITE_APP_URL}/market-jobs/${id}`),
			},
			{
				path: "/post-job/:email",
				element: (
					<PrivateRoute>
						<PostJob />
					</PrivateRoute>
				),
			},
			{
				path: "/posted-jobs/:email",
				element: (
					<PrivateRoute>
						<MyPostJobs />
					</PrivateRoute>
				),
				loader: ({ params: { email } }) =>
					fetch(`${import.meta.env.VITE_APP_URL}/market-jobs?email=${email}`),
			},
			{
				path: "/job-bids/:email",
				element: (
					<PrivateRoute>
						<JobBids />
					</PrivateRoute>
				),
				loader: ({ params: { email } }) =>
					fetch(`${import.meta.env.VITE_APP_URL}/market-bids?email=${email}`),
			},
			{
				path: "/bid-request/:email",
				element: (
					<PrivateRoute>
						<BidRequests />
					</PrivateRoute>
				),
				loader: ({ params: { email } }) =>
					fetch(
						`${import.meta.env.VITE_APP_URL}/market-bids?buyer_email=${email}`
					),
			},
		],
	},
]);
