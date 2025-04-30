import axios from '@/utils/axios'

export default {
    adminStats(){
        return axios.get('/admin/dashboard');
    },
    cinemaStats(){
        return axios.get('/cinema-admin/dashboard');
    },

}