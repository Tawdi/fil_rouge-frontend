import axios from "@/utils/axios";

export default {
  getCinemas() {
    return axios.get("/cinemas");
  },
  getCinema(id) {
    return axios.get(`/cinemas/${id}`);
  },
  createCinema(data) {
    return axios.post("/admin/cinemas", data);
  },
  updateCinema(id, data) {
    return axios.put(`/admin/cinemas/${id}`, data);
  },
  deleteCinema(id) {
    return axios.delete(`/admin/cinemas/${id}`);
  },
};
