import axios, { AxiosInstance } from "axios";

export const client: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  timeout: 5000,
});
