import { Subject, Unsubscribe, Callback } from '@/patterns/observer'

export class SocketSubject implements Subject {
  subscribers: { [key: string]: Set<Callback> }

  constructor() {
    this.subscribers = {}
  }

  subscribe<T = any>(type: string, callback: Callback<T>): Unsubscribe {
    this.subscribers[type] = this.subscribers[type] || new Set<Callback<T>>()
    this.subscribers[type].add(callback)
    return () => this.subscribers[type].delete(callback)
  }

  unsubscribe(type: string, callback: Callback): void {
    this.subscribers[type]?.delete(callback)
  }

  unsubscribeAll(type?: string): void {
    const keys = type ? [type] : Object.keys(this.subscribers)
    keys.forEach((key) => this.subscribers[key]?.clear())
  }

  notify(type: string, data: any) {
    this.subscribers[type]?.forEach((callback) => callback(data))
  }
}

const socket = new SocketSubject()

export default socket
