import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
	baseURL: import.meta.env.VITE_APP_URL,
	withCredentials: true,
});

function useAxios() {
	const navigate = useNavigate();
	const { logOut } = useAuth();

	// * RESPONSE
	instance.interceptors.response.use(
		(res) => {
			return res;
		},
		async (error) => {
			if (error.response.status === 401) {
				await logOut();
				navigate("/login");
			}
			return Promise.reject(error);
		}
	);
	// axios.interceptors.request;
	return instance;
}

export default useAxios;
