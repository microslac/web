import { NextComponentType } from 'next'
import classnames from 'classnames'
import { useState } from 'react'
import { noop } from 'remeda'

type Props = {
  className?: string
  onSend: (content: string) => void
  onChange?: (context: string) => void
  placeholder?: string
  disabled?: boolean
}

const ChatComposer: NextComponentType<{}, {}, Props> = ({
  className,
  onSend,
  onChange = noop,
  placeholder,
  disabled,
}) => {
  const [content, setContent] = useState<string>('')

  const handleSend = () => {
    if (disabled) return
    if (!content.trim()) return

    onSend(content)
    setContent('')
  }

  const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (text: string = '') => {
    setContent(text)
    onChange(text)
  }

  return (
    <div className={classnames(className)}>
      <div className="overflow-hidden rounded-lg border transition focus-within:border-gray-300">
        <div className="flex min-h-[26px] items-center bg-[#f8f8f8] p-1" />
        <textarea
          className="min-h-9 flex w-full resize-none items-center px-3 py-2 text-sl text-black/90 focus:outline-0"
          placeholder={placeholder}
          rows={1}
          value={content}
          onKeyDown={handleKeydown}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="flex h-10 items-center p-1 pl-1.5">
          <button
            type="button"
            disabled={disabled}
            onClick={handleSend}
            className={classnames(
              'm-0.5 ml-auto h-7 shrink-0 rounded px-2 transition',
              { 'cursor-text text-black/40': !content },
              {
                'cursor-pointer bg-black/80 text-white hover:bg-black/60': !!content && !disabled,
              },
            )}
          >
            send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatComposer
