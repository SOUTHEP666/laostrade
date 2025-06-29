<template>
  <div>
    <h2>二手车管理</h2>
    <el-button type="primary" @click="openAddDialog">新增车辆</el-button>

    <el-table :data="cars" style="margin-top: 20px;" border>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="brand" label="品牌" />
      <el-table-column prop="model" label="型号" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="year" label="年份" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="confirmDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="editMode ? '编辑车辆' : '新增车辆'">
      <el-form :model="form" label-width="80px" ref="carForm" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="form.brand" />
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="form.model" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input type="number" v-model.number="form.price" />
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-input type="number" v-model.number="form.year" />
        </el-form-item>
        <el-form-item label="里程数" prop="mileage">
          <el-input type="number" v-model.number="form.mileage" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description" />
        </el-form-item>
        <el-form-item label="图片链接" prop="image_url">
          <el-input v-model="form.image_url" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const cars = ref([]);
const dialogVisible = ref(false);
const editMode = ref(false);
const form = ref({
  title: '',
  brand: '',
  model: '',
  price: 0,
  year: new Date().getFullYear(),
  mileage: 0,
  description: '',
  image_url: ''
});
let editingId = null;

// 表单引用，用于调用 validate
const carForm = ref(null);

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
  model: [{ required: true, message: '请输入型号', trigger: 'blur' }],
  price: [{ required: true, type: 'number', message: '请输入价格', trigger: 'blur' }],
  year: [{ required: true, type: 'number', message: '请输入年份', trigger: 'blur' }],
  mileage: [{ required: true, type: 'number', message: '请输入里程数', trigger: 'blur' }],
  image_url: [{ required: true, message: '请输入图片链接', trigger: 'blur' }],
};

const fetchCars = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/cars');
    cars.value = res.data;
  } catch (error) {
    ElMessage.error('加载车辆数据失败');
  }
};

onMounted(fetchCars);

const openAddDialog = () => {
  editMode.value = false;
  form.value = {
    title: '',
    brand: '',
    model: '',
    price: 0,
    year: new Date().getFullYear(),
    mileage: 0,
    description: '',
    image_url: ''
  };
  dialogVisible.value = true;
};

const openEditDialog = (car) => {
  editMode.value = true;
  editingId = car.id;
  form.value = { ...car };
  dialogVisible.value = true;
};

const submitForm = () => {
  carForm.value.validate(async (valid) => {
    if (!valid) return;
    try {
      if (editMode.value) {
        await axios.put(`http://localhost:3000/api/cars/${editingId}`, form.value);
        ElMessage.success('修改成功');
      } else {
        await axios.post('http://localhost:3000/api/cars', form.value);
        ElMessage.success('新增成功');
      }
      dialogVisible.value = false;
      fetchCars();
    } catch (error) {
      ElMessage.error('操作失败');
    }
  });
};

// 删除前弹确认框
const confirmDelete = (id) => {
  ElMessageBox.confirm(
    '确定删除这辆车吗？此操作不可撤销。',
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    deleteCar(id);
  }).catch(() => {
    // 用户取消删除，什么都不做
  });
};

const deleteCar = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/cars/${id}`);
    ElMessage.success('删除成功');
    fetchCars();
  } catch (error) {
    ElMessage.error('删除失败');
  }
};
</script>
