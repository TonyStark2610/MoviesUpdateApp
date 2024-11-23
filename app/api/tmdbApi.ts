import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "b9c7e77795962b1d3af0e8b79b3ba484";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getMovies = async (type: "popular" | "upcoming") => {
  const response = await tmdbApi.get(`/movie/${type}`);
  return response.data.results;
};

export const getMovieDetails = async (movieId: string) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};
