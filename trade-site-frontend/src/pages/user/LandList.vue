<template>
  <div>
    <h2>土地买卖市场</h2>
    <div v-if="lands.length === 0">加载中...</div>
    <div v-else class="land-list">
      <div v-for="land in lands" :key="land.id" class="land-card">
        <img :src="land.image_url" alt="土地图片" style="width: 200px; height: 120px;" />
        <h3>{{ land.title }}</h3>
        <p>{{ land.location }} | 面积：{{ land.area }} 平方米</p>
        <p>价格：¥{{ land.price }}</p>
        <button @click="goToDetail(land.id)">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const lands = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/lands');
    lands.value = res.data;
  } catch (err) {
    console.error('获取土地列表失败', err);
  }
});

function goToDetail(id) {
  router.push(`/user/lands/${id}`);
}
</script>

<style scoped>
.land-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.land-card {
  border: 1px solid #ccc;
  padding: 16px;
  width: 250px;
  box-sizing: border-box;
}
</style>
