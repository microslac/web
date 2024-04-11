import { NextComponentType } from 'next'
import ViewHeader from '@/components/app/view/ViewHeader'
import UserProfile from '@/components/user/profile/UserProfile'
import { User } from '@/types/user'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppCookies } from '@/hooks/app/use-app-cookies'

type Props = {
  close: () => void
  user: User
}

const ViewSecondaryProfile: NextComponentType<{}, {}, Props> = ({ close, user }) => {
  const router = useRouter()
  const { deleteAllCookies } = useAppCookies()

  const logout = useCallback(() => {
    deleteAllCookies()
    router.push('/signin')
  }, [router, deleteAllCookies])

  const actions = (
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
        onClick={close}
      >
        close
      </button>
    </>
  )

  return (
    <>
      <ViewHeader className="shrink-0" actions={actions}>
        <div className="flex w-full items-center justify-between">
          <span>profile</span>
        </div>
      </ViewHeader>
      <UserProfile user={user} />
    </>
  )
}

export default ViewSecondaryProfile
