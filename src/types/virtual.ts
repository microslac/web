import dayjs, { Dayjs } from 'dayjs'

export class Divider {
  ts: number
  start: Dayjs

  constructor(ts: number) {
    const start = dayjs.unix(ts).startOf('day')
    this.start = start
    this.ts = start.unix()
  }

  isSame(divider?: Divider) {
    return this.start.isSame(divider?.start)
  }

  isDiff(divider?: Divider) {
    return !this.isSame(divider)
  }
}

export type VirtualMessage<T> = { type: string; data: T }
