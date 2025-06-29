<template>
  <div>
    <h2>二手车交易市场</h2>
    <div v-if="cars.length === 0">加载中...</div>
    <div v-else class="car-list">
      <div v-for="car in cars" :key="car.id" class="car-card">
        <img :src="car.image_url" alt="车图" style="width: 150px;" />
        <h3>{{ car.brand }} - {{ car.model }}</h3>
        <p>年份：{{ car.year }}</p>
        <p>里程：{{ car.mileage }} 公里</p>
        <p>价格：¥{{ car.price }}</p>
        <button @click="viewCar(car.id)">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const cars = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/cars');
    cars.value = res.data;
  } catch (error) {
    console.error('获取车辆数据失败', error);
  }
});

function viewCar(id) {
  router.push(`/user/cars/${id}`);
}
</script>

<style scoped>
.car-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.car-card {
  border: 1px solid #ccc;
  padding: 16px;
  width: 240px;
}
</style>
