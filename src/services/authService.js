import axios from '@/utils/axios'

export default {
  async login(credentials) {
    const { data } = await axios.post('/auth/login', credentials)
    return data
  },

  async register(credentials) {
    const { data } = await axios.post('/auth/register', credentials)
    return data
  },

  async getUser() {
    const responce = await axios.get('/auth/me')
    return responce.data
  },

  async refreshToken() {
    const { data } = await axios.post('/auth/refresh-token')
    return data
  },
}
