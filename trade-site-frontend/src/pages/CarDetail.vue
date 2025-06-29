<template>
  <div v-if="car">
    <h2>{{ car.brand }} {{ car.model }} - 详细信息</h2>
    <img :src="car.image_url" alt="车辆图片" style="width: 400px;"/>
    <p><strong>年份：</strong> {{ car.year }}</p>
    <p><strong>里程：</strong> {{ car.mileage }} 公里</p>
    <p><strong>价格：</strong> ¥{{ car.price }}</p>
    <p><strong>描述：</strong> {{ car.description }}</p>
    <button @click="goBack">返回列表</button>
  </div>
  <div v-else>
    <p>加载中...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const car = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/cars/${route.params.id}`);
    car.value = res.data;
  } catch (error) {
    console.error('获取车辆详情失败', error);
    alert('车辆详情加载失败');
    router.push('/user/cars');
  }
});

function goBack() {
  router.push('/user/cars');
}
</script>

<style scoped>
img {
  border: 1px solid #ccc;
  margin-bottom: 16px;
}
</style>
