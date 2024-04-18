import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import { UserType } from "./types";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export async function getUsers() {
  try {
    const res: AxiosResponse<UserType[]> = await client.get("/users");
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
