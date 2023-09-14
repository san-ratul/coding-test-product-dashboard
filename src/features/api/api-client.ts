import axios from "axios";

export const ApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://fakestoreapi.com',
    headers: {
        "Content-Type": "application/json"
    }
});