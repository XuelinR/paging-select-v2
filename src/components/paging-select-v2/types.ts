/**
 * mybatis-plus分页格式响应
 */
export interface PageResponse<T> {
  /**
   * 当前页数据
   */
  records: T[];
  /**
   * 总记录数
   */
  total: number;
  /**
   * 每页显示条数
   */
  size: number;
  /**
   * 当前页
   */
  current: number;
  /**
   * 总页数
   */
  pages: number;
}

/**
 * 分页查询请求参数
 */
export interface PageQuery {
  /**
   * 当前页码，从1开始
   */
  current: number;
  /**
   * 每页显示条数
   */
  size: number;
  /**
   * 搜索关键词
   */
  keyword?: string;
}

/**
 * 请求函数类型定义，用于获取分页数据
 * 返回值应符合mybatis-plus的分页格式
 */
export type FetchFunction<T> = (params: PageQuery) => Promise<PageResponse<T>>;

/**
 * 下拉选项类型
 */
export interface SelectOption {
  /**
   * 选项值
   */
  value: string | number;
  /**
   * 选项标签
   */
  label: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 其他自定义字段
   */
  [key: string]: any;
}

/**
 * PagingSelectV2组件属性
 */
export interface PagingSelectV2Props {
  /**
   * 绑定值
   */
  modelValue: string | number | Array<string | number>;
  /**
   * 选项转换函数，默认寻找label和value字段
   */
  optionTransform?: (item: any) => SelectOption;
  /**
   * 获取数据的函数
   */
  fetchOptions: FetchFunction<any>;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 下拉框尺寸
   */
  size?: 'large' | 'default' | 'small';
  /**
   * 是否可清空
   */
  clearable?: boolean;
  /**
   * 是否可搜索
   */
  filterable?: boolean;
  /**
   * 每页加载数量
   */
  pageSize?: number;
} 