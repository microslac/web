export type Unsubscribe = () => void
export type Callback<T = any> = (data: T) => void

export interface Subject {
  subscribe<T = any>(type: string, callback: Callback<T>): Unsubscribe

  unsubscribe(type: string, callback: Callback): void

  unsubscribeAll(type?: string): void

  notify(type: string, data: any): void
}
