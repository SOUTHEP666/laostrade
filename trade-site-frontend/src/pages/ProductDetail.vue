<template>
  <div v-if="product">
    <h2>{{ product.name }} - 详细信息</h2>
    <img :src="product.image_url" alt="商品图片" style="width: 400px;" />
    <p><strong>价格：</strong> ¥{{ product.price }}</p>
    <p><strong>描述：</strong> {{ product.description }}</p>
    <button @click="goBack">返回商品列表</button>
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
const product = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/products/${route.params.id}`);
    console.log('路由参数 id:', route.params.id);

    product.value = res.data;
  } catch (error) {
    console.error('获取商品详情失败', error);
    alert('商品详情加载失败');
    router.push('/user/products');
  }
});

function goBack() {
  router.push('/user/products');
}
</script>

<style scoped>
img {
  border: 1px solid #ccc;
  margin-bottom: 16px;
}
</style>
