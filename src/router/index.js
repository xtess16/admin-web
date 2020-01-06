import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import AdminMain from '../views/AdminMain.vue';
import Login from "../views/auth/Login";
import PageNotFound from "../components/common/PageNotFound";
import DynamicETable from "../views/entitiesContent/eTable/DynamicETable";
import DynamicEAddEdit from "../views/entitiesContent/eAddEdit/DynamicEAddEdit";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'adminMain',
    component: AdminMain,
    children: [
      {
        path: '/e-table/:name',
        name: 'eTable',
        component: DynamicETable,
      },
      {
        path: '/e-add-edit/:name/:id',
        name: 'eAddEdit',
        component: DynamicEAddEdit,
      }
    ]
  },
  {
    path: '/main/login',
    name: 'login',
    component: Login,
  },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || from.name) {
    return next()
  }
  store.dispatch("users/checkAuth").then(() => {
    if (!store.getters['users/isAuthenticated']) {
      next({ name: 'login'});
    } else {
      next();
    }
  })
});

export default router
