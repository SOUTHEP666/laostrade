<template>
  <div>
    <h2>商品交易市场</h2>
    <div v-if="products.length === 0">加载中...</div>
    <div v-else class="product-list">
      <div v-for="item in products" :key="item.id" class="product-card">
        <img :src="item.image_url" alt="图片" style="width: 150px;" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p>价格：¥{{ item.price }}</p>
        <button @click="goToDetail(item.id)">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const products = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/products');
    products.value = res.data;
  } catch (error) {
    console.error('获取商品数据失败', error);
  }
});

function goToDetail(id) {
  router.push(`/user/products/${id}`);
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  width: 200px;
}
</style>
