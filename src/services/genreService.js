import axios from "@/utils/axios";

export default {
  getGenres() {
    return axios.get("/genres");
  },
  getGenresImg() {
    return axios.get("/genres/imgs");
  },
  createGenre(data) {
    return axios.post("/admin/genres", data);
  },
  updateGenre(id, data) {
    return axios.put(`/admin/genres/${id}`, data);
  },
  deleteGenre(id) {
    return axios.delete(`/admin/genres/${id}`);
  }
};
