<template>
  <div v-if="land">
    <h2>{{ land.title }}</h2>
    <img :src="land.image_url" alt="土地图片" style="width: 400px; height: 240px;" />
    <p><strong>位置:</strong> {{ land.location }}</p>
    <p><strong>面积:</strong> {{ land.area }} 平方米</p>
    <p><strong>价格:</strong> ¥{{ land.price }}</p>
    <p><strong>描述:</strong> {{ land.description }}</p>
    <button @click="goBack">返回列表</button>
  </div>
  <div v-else>加载中...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const land = ref(null);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/lands/${route.params.id}`);
    land.value = res.data;
  } catch (err) {
    console.error('获取土地详情失败', err);
  }
});

function goBack() {
  router.push('/user/lands');
}
</script>
