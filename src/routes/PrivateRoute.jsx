/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children }) {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) return <div className="py-20 text-center">Loading...</div>;
	return user ? (
		children
	) : (
		<Navigate to={"/login"} state={location.pathname} replace={true} />
	);
}

export default PrivateRoute;
