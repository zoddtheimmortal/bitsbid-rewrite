import client from "./client";
import axios from "axios";

const supabase = client();

const API_URL = import.meta.env.VITE_APP_API_URL;

const URL = `${API_URL}/api/user`;

const createOrUpdateUser = async (user) => {
	try {
		const config = { "content-type": "application/json" };
		const payload = {
			fullName: user.full_name,
			pictureUrl: user.picture,
			email: user.email,
		};
		const res = await axios.post(`${URL}/set`, payload, config);
		return res.data;
	} catch (e) {
		console.error(e.response.data);
	}
};

const getUser = async (email) => {
	const res = await axios.get(`${URL}/get/${email}`);
	return res.data;
};

const UserService = {
	createOrUpdateUser,
	getUser,
};

export default UserService;
