export type Toast = {
  id: number,
} & ToastWithoutId;

export type ToastWithoutId = {
  detail: string,
  message: string,
  severity: 'warning' | 'error' | 'info' | 'success'
}
