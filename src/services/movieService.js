import axios from "@/utils/axios";

export default {
  getMovies(params={}) {
    return axios.get("/movies",{ params });
  },
  getMoviesInCinema(){
    return axios.get("/movies-has-seances");
  },
  createMovie(data) {
    return axios.post("/admin/movies", data);
  },
  updateMovie(id, data) {
    return axios.put(`/admin/movies/${id}`, data);
  },
  deleteMovie(id) {
    return axios.delete(`/admin/movies/${id}`);
  }
};
