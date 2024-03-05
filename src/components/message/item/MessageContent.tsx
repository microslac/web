import { NextComponentType } from 'next'
import reactStringReplace from 'react-string-replace'
import classnames from 'classnames'

import { Message } from '@/types/message'
import { lookupUser } from '@/redux/user'
import { useAppSelector } from '@/redux/store'
import { CommonRegex } from '@/constants/regex'
import { useAppParams } from '@/hooks/app/use-app-params'
import { useRouter } from 'next/navigation'

type Props = {
  className?: string
  message: Message
}

const MessageContent: NextComponentType<{}, {}, Props> = ({ className, message }) => {
  const mentionText = reactStringReplace(message.text, CommonRegex.UserMention, (match, index) => (
    <UserMention uid={match} key={index} />
  ))

  return <div className={classnames(className, 'w-full text-black/90')}>{mentionText}</div>
}

export default MessageContent

const UserMention: NextComponentType<{}, {}, { uid: string }> = ({ uid }) => {
  const router = useRouter()
  const user = useAppSelector(lookupUser(uid))
  const params = useAppParams()

  if (!user) return `@<${uid}>`

  const showProfile = () => {
    const { team, channel } = params
    router.push(`/client/${team}/${channel}/profile/${user.id}`)
  }

  return (
    <a
      className="inline-block cursor-pointer rounded bg-[#1d9bd1] bg-opacity-10 px-0.5 pb-px text-[#1264a3] hover:bg-opacity-20 hover:text-[#0b4c8c]"
      onClick={showProfile}
    >
      @{user.profile.display_name || user.profile.real_name}
    </a>
  )
}
