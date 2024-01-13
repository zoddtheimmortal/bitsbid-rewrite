import client from "./client";
import axios from "axios";

const supabase = client();

const API_URL = import.meta.env.VITE_APP_API_URL;

const getAllProducts = async () => {
	const res = await supabase.from("item").select();
	return res.data;
};

const getProductUsingId = async (itemId) => {
	const res = await supabase.from("item").select().eq("id", itemId);
	return res.data;
};

const ProductService = {
	getAllProducts,
	getProductUsingId,
};

export default ProductService;
