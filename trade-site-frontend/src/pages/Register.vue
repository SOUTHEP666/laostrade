<template>
  <div>
    <h2>注册账号</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <button type="submit">注册</button>
    </form>
    <p>已有账号？<router-link to="/login">登录</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

async function register() {
  try {
    await axios.post('http://localhost:3000/api/register', {
      username: username.value,
      password: password.value
    });
    alert('注册成功，请登录');
    router.push('/login');
  } catch (err) {
    alert('注册失败：' + err.response.data.message);
  }
}
</script>
