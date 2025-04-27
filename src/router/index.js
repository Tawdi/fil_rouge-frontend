import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/views/Home.vue');
const Movies = () => import('@/views/Movies.vue');
const Cinemas = () => import('@/views/Cinemas.vue');
const Support = () => import('@/views/Support.vue');
const About = () => import('@/views/About.vue');
const Auth = () => import('@/views/Auth.vue');
const MovieDetail = () => import('@/views/MoiveInfo.vue');
const CinemaInfo = () => import('@/views/CinemaInfo.vue');
const Profile = () => import('@/views/Profile.vue');
const SeatsSealection = () => import('@/views/SeatsSelection.vue');
// ===================== cinema admin ================================
const CinemaAdminDashboard = () => import('../views/cinema_admin/Dashboard.vue');
const CinemaAdminRoomManager = () => import('../views/cinema_admin/RoomManager.vue');
const CinemaAdminSeanceManager = () => import('../views/cinema_admin/SeanceManager.vue');

// =====================  admin ================================
const AdminDashboard = () => import('@/views/admin/Dashboard.vue');
const AdminMovies = () => import('@/views/admin/Movies.vue');
const AdminCinemas = () => import('@/views/admin/Cinemas.vue');
const AdminUsers = () => import('@/views/admin/Users.vue');

// ============ layouts
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue');
const AdminLayout = () => import('@/layouts/AdminLayout.vue');
const CinemaAdminLayout = () => import('@/layouts/CinemaAdminLayout.vue');
// =========
const _403 = ()=> import('@/views/errors/403.vue');
const _404 = ()=> import('@/views/errors/404.vue');
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
        {  path: '/auth/callback', component: () => import('@/views/AuthCallback.vue'), },
        { path: '/', component: Home },
        { path: '/movies', component: Movies },
        { path: '/movie/:id', component: MovieDetail},
        { path: '/cinemas', component: Cinemas },
        { path: '/cinema/:id', component: CinemaInfo},
        { path: '/support', component: Support },
        { path: '/about', component: About },
        { path: '/profile', component: Profile , meta: { requiresAuth: true , requiredRole:'user'} ,},
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
        { path: 'room-manage', component: CinemaAdminRoomManager },
        { path: 'seance-manage', component: CinemaAdminSeanceManager },
        
      ]
    },
    // ===============================================================
    // =========================  super admin ========================
    // ===============================================================
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: 'dashboard', component: AdminDashboard  },
        { path: 'movies', component: AdminMovies },
        { path: 'cinemas', component: AdminCinemas },
        { path: 'users', component: AdminUsers },
       
      ]
    },
    {path:'/403', component: _403,},
    {path: '/:pathMatch(.*)*', component: _404 ,}
  ],
});

const addMetaToAdminRoutes = () => {
  const adminRoutes = router.getRoutes().filter(route => route.path.startsWith('/admin'));
  
  adminRoutes.forEach(route => {
    route.meta = route.meta || {};
    route.meta.requiresAuth = true;
    route.meta.requiredRole = 'super_admin';
  });

  const cinemaAdminRoutes = router.getRoutes().filter(route => route.path.startsWith('/cinema-admin'));
  
  cinemaAdminRoutes.forEach(route => {
    route.meta = route.meta || {};
    route.meta.requiresAuth = true;
    route.meta.requiredRole = 'cinema_admin';
  });
};

addMetaToAdminRoutes();

import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from "@/stores/notificationStore";



router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const notificationStore = useNotificationStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    notificationStore.pushNotification({
      message: "Please Login first :)",
      type: "error",
      persist: true,
    });
    next('/connecte');
  } else if (to.meta.requiresAuth && auth.isAuthenticated) {
    const userRole = auth.user?.role;
    if (to.meta.requiredRole && to.meta.requiredRole !== userRole) {
      next('/403'); 
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
