<template>
  <div>
    <h2>用户登录</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <button type="submit">登录</button>
    </form>
    <p>还没有账号？<router-link to="/register">注册</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

async function login() {
  try {
    const res = await axios.post('http://localhost:3000/api/login', {
      username: username.value,
      password: password.value
    });

    const { token, role } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/user');
    }
  } catch (err) {
    alert('登录失败：' + err.response.data.message);
  }
}
</script>
