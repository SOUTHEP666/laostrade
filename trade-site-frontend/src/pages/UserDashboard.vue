<template>
  <div>
    <h1>用户中心</h1>
    <p>欢迎您，普通用户！</p>
    <button @click="goToProducts">进入商品交易</button>
    <button @click="goToCars">进入二手车交易</button>
    <button @click="goToLands">进入土地交易</button>
    <button @click="goToHouses">进入房产交易</button>
    <button @click="logout">退出登录</button>
    
    <!-- 子路由出口，必须添加 -->
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

// products
function goToProducts() {
  router.push('/user/products');
}

// cars
function goToCars() {
  router.push('/user/cars');
}

// lands
function goToLands() {
  router.push('/user/lands');
}

// lands
function goToHouses() {
  router.push('/user/houses');
}
// 退出登录
function logout() {
  localStorage.removeItem('token'); // 删除token
  router.push('/'); // 跳首页
}
</script>
