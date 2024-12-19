export type Toast = {
  id: number,
  detail: string,
  message: string,
  severity: 'warning' | 'error' | 'info' | 'success'
};
