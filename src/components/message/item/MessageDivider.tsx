import { NextComponentType } from 'next'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'
import { Divider } from '@/types/virtual'
dayjs.extend(advancedFormat)

type Props = {
  divider: Divider
}

const MessageDivider: NextComponentType<{}, {}, Props> = ({ divider }) => {
  const today = dayjs().startOf('day')
  const yesterday = today.clone().subtract(1, 'days')

  let label = ''
  if (divider.start.isSame(today)) label = 'Today'
  else if (divider.start.isSame(yesterday)) label = 'Yesterday'
  else label = divider.start.format('dddd, MMMM, Do')

  return (
    <div className="flex-center relative h-10 w-full text-center">
      <div className="absolute z-10 h-px w-full bg-black/10" />
      <button
        type="button"
        className="relative z-20 flex h-7 items-center justify-center rounded-3xl border bg-white px-4 text-ss font-medium"
      >
        {label}
      </button>
    </div>
  )
}

export default MessageDivider
