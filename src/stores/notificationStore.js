import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
  }),
  actions: {
    pushNotification({ message, type = 'success', timeout = 5000, persist = false  }) {
      const id = Date.now() + Math.random(); 
      const notification = { id, message, type };

      this.notifications.push(notification);

      if (!persist) {
        setTimeout(() => {
          this.removeNotification(id);
        }, timeout);
      }
    },

    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    },
  },
});
