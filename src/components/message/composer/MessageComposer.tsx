import { NextComponentType } from 'next'
import classnames from 'classnames'
import { useState } from 'react'
import { noop } from 'remeda'

import TypingIndicator from './TypingIndicator'

type Props = {
  className?: string
  onSend: (content: string) => void
  onChange?: (context: string) => void
  placeholder?: string
}

const MessageComposer: NextComponentType<{}, {}, Props> = ({
  className,
  onSend,
  onChange = noop,
  placeholder,
}) => {
  const [content, setContent] = useState<string>('')

  const handleSend = () => {
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
        <div className="flex min-h-[38px] items-center bg-[#f8f8f8] p-1">
          <button
            type="button"
            className="m-0.5 h-7 w-7 rounded text-black/40 hover:bg-black hover:bg-opacity-5 hover:text-black/80"
          >
            B
          </button>
          <button
            type="button"
            className="m-0.5 h-7 w-7 rounded text-black/40 hover:bg-black hover:bg-opacity-5 hover:text-black/80"
          >
            I
          </button>
          <button
            type="button"
            className="m-0.5 h-7 w-7 rounded text-black/40 hover:bg-black hover:bg-opacity-5 hover:text-black/80"
          >
            S
          </button>
        </div>
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
            className="m-0.5 h-7 w-7 shrink-0 rounded-full bg-black bg-opacity-5 text-black/40 hover:bg-opacity-10 hover:text-black/80"
          >
            +
          </button>
          <div className="flex-1">
            <button
              type="button"
              className="m-0.5 h-7 w-7 rounded text-black/40 hover:bg-black hover:bg-opacity-5 hover:text-black/80"
            >
              A
            </button>
            <button
              type="button"
              className="m-0.5 h-7 w-7 rounded text-black/40 hover:bg-black hover:bg-opacity-5 hover:text-black/80"
            >
              B
            </button>
            <button
              type="button"
              className="m-0.5 h-7 w-7 rounded text-black/40 hover:bg-black hover:bg-opacity-5 hover:text-black/80"
            >
              C
            </button>
          </div>
          <button
            type="button"
            onClick={handleSend}
            className={classnames(
              'm-0.5 h-7 shrink-0 rounded px-2 transition',
              { 'cursor-text text-black/40': !content },
              {
                'cursor-pointer bg-black/80 text-white hover:bg-black/60': !!content,
              },
            )}
          >
            send
          </button>
        </div>
      </div>
      <TypingIndicator className="px-3" />
    </div>
  )
}

export default MessageComposer
