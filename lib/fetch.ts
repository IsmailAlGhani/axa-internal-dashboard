import axios, { AxiosResponse } from "axios";
import { AlbumType, CommentType, PhotoType, PostType, UserType } from "./types";
import { cache } from "react";

export const BASE_URL = "https://jsonplaceholder.typicode.com";
const client = axios.create({
  baseURL: BASE_URL,
});

export const getUsers = async () => {
  try {
    const res: AxiosResponse<UserType[]> = await client.get("/users");
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getUser = async (userId: string) => {
  try {
    const res: AxiosResponse<UserType> = await client.get(`/users/${userId}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getPosts = cache(async (userId: string) => {
  try {
    const res: AxiosResponse<PostType[]> = await client.get("/posts", {});
    return res.data.filter((post) => post.userId === parseInt(userId));
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
});

export const getAlbums = async (userId: string) => {
  try {
    const res: AxiosResponse<AlbumType[]> = await client.get("/albums");
    return res.data.filter((post) => post.userId === parseInt(userId));
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getComments = cache(async (postId: string) => {
  try {
    const res1: AxiosResponse<CommentType[]> = await client.get(
      `/posts/${postId}/comments`
    );
    const res2: AxiosResponse<PostType> = await client.get(`/posts/${postId}`);
    return {
      comments: res1.data,
      post: res2.data,
    };
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
});

export const getPhotos = async (albumId: string) => {
  try {
    const res1: AxiosResponse<PhotoType[]> = await client.get(
      `/albums/${albumId}/photos`
    );
    const res2: AxiosResponse<AlbumType> = await client.get(
      `/albums/${albumId}`
    );
    return {
      photos: res1.data,
      albums: res2.data,
    };
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
