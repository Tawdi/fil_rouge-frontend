import axios from '@/utils/axios'

export default {

  reserve(payload) {
      return axios.post('/reservations', payload);
    },
    userReserevation() {
      return axios.get('/reservations');
    },
    show(id){
      return axios.get(`/reservations/${id}`)
    },
    getForSeance(seanceId){
      return axios.post(`/reservations/seance/${seanceId}`);
    },
  };