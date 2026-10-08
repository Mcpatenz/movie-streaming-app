export const getMovieById = (movies, id) => movies.find((movie) => movie.id === id) || null;

export const normalizeMovieSearch = (value = "") => value.trim().toLowerCase();
