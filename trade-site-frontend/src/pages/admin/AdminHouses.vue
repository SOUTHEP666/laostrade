<template>
  <div>
    <h2>房产管理</h2>
    <el-button type="primary" @click="openAddDialog">新增房产</el-button>

    <el-table :data="houses" style="margin-top: 20px;" border>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="area" label="面积" />
      <el-table-column prop="price" label="价格" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="confirmDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 房产新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="editMode ? '编辑房产' : '新增房产'">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="面积">
          <el-input v-model="form.area" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description" />
        </el-form-item>
        <el-form-item label="图片链接">
          <el-input v-model="form.image_url" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveHouse">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const houses = ref([]);
const dialogVisible = ref(false);
const editMode = ref(false);
const form = ref({
  title: '',
  address: '',
  area: '',
  price: '',
  description: '',
  image_url: ''
});
let editingId = null;

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const fetchHouses = async () => {
  try {
    const res = await axiosInstance.get('/houses');
    houses.value = res.data;
  } catch (err) {
    ElMessage.error('获取房产列表失败');
  }
};

onMounted(fetchHouses);

const openAddDialog = () => {
  editMode.value = false;
  form.value = {
    title: '',
    address: '',
    area: '',
    price: '',
    description: '',
    image_url: ''
  };
  dialogVisible.value = true;
};

const openEditDialog = (house) => {
  editMode.value = true;
  editingId = house.id;
  form.value = { ...house };
  dialogVisible.value = true;
};

const saveHouse = async () => {
  try {
    if (editMode.value) {
      await axiosInstance.put(`/houses/${editingId}`, form.value);
      ElMessage.success('修改成功');
    } else {
      await axiosInstance.post('/houses', form.value);
      ElMessage.success('新增成功');
    }
    dialogVisible.value = false;
    fetchHouses();
  } catch (err) {
    ElMessage.error('操作失败');
  }
};

// 新增确认删除
const confirmDelete = (id) => {
  ElMessageBox.confirm(
    '确认删除该房产吗？此操作不可撤销。',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    deleteHouse(id);
  }).catch(() => {
    // 取消删除，不做操作
  });
};

const deleteHouse = async (id) => {
  try {
    await axiosInstance.delete(`/houses/${id}`);
    ElMessage.success('删除成功');
    fetchHouses();
  } catch (err) {
    ElMessage.error('删除失败');
  }
};
</script>
