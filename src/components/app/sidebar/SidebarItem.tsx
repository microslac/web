import React from 'react'
import { NextComponentType } from 'next'
import classnames from 'classnames'
import { noop } from 'remeda'

type Props = {
  className?: string
  isSelected?: boolean
  isHighlight?: boolean
  label?: string

  prefix?: React.ReactNode
  children?: React.ReactNode
  suffix?: React.ReactNode

  onClick?: () => void
}

const SidebarItem: NextComponentType<{}, {}, Props> = ({
  className,
  isSelected = false,
  isHighlight = false,
  prefix,
  children,
  suffix,
  label = '',
  onClick = noop,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick()
  }

  return (
    <div
      className={classnames(
        'ml-2 mr-2 flex h-7 cursor-pointer items-center rounded-md pl-2 pr-2 text-sl hover:bg-black/15',
        { 'bg-black/80 text-white hover:bg-black/80': isSelected },
        { 'bg-black/30 text-white hover:bg-black/40': isHighlight },
        className,
      )}
      onClick={handleClick}
    >
      <div className="flex-center mr-2 h-5 w-5">{prefix}</div>
      <div>
        {children || <span>{label}</span>}
        {suffix}
      </div>
    </div>
  )
}

export default SidebarItem
