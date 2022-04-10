export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface IPageMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface IPageOptions {
  order: Order;
  page: number;
  take: number;
  skip: number;
  q?: string;
}

export interface IPage<T> {
  data: T;
  meta: IPageMeta;
}