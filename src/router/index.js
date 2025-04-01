import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Cinemas from '../views/Cinemas.vue'
import Support from '../views/Support.vue'
import About from '../views/About.vue'
// ===================== cinema admin ================================
import CinemaAdminDashboard from '../views/cinema_admin/Dashboard.vue' 
// =====================  admin ================================
import AdminDashboard from '../views/admin/Dashboard.vue'  
const router = createRouter({
  history: createWebHistory(), 
  routes: [
    // ===============================================================
    // =========================  user  ==============================
    // ===============================================================
    { path: '/', component: Home },
    { path: '/movies', component: Movies },
    { path: '/cinemas', component: Cinemas },
    { path: '/support', component: Support },
    { path: '/about', component: About },
    // ===============================================================
    // =========================  cinema admin =======================
    // ===============================================================
    { path: '/admin/cinema', component: CinemaAdminDashboard },

    // ===============================================================
    // =========================  super admin ========================
    // ===============================================================
    { path: '/admin/', component: AdminDashboard },
  ],
});

export default router;
