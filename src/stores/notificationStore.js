import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
  }),
  actions: {
    pushNotification({ message, type = 'success', timeout = 3000 }) {
      const id = Date.now() + Math.random(); 
      const notification = { id, message, type };

      this.notifications.push(notification);

      setTimeout(() => {
        this.removeNotification(id);
      }, timeout);
    },

    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    },
  },
});
