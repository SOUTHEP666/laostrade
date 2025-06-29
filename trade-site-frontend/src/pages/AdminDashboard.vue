<template>
  <div class="admin-dashboard">
    <h1>管理员中心</h1>
    <p>欢迎您，管理员！请选择要管理的模块：</p>

    <div class="admin-modules">
      <router-link to="/admin/products" class="admin-card">商品管理</router-link>
      <router-link to="/admin/cars" class="admin-card">二手车管理</router-link>
      <router-link to="/admin/lands" class="admin-card">土地管理</router-link>
      <router-link to="/admin/houses" class="admin-card">房产管理</router-link>
    </div>

    <button @click="logout" class="logout-btn">退出登录</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<style scoped>
.admin-dashboard {
  padding: 32px;
}
.admin-modules {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}
.admin-card {
  display: block;
  padding: 16px 24px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  text-decoration: none;
  color: #333;
  border-radius: 8px;
}
.admin-card:hover {
  background: #e6f7ff;
  border-color: #1890ff;
}
.logout-btn {
  margin-top: 20px;
  padding: 8px 16px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
