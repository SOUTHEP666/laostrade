<template>
  <div class="home">
    <img src="/logo.png" alt="logo" style="width: 100px;" />
    <h1>欢迎来到联达交易网</h1>
    <p>我们提供：商品交易、二手车、土地买卖、房产交易等服务</p>
    <button @click="goLogin">进入我们</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function goLogin() {
  router.push('/login');
}
</script>
