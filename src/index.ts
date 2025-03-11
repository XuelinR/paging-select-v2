import type { App, Plugin } from 'vue';
import PagingSelectV2 from './components/paging-select-v2/index.vue';

export type { 
  PagingSelectV2Props, 
  SelectOption, 
  PageQuery, 
  PageResponse,
  FetchFunction
} from './components/paging-select-v2/types';

// 注册组件
export function install(app: App) {
  app.component('PagingSelectV2', PagingSelectV2);
  return app;
}

// 创建插件
export const plugin: Plugin = {
  install
};

// 导出组件
export { PagingSelectV2 };

// 导出组件-默认导出
export default PagingSelectV2; 