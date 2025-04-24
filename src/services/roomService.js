import axios from '@/utils/axios'

export default {
  async getRooms() {
    return await axios.get("/cinema-admin/rooms");
  },

  async createRoom(roomData) {
    return await axios.post("/cinema-admin/rooms", roomData);
  },

  async updateRoom(roomId, roomData) {
    return await axios.put(`/cinema-admin/rooms/${roomId}`, roomData);
  },

  async deleteRoom(roomId) {
    return await axios.delete(`/cinema-admin/rooms/${roomId}`);
  },
};
