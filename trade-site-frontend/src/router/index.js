// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import AdminDashboard from '../pages/AdminDashboard.vue';
import UserDashboard from '../pages/UserDashboard.vue';
import ProductList from '../pages/ProductList.vue';
import UserProducts from '../pages/UserProducts.vue';
import CarList from '../pages/CarList.vue';
import CarDetail from '../pages/CarDetail.vue';
import ProductDetail from '../pages/ProductDetail.vue'; // 商品详情页
import AdminProducts from '../pages/admin/AdminProducts.vue'


import UserLands from '../pages/user/LandList.vue'
import LandDetail from '../pages/user/LandDetail.vue';
import AdminLands from '../pages/admin/AdminLands.vue';

import HouseList from '../pages/user/HouseList.vue';
import HouseDetail from '../pages/user/HouseDetail.vue';
import AdminHouses from '../pages/admin/AdminHouses.vue';
import AdminCars from '../pages/admin/AdminCars.vue';


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard,meta: { requiresAuth: true, role: 'admin' } },
  { path: '/user', name: 'UserDashboard', component: UserDashboard,meta: { requiresAuth: true, role: 'user' } },
  { path: '/products', name: 'ProductList', component: ProductList,meta: { requiresAuth: true, role: 'user' } },
 { path: '/user/products', name: 'UserProducts', component: UserProducts,meta: { requiresAuth: true, role: 'user' } }, // ✅ 添加这一行
 { path: '/user/products/:id', component: ProductDetail, props: true,meta: { requiresAuth: true, role: 'user' }  },
{
  path: '/user/cars',
  name: 'CarList',
  component: CarList,
  meta: { requiresAuth: true, role: 'user' } 
},
{
  path: '/user/cars/:id',
  name: 'CarDetail',
  component: CarDetail,
  props: true,
  meta: { requiresAuth: true, role: 'user' } ,
},
{
  path: '/user/products/:id',
  component: ProductDetail,
  props: true,
  meta: { requiresAuth: true, role: 'user' } ,
},

  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts,
    meta: { requiresAuth: true, role: 'admin' }
  },

  {
    path: '/user/lands',
    name: 'UserLands',
    component: UserLands,
    meta: { requiresAuth: true, role: 'user' }
  },
    {
    path: '/user/lands/:id',
    name: 'LandDetail',
    component: LandDetail,
    meta: { requiresAuth: true, role: 'user' }
  },
    {
    path: '/admin/lands',
    name: 'AdminLands',
    component: AdminLands,
    meta: { requiresAuth: true, role: 'admin' }
  },

  {
  path: '/user/houses',
  name: 'HouseList',
  component: HouseList,
  meta: { requiresAuth: true, role: 'user' }
},
{
  path: '/user/houses/:id',
  name: 'HouseDetail',
  component: HouseDetail,
  props: true,
  meta: { requiresAuth: true, role: 'user' }
},

{
  path: '/admin/houses',
  name: 'AdminHouses',
  component: AdminHouses,
  meta: { requiresAuth: true, role: 'admin' }
},

{
  path: '/admin/cars',
  name: 'AdminCars',
  component: AdminCars,
  meta: { requiresAuth: true, role: 'admin' }
},



];

const router = createRouter({
  history: createWebHistory(),
  routes
});







// 全局导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (!token) {
      // 没登录，跳登录页
      return next({ name: 'Login' });
    }

    // 解析 token 判断角色
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const user = JSON.parse(jsonPayload);

      // 判断角色权限
      if (to.meta.role && user.role !== to.meta.role) {
        alert('权限不足，无法访问该页面');
        return next(false);
      }

      next();
    } catch (err) {
      console.error('token 解析错误', err);
      localStorage.removeItem('token');
      return next({ name: 'Login' });
    }
  } else {
    // 不需要登录的页面直接放行
    next();
  }
});



export default router;
