<script setup lang="ts">
import { ref } from 'vue';
import PagingSelectV2 from './components/paging-select-v2/index.vue';
import type { PageQuery, PageResponse } from './components/paging-select-v2/types';

// 选中的值
const selected1 = ref('');
const selected2 = ref([]);
const selected3 = ref('');
const selected4 = ref('');
const selected5 = ref('option1');

// 模拟数据源
const generateData = (page = 1, keyword = '', pageSize = 10) => {
  const baseList = [
    { id: 'option1', name: '选项一' },
    { id: 'option2', name: '选项二' },
    { id: 'option3', name: '选项三' },
    { id: 'option4', name: '选项四' },
    { id: 'option5', name: '选项五' },
    { id: 'option6', name: '选项六' },
    { id: 'option7', name: '选项七' },
    { id: 'option8', name: '选项八' },
    { id: 'option9', name: '选项九' },
    { id: 'option10', name: '选项十' },
    { id: 'option11', name: '选项十一' },
    { id: 'option12', name: '选项十二' },
    { id: 'option13', name: '选项十三' },
    { id: 'option14', name: '选项十四' },
    { id: 'option15', name: '选项十五' },
    { id: 'option16', name: '选项十六' },
    { id: 'option17', name: '选项十七' },
    { id: 'option18', name: '选项十八' },
    { id: 'option19', name: '选项十九' },
    { id: 'option20', name: '选项二十' },
    { id: 'option21', name: '选项二十一' },
    { id: 'option22', name: '选项二十二' },
    { id: 'option23', name: '选项二十三' },
    { id: 'option24', name: '选项二十四' },
    { id: 'option25', name: '选项二十五' },
  ];
  
  // 根据关键词过滤
  let filteredList = baseList;
  if (keyword) {
    filteredList = baseList.filter(item => 
      item.name.includes(keyword) || item.id.includes(keyword)
    );
  }
  
  // 计算总页数
  const total = filteredList.length;
  const pages = Math.ceil(total / pageSize);
  
  // 模拟分页
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const records = filteredList.slice(start, end);
  
  return {
    records,
    total,
    size: pageSize,
    current: page,
    pages
  };
};

// 模拟获取数据的方法
const fetchData = (params: PageQuery): Promise<PageResponse<any>> => {
  console.log('获取数据参数:', params);
  // 模拟接口延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateData(params.current, '', params.size));
    }, 300);
  });
};

// 模拟带搜索的获取数据方法
const fetchDataWithSearch = (params: PageQuery): Promise<PageResponse<any>> => {
  console.log('搜索数据参数:', params);
  // 模拟接口延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateData(params.current, params.keyword || '', params.size));
    }, 300);
  });
};

// 值变化处理函数
const handleChange = (val: any) => {
  console.log('值变化:', val);
};
</script>

<template>
  <div class="app-container">
    <h1>PagingSelectV2 组件演示</h1>
    
    <div class="demo-section">
      <h2>基础用法</h2>
      <div class="form-item">
        <label>基础单选：</label>
        <paging-select-v2
          v-model="selected1"
          :fetch-options="fetchData"
          placeholder="请选择一个选项"
          style="width: 240px;"
          @change="handleChange"
        />
        <p>当前选中值: {{ selected1 }}</p>
      </div>
    </div>
    
    <div class="demo-section">
      <h2>多选用法</h2>
      <div class="form-item">
        <label>多选模式：</label>
        <paging-select-v2
          v-model="selected2"
          :fetch-options="fetchData"
          multiple
          placeholder="请选择多个选项"
          style="width: 300px;"
        />
        <p>当前选中值: {{ selected2 }}</p>
      </div>
    </div>
    
    <div class="demo-section">
      <h2>搜索过滤</h2>
      <div class="form-item">
        <label>可搜索：</label>
        <paging-select-v2
          v-model="selected3"
          :fetch-options="fetchDataWithSearch"
          filterable
          placeholder="输入关键词搜索"
          style="width: 240px;"
        />
        <p>当前选中值: {{ selected3 }}</p>
      </div>
    </div>
    
    <div class="demo-section">
      <h2>不同尺寸</h2>
      <div class="form-item">
        <label>小尺寸：</label>
        <paging-select-v2
          v-model="selected4"
          :fetch-options="fetchData"
          size="small"
          style="width: 120px;"
        />
      </div>
      <div class="form-item">
        <label>默认尺寸：</label>
        <paging-select-v2
          v-model="selected4"
          :fetch-options="fetchData"
          style="width: 180px;"
        />
      </div>
      <div class="form-item">
        <label>大尺寸：</label>
        <paging-select-v2
          v-model="selected4"
          :fetch-options="fetchData"
          size="large"
          style="width: 220px;"
        />
      </div>
    </div>
    
    <div class="demo-section">
      <h2>禁用状态</h2>
      <div class="form-item">
        <label>禁用选择器：</label>
        <paging-select-v2
          v-model="selected5"
          :fetch-options="fetchData"
          disabled
          style="width: 200px;"
        />
      </div>
    </div>
  </div>
</template>

<style>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #409EFF;
  text-align: center;
  margin-bottom: 30px;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #EBEEF5;
  border-radius: 4px;
}

h2 {
  font-size: 18px;
  color: #303133;
  margin-bottom: 15px;
  border-bottom: 1px solid #EBEEF5;
  padding-bottom: 10px;
}

.form-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

label {
  width: 100px;
  text-align: right;
  padding-right: 12px;
  color: #606266;
}

p {
  margin-left: 15px;
  color: #67C23A;
  font-size: 14px;
}
</style>
