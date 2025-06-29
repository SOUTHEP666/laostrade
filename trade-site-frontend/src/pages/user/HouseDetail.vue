<template>
  <div v-if="house">
    <h2>{{ house.title }}</h2>
    <img :src="house.image_url" alt="房产图片" style="width: 400px; height: 240px; object-fit: cover;" />
    <p><strong>地址：</strong> {{ house.address }}</p>
    <p><strong>面积：</strong> {{ house.area }}</p>
    <p><strong>价格：</strong> ¥{{ house.price }}</p>
    <p><strong>描述：</strong> {{ house.description }}</p>
    <button @click="goBack">返回列表</button>
  </div>
  <div v-else>
    <p>加载中...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const house = ref(null);

onMounted(async () => {
  try {
    const id = route.params.id;
    const res = await axios.get(`http://localhost:3000/api/houses/${id}`);
    house.value = res.data;
  } catch (error) {
    console.error('获取房产详情失败', error);
  }
});

function goBack() {
  router.back();
}
</script>
