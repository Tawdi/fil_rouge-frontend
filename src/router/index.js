import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Cinemas from '../views/Cinemas.vue'
import Support from '../views/Support.vue'
import About from '../views/About.vue'
const router = createRouter({
  history: createWebHistory(), 
  routes: [
    { path: '/', component: Home },
    { path: '/movies', component: Movies },
    { path: '/cinemas', component: Cinemas },
    { path: '/support', component: Support },
    { path: '/about', component: About },
  ],
});

export default router;
