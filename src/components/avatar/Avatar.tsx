import { NextComponentType } from 'next'
import Image from 'next/image'
import classnames from 'classnames'

type Props = {
  className?: string
  src?: string
  alt?: string
  icon?: string
  count?: number
  size?: 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 56 | 64 | 72 | number
  circle?: boolean
  rounded?: boolean
  presence?: 'active' | 'away'
}

const Avatar: NextComponentType<{}, {}, Props> = ({
  className,
  src = '',
  alt = '',
  icon = '',
  count = 0,
  size = 24,
  circle = false,
  rounded = true,
  presence,
}) => {
  return (
    <div className="relative min-h-max min-w-max">
      {icon && !src && <div>{icon}</div>}

      {src && (
        <Image
          className={classnames(className, {
            rounded: rounded,
            'rounded-full': circle,
          })}
          src={src}
          width={size}
          height={size}
          priority={false}
          alt={alt}
        />
      )}

      {presence && (
        <div
          className={classnames(
            'absolute bottom-0 right-0 translate-x-[43.33%] translate-y-[23.33%] rounded-full border-3 border-white',
            { 'bg-green-500': presence === 'active' },
            { 'bg-gray-500': presence === 'away' },
          )}
          style={{ width: size / 2, height: size / 2 }}
        />
      )}

      {count > 0 && <div>{count}</div>}
    </div>
  )
}

export default Avatar
