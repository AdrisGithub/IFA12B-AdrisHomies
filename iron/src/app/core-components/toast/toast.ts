export type Toast = {
  id: number,
} & ToastWithoutId;

export interface ToastWithoutId {
  detail: string,
  message: string,
  severity: 'warning' | 'error' | 'info' | 'success'
}
