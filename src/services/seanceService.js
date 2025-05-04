import axios from "@/utils/axios";

export default {
  getSeances(params = {}) {
    return axios.get('/cinema-admin/seances', { params });
  },

  getSeance(id) {
    return axios.get(`/seances/${id}`);
  },

  getForMovie(id) {
    return axios.get(`/seances/movie/${id}`);
  },
  createSeance(seance) {
    return axios.post('/cinema-admin/seances', seance);
  },

  updateSeance(id, seance) {
    return axios.put(`/cinema-admin/seances/${id}`, seance);
  },
  
  deleteSeance(id) {
    return axios.delete(`/cinema-admin/seances/${id}`);
  }
};