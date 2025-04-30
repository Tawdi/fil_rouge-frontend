import axios from '@/utils/axios'

export default {
  reserve(payload) {
      return axios.post('/reservations', payload);
    },
    getForSeance(seanceId){
      return axios.post(`/reservations/seance/${seanceId}`);
    },
  };