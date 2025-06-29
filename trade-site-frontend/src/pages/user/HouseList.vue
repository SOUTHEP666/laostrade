<template>
  <div>
    <h2>房产交易市场</h2>
    <div v-if="houses.length === 0">加载中...</div>
    <div v-else class="house-list">
      <div v-for="house in houses" :key="house.id" class="house-card">
        <img :src="house.image_url" alt="房产图片" style="width: 200px; height: 120px; object-fit: cover;" />
        <h3>{{ house.title }}</h3>
        <p>地址: {{ house.address }}</p>
        <p>面积: {{ house.area }}</p>
        <p>价格: ¥{{ house.price }}</p>
        <button @click="goToDetail(house.id)">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const houses = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/houses');
    houses.value = res.data;
  } catch (error) {
    console.error('获取房产数据失败', error);
  }
});

function goToDetail(id) {
  router.push(`/user/houses/${id}`);
}
</script>

<style scoped>
.house-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.house-card {
  border: 1px solid #ccc;
  padding: 12px;
  width: 240px;
  box-sizing: border-box;
}
</style>
