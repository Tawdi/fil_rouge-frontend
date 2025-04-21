import axios from "@/utils/axios";

export default {
  getMovies() {
    return axios.get("/admin/movies");
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
