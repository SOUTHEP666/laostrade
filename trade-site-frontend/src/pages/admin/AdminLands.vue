<template>
  <div>
    <h2>土地管理</h2>

    <!-- 表单部分 -->
    <form @submit.prevent="handleSubmit">
      <input v-model="form.title" placeholder="标题" required />
      <input v-model="form.price" type="number" placeholder="价格" required />
      <input v-model="form.location" placeholder="位置" />
      <input v-model="form.area" type="number" placeholder="面积（平方米）" />
      <input v-model="form.image_url" placeholder="图片链接" />
      <textarea v-model="form.description" placeholder="描述"></textarea>

      <button type="submit">{{ isEditing ? '更新' : '新增' }}</button>
      <button v-if="isEditing" type="button" @click="cancelEdit">取消</button>
    </form>

    <hr />

    <!-- 土地列表 -->
    <div v-if="lands.length === 0">加载中...</div>
    <div v-else class="land-list">
      <div v-for="land in lands" :key="land.id" class="land-card">
        <h3>{{ land.title }}</h3>
        <p>价格：¥{{ land.price }}</p>
        <button @click="editLand(land)">编辑</button>
        <button @click="deleteLand(land.id)">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const lands = ref([]);
const isEditing = ref(false);
const form = ref({
  id: null,
  title: '',
  description: '',
  price: null,
  location: '',
  area: null,
  image_url: ''
});

const token = localStorage.getItem('token');

// 获取土地列表
async function fetchLands() {
  try {
    const res = await axios.get('http://localhost:3000/api/lands');
    lands.value = res.data;
  } catch (error) {
    console.error('获取土地列表失败', error);
  }
}

// 页面加载时获取数据
onMounted(fetchLands);

// 重置表单
function resetForm() {
  form.value = {
    id: null,
    title: '',
    description: '',
    price: null,
    location: '',
    area: null,
    image_url: ''
  };
}

// 提交表单
async function handleSubmit() {
  try {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    if (isEditing.value) {
      // 更新土地信息
      await axios.put(`http://localhost:3000/api/lands/${form.value.id}`, form.value, { headers });
    } else {
      // 新增土地信息
      await axios.post('http://localhost:3000/api/lands', form.value, { headers });
    }

    await fetchLands();
    resetForm();
    isEditing.value = false;
  } catch (error) {
    console.error('提交失败', error);
  }
}

// 编辑土地
function editLand(land) {
  form.value = { ...land };
  isEditing.value = true;
}

// 取消编辑
function cancelEdit() {
  resetForm();
  isEditing.value = false;
}

// 删除土地
async function deleteLand(id) {
  try {
    await axios.delete(`http://localhost:3000/api/lands/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    await fetchLands();
  } catch (error) {
    console.error('删除失败', error);
  }
}
</script>

<style scoped>
.land-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.land-card {
  border: 1px solid #ccc;
  padding: 1rem;
  width: 200px;
}
</style>
