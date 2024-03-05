import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NextComponentType } from 'next'
import classnames from 'classnames'

import { useAppSelector } from '@/redux/store'
import { lookupUser } from '@/redux/user'
import { selectView } from '@/redux/ui'
import { useAppParams } from '@/hooks/app/use-app-params'
import { useAppCookies } from '@/hooks/app/use-app-cookies'
import { SecondaryView } from '@/constants/ui'

import ViewHeader from './ViewHeader'
import UserProfile from '@/components/user/profile/UserProfile'

type Props = {
  className?: string
}

const ViewSecondary: NextComponentType<{}, {}, Props> = ({ className }) => {
  const router = useRouter()
  const params = useAppParams()
  const view = useAppSelector(selectView)
  const user = useAppSelector(lookupUser(params.secondary))
  const { deleteAllCookies } = useAppCookies()

  const isProfile = params.group === SecondaryView.Profile

  const closeView = useCallback(() => {
    router.push(`/client/${params.team}/${params.channel}`)
  }, [router, params])

  const logout = useCallback(() => {
    deleteAllCookies()
    router.push('/signin')
  }, [router, deleteAllCookies])

  useEffect(() => {
    if (isProfile && params.secondary && !user.id) closeView()
  }, [user, isProfile, params, closeView])

  if (!view.secondary) return null

  const closeBtn = (
    <>
      <button
        type="button"
        className="mr-2 flex h-6 items-center justify-center rounded bg-black/10 p-1 hover:bg-black/20"
        onClick={logout}
      >
        logout
      </button>
      <button
        type="button"
        className="flex h-6 items-center justify-center rounded bg-black/10 p-1 hover:bg-black/20"
        onClick={closeView}
      >
        close
      </button>
    </>
  )

  return (
    <div className={classnames(className, 'border-l border-black/20')}>
      <ViewHeader className="shrink-0" actions={closeBtn}>
        <div className="flex w-full items-center justify-between">
          <span>Profile</span>
        </div>
      </ViewHeader>
      {isProfile && user.id && <UserProfile user={user} />}
    </div>
  )
}

export default ViewSecondary
