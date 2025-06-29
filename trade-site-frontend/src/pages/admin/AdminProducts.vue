<template>
  <div class="admin-products">
    <h2>商品管理</h2>
    <button @click="showAddForm = true">新增商品</button>

    <!-- 新增 / 编辑表单 -->
    <div v-if="showAddForm || editItem" class="product-form">
      <h3>{{ editItem ? '编辑商品' : '新增商品' }}</h3>
      <form @submit.prevent="editItem ? updateProduct() : addProduct()">
        <label>
          名称：
          <input v-model="form.name" required />
        </label>
        <label>
          描述：
          <input v-model="form.description" />
        </label>
        <label>
          价格：
          <input v-model.number="form.price" type="number" required min="0" />
        </label>
        <label>
          图片链接：
          <input v-model="form.image_url" />
        </label>
        <button type="submit">{{ editItem ? '保存' : '添加' }}</button>
        <button type="button" @click="resetForm">取消</button>
      </form>
    </div>

    <!-- 商品列表 -->
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>描述</th>
          <th>价格</th>
          <th>图片</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>¥{{ item.price }}</td>
          <td><img :src="item.image_url" alt="" style="width: 50px;" /></td>
          <td>
            <button @click="editProduct(item)">编辑</button>
            <button @click="deleteProduct(item.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const products = ref([]);
const showAddForm = ref(false);
const editItem = ref(null);

const form = ref({
  name: '',
  description: '',
  price: 0,
  image_url: '',
});

function resetForm() {
  showAddForm.value = false;
  editItem.value = null;
  form.value = { name: '', description: '', price: 0, image_url: '' };
}

async function fetchProducts() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3000/api/admin/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    products.value = res.data;
  } catch (err) {
    alert('获取商品列表失败');
  }
}

async function addProduct() {
  try {
    const token = localStorage.getItem('token');
    await axios.post(
      'http://localhost:3000/api/admin/products',
      form.value,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('添加成功');
    resetForm();
    fetchProducts();
  } catch (err) {
    alert('添加失败');
  }
}

function editProduct(item) {
  editItem.value = item;
  form.value = { ...item };
  showAddForm.value = false;
}

async function updateProduct() {
  try {
    const token = localStorage.getItem('token');
    await axios.put(
      `http://localhost:3000/api/admin/products/${editItem.value.id}`,
      form.value,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('更新成功');
    resetForm();
    fetchProducts();
  } catch (err) {
    alert('更新失败');
  }
}

async function deleteProduct(id) {
  if (!confirm('确认删除该商品？')) return;
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3000/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('删除成功');
    fetchProducts();
  } catch (err) {
    alert('删除失败');
  }
}

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.admin-products {
  padding: 20px;
}
.product-form {
  margin: 20px 0;
  border: 1px solid #ccc;
  padding: 12px;
}
.product-form label {
  display: block;
  margin-bottom: 8px;
}
.product-form input {
  width: 100%;
  padding: 6px;
  margin-top: 4px;
  box-sizing: border-box;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background: #f4f4f4;
}
td,
th {
  padding: 8px;
  text-align: left;
}
button {
  margin-right: 8px;
  cursor: pointer;
}
</style>
