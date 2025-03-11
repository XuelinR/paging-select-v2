# PagingSelectV2

基于Vue3和Element Plus的大数据量分页下拉选择器组件。支持后端分页加载、无限滚动、关键词搜索等功能。

## 特性

- ✅ 支持加载大数据量的选项数据
- ✅ 支持后端分页查询
- ✅ 兼容mybatis-plus分页格式
- ✅ 滚动到底部自动加载更多数据
- ✅ 支持搜索过滤
- ✅ 支持单选/多选
- ✅ 支持不同尺寸
- ✅ 支持禁用状态
- ✅ 支持可清空

## 安装

```bash
npm install paging-select-v2
```

## 基本使用

```vue
<template>
  <paging-select-v2
    v-model="selected"
    :fetch-options="fetchData"
    placeholder="请选择"
  />
</template>

<script setup>
import { ref } from 'vue';
import PagingSelectV2 from 'paging-select-v2';
import 'paging-select-v2/dist/style.css';

const selected = ref('');

// 获取数据的方法，返回符合mybatis-plus格式的分页数据
const fetchData = (params) => {
  // params包含: { current: 当前页码, size: 每页条数, keyword?: 搜索关键词 }
  return fetch(`/api/data?page=${params.current}&size=${params.size}&keyword=${params.keyword || ''}`)
    .then(res => res.json());
  
  // 返回格式应符合:
  // {
  //   records: [], // 当前页数据
  //   total: 0,    // 总记录数
  //   size: 10,    // 每页条数
  //   current: 1,  // 当前页码
  //   pages: 0     // 总页数
  // }
};
</script>
```

## 全局注册

```js
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import PagingSelectV2 from 'paging-select-v2';
import 'paging-select-v2/dist/style.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(PagingSelectV2);
app.mount('#app');
```

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | string / number / array | - |
| fetchOptions | 获取选项数据的方法 | Function | - |
| optionTransform | 选项数据转换函数 | Function | 默认取id和name作为value和label |
| multiple | 是否多选 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| placeholder | 占位符 | string | '请选择' |
| size | 尺寸 | 'large' / 'default' / 'small' | 'default' |
| clearable | 是否可清空 | boolean | true |
| filterable | 是否可搜索 | boolean | false |
| pageSize | 每页加载数量 | number | 20 |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值发生变化时触发 | 目前的选中值 |
| update:modelValue | 更新v-model值的事件 | 目前的选中值 |

## 类型定义

```ts
// 分页响应格式
interface PageResponse<T> {
  records: T[];  // 当前页数据
  total: number; // 总记录数
  size: number;  // 每页显示条数
  current: number; // 当前页
  pages: number; // 总页数
}

// 分页查询参数
interface PageQuery {
  current: number; // 当前页码
  size: number;    // 每页显示条数
  keyword?: string; // 搜索关键词
}

// 获取数据的函数类型
type FetchFunction<T> = (params: PageQuery) => Promise<PageResponse<T>>;

// 选项类型
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  [key: string]: any;
}
```

## 许可证

MIT
