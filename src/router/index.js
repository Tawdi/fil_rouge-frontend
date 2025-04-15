import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Cinemas from '../views/Cinemas.vue'
import Support from '../views/Support.vue'
import About from '../views/About.vue'
import Auth from '../views/Auth.vue'
import MovieDetail from '../views/MoiveInfo.vue';
import CinemaInfo from '../views/CinemaInfo.vue'
import Profile from '../views/Profile.vue'
import SeatsSealection from '../views/SeatsSelection.vue'
// ===================== cinema admin ================================
import CinemaAdminDashboard from '../views/cinema_admin/Dashboard.vue'
// =====================  admin ================================
import AdminDashboard from '../views/admin/Dashboard.vue'

// ============ layouts
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import CinemaAdminLayout from '../layouts/CinemaAdminLayout.vue'
// ============

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ===============================================================
    // =========================  user  ==============================
    // ===============================================================
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '/connecte', component: Auth },
        { path: '/', component: Home },
        { path: '/movies', component: Movies },
        { path: '/movie/:id', component: MovieDetail},
        { path: '/cinemas', component: Cinemas },
        { path: '/cinema/:id', component: CinemaInfo},
        { path: '/support', component: Support },
        { path: '/about', component: About },
        { path: '/profile', component: Profile },
        { path: '/booking/:id', component: SeatsSealection },
      ]
    },

    // ===============================================================
    // =========================  cinema admin =======================
    // ===============================================================
    {
      path: '/cinema-admin',
      component: CinemaAdminLayout,
      children: [
        { path: 'dashboard', component: CinemaAdminDashboard },
        
      ]
    },
    // ===============================================================
    // =========================  super admin ========================
    // ===============================================================
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: 'dashboard', component: AdminDashboard },
       
      ]
    },

  ],
});

export default router;
