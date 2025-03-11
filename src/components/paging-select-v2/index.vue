<template>
  <el-select
    v-model="innerValue"
    v-bind="$attrs"
    :disabled="disabled"
    :placeholder="placeholder"
    :size="size"
    :multiple="multiple"
    :clearable="clearable"
    :filterable="filterable"
    :remote="filterable"
    :remote-method="handleSearch"
    @visible-change="handleVisibleChange"
    @focus="handleFocus"
    @clear="handleClear"
    @change="handleChange"
  >
    <el-option
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
    <!-- 加载更多数据指示器 -->
    <template #dropdown>
      <div 
        ref="loadingRef" 
        v-show="loading" 
        class="paging-select-v2-loading"
      >
        <el-icon class="is-loading"><i-loading /></el-icon>
        <span>加载中...</span>
      </div>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { ElSelect, ElOption, ElIcon } from 'element-plus';
import { Loading as ILoading } from '@element-plus/icons-vue';
import type { 
  PagingSelectV2Props, 
  SelectOption,
  PageQuery
} from './types';

const props = withDefaults(defineProps<PagingSelectV2Props>(), {
  multiple: false,
  disabled: false,
  placeholder: '请选择',
  size: 'default',
  clearable: true,
  filterable: false,
  pageSize: 20,
  optionTransform: (item: any) => {
    return {
      value: item.value !== undefined ? item.value : item.id,
      label: item.label !== undefined ? item.label : item.name
    }
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

// 内部值
const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  }
});

// 选项列表
const options = ref<SelectOption[]>([]);
// 是否加载中
const loading = ref(false);
// 是否还有更多数据
const hasMore = ref(true);
// 当前页码
const currentPage = ref(1);
// 关键词
const keyword = ref('');
// 下拉框是否可见
const isVisible = ref(false);
// 加载更多引用
const loadingRef = ref<HTMLElement | null>(null);
// 是否是首次加载
const isFirstLoad = ref(true);

// 加载选项数据
const loadOptions = async (isReset = false, newKeyword: string | null = null) => {
  if (loading.value || (!hasMore.value && !isReset)) return;
  
  loading.value = true;
  
  // 重置分页
  if (isReset) {
    currentPage.value = 1;
    if (newKeyword !== null) {
      keyword.value = newKeyword;
    }
    options.value = [];
    hasMore.value = true;
  }
  
  // 构建请求参数
  const params: PageQuery = {
    current: currentPage.value,
    size: props.pageSize,
  };
  
  // 添加搜索关键词
  if (keyword.value) {
    params.keyword = keyword.value;
  }
  
  try {
    // 调用获取数据的函数
    const res = await props.fetchOptions(params);
    
    // 转换选项数据
    const newOptions = res.records.map(props.optionTransform);
    
    // 将新选项添加到选项列表
    options.value = isReset ? newOptions : [...options.value, ...newOptions];
    
    // 判断是否还有更多数据
    hasMore.value = currentPage.value < res.pages;
    
    // 递增页码
    if (hasMore.value) {
      currentPage.value += 1;
    }
  } catch (error) {
    console.error('加载选项数据失败:', error);
  } finally {
    loading.value = false;
  }
};

// 处理下拉框可见性变化
const handleVisibleChange = (visible: boolean) => {
  isVisible.value = visible;
  
  if (visible) {
    // 下拉框打开时，加载数据
    if (isFirstLoad.value) {
      loadOptions(true);
      isFirstLoad.value = false;
    }
    
    // 设置滚动监听
    nextTick(() => {
      const dropdown = document.querySelector('.el-select-dropdown') as HTMLElement;
      if (dropdown) {
        dropdown.addEventListener('scroll', handleScroll);
      }
    });
  } else {
    // 下拉框关闭时，移除滚动监听
    const dropdown = document.querySelector('.el-select-dropdown') as HTMLElement;
    if (dropdown) {
      dropdown.removeEventListener('scroll', handleScroll);
    }
  }
};

// 处理滚动事件
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  const { scrollTop, scrollHeight, clientHeight } = target;
  
  // 滚动到底部时，加载更多数据
  if (scrollTop + clientHeight >= scrollHeight - 50 && !loading.value && hasMore.value) {
    loadOptions();
  }
};

// 处理搜索
const handleSearch = (query: string) => {
  if (props.filterable) {
    keyword.value = query;
    loadOptions(true, query);
  }
};

// 处理聚焦
const handleFocus = () => {
  if (options.value.length === 0 && !loading.value) {
    loadOptions(true);
  }
};

// 处理清除
const handleClear = () => {
  emit('change', props.multiple ? [] : '');
};

// 处理值变化
const handleChange = (value: any) => {
  emit('change', value);
};

// 监听modelValue变化
watch(() => props.modelValue, () => {
  // 如果是首次加载且有初始值，需要获取选项数据
  if (isFirstLoad.value && props.modelValue) {
    loadOptions(true);
    isFirstLoad.value = false;
  }
});

// 组件挂载时
onMounted(() => {
  // 如果有初始值，加载数据
  if (props.modelValue) {
    loadOptions(true);
    isFirstLoad.value = false;
  }
});
</script>

<style>
.paging-select-v2-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.paging-select-v2-loading .el-icon {
  margin-right: 6px;
}
</style> 