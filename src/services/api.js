import axios from 'axios';

const moviesInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTA3Y2QyMGJlOTQ3NjU1MWE1YTI0ZWIxMDQ2MDM0OSIsIm5iZiI6MTczMDg1MTAzMy41OTI0NzM1LCJzdWIiOiI2NzIxNWNjYTgyNmZlNTc5OWNjNDliZjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gUWfA6DYM-PXbjCqzjjuuDVWrYTDPSVz4UIBembhjfs',
  },
  params: {
    include_adult: false,
    language: 'en-US',
    api_key: '6107cd20be9476551a5a24eb10460349',
  },
});

export const getMovies = async searchValue => {
  const { data } = await moviesInstance.get(
    `/search/movie?query=${searchValue}`
  );
  return data;
};

export const getMovieById = async movieId => {
  const { data } = await moviesInstance.get(`/movie/${movieId}`);
  return data;
};

export const getMovieCast = async movieId => {
  const { data } = await moviesInstance.get(`/movie/${movieId}/credits`);
  return data;
};
export const getMovieReviews = async movieId => {
  const { data } = await moviesInstance.get(`/movie/${movieId}/reviews`);
  return data;
};
