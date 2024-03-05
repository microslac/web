import { NextComponentType } from 'next'
import React, { useEffect, useRef } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { usePrevious } from 'react-use'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useApi, useBaseApi, extractError } from '@/hooks/api/use-api'
import { timer } from '@/utils'

import { AvatarSize } from '@/constants/media'
import { setUserProfile } from '@/redux/user/actions'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { updateProfile } from '@/redux/user'
import { selectTeam } from '@/redux/team'
import { User } from '@/types/user'

import Avatar from '@/components/avatar/Avatar'
import UserAvatar from '@/components/avatar/UserAvatar'

type Props = {
  user: User
  children: (onOpen: () => void) => React.ReactNode
}

type FormValues = {
  real_name: string
  display_name: string
  title: string
  file?: FileList
}

const ProfileModal: NextComponentType<{}, {}, Props> = ({ user, children }) => {
  const api = useApi()
  const baseApi = useBaseApi()
  const team = useAppSelector(selectTeam)
  const dispatch = useAppDispatch()
  const fileRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = React.useState<{ id: string; url: string } | undefined>(undefined)

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const prevIsOpen = usePrevious(isOpen)

  const { register, handleSubmit, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      real_name: user.profile.real_name,
      display_name: user.profile.display_name,
      title: user.profile.title,
      file: undefined,
    },
  })

  const onSubmit = async (fv: FormValues) => {
    if (!fv.real_name) return

    dispatch(
      setUserProfile({
        team: team.id,
        user: user.id,
        display_name: fv.display_name,
        real_name: fv.real_name,
        title: fv.title,
      }),
    )
      .then(() => handleSetPhoto())
      .then(() => onClose())
  }

  const handleUploadPhoto = () => {
    fileRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    type PreparePhotoResponse = {
      ok: boolean
      id: string
      url: string
    }

    const image = e.target.files?.[0]
    if (!image) return

    const formData = new FormData()
    formData.append('team', team.id)
    formData.append('user', user.id)
    formData.append('image', image, image.name)

    baseApi
      .post('users/prepare-photo', { body: formData, headers: {} })
      .then((resp) => resp.json<PreparePhotoResponse>())
      .then((data) => setAvatar({ id: data.id, url: data.url }))
      .then(() => toast.success('Image uploaded successfully.'))
      .catch(async (err) => {
        const error = await extractError(err)
        if (error === 'invalid_nsfw_image') {
          toast.error('NSFW images are not allowed.', { icon: '😳' })
        } else toast.error(error)
      })
      .finally(() => {
        setValue('file', undefined)
        e.target.value = ''
      })
  }

  const handleSetPhoto = async () => {
    type SetPhotoResponse = {
      ok: boolean
      avatar_hash: string
      image_24: string
      image_32: string
      image_48: string
      image_72: string
      image_256: string
      image_512: string
      image_original: string
    }

    if (!avatar) return

    await api
      .post('users/set-photo', { json: { image: avatar.id, team: team.id, user: user.id } })
      .then((resp) => resp.json<SetPhotoResponse>())
      .then((data) => {
        if (data.ok) {
          dispatch(updateProfile({ id: user.id, profile: { avatar_hash: data.avatar_hash } }))
          timer(200).then(() => setAvatar(undefined))
        }
      })
      .then(() => toast.success('Changes saved successfully.'))
      .catch(async (err) => toast.error(await extractError(err)))
  }

  const handleRemovePhoto = async () => {
    const resp = await api.post('users/remove-photo', {
      json: { team: team.id, user: user.id },
    })

    const data = await resp.json<{ ok: boolean }>()
    if (data.ok) {
      dispatch(updateProfile({ id: user.id, profile: { avatar_hash: '' } }))
    }
  }

  useEffect(() => {
    if (prevIsOpen && !isOpen) setAvatar(undefined)
  }, [prevIsOpen, isOpen])

  return (
    <>
      {children(onOpen)}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h4>Edit your profile</h4>
              </ModalHeader>

              <ModalBody className="py-0">
                <form method="post" onSubmit={handleSubmit(onSubmit)}></form>
                <div className="flex align-top">
                  <div className="mr-8">
                    <label className="mb-4 block">
                      <div className="mb-2 font-medium">Full name</div>
                      <input
                        type="text"
                        {...register('real_name')}
                        placeholder="Full name"
                        className="h-11 w-full rounded border border-default-400 px-3 focus:outline-0"
                      />
                    </label>
                    <label className="mb-4 block">
                      <div className="mb-2 font-medium">Display name</div>
                      <input
                        type="text"
                        {...register('display_name')}
                        placeholder="Display name"
                        className="h-11 w-full rounded border border-default-400 px-3 focus:outline-0"
                      />
                      <div className="mt-0.5 text-ss text-black/40">
                        This could be your first name, or a nickname — however you’d like people to
                        refer to you in Slac.
                      </div>
                    </label>
                    <label className="mb-4 block">
                      <div className="mb-2 font-medium">Title</div>
                      <input
                        type="text"
                        {...register('title')}
                        placeholder="Title"
                        className="h-11 w-full rounded border border-default-400 px-3 focus:outline-0"
                      />
                      <div className="mt-0.5 text-ss text-black/40">
                        Let people know what you do at {team.name}.
                      </div>
                    </label>
                  </div>
                  <div>
                    <div className="mb-2 font-semibold">Profile photo</div>
                    {avatar && <Avatar src={avatar.url} size={192} />}
                    {!avatar && (
                      <UserAvatar
                        user={user}
                        size={192}
                        avatarSize={AvatarSize.XL}
                        presence={false}
                      />
                    )}
                    <button
                      type="button"
                      className="mt-4 flex min-h-[36px] w-full grow items-center justify-center rounded border border-black/30 px-3 transition hover:bg-black/7"
                      onClick={() => handleUploadPhoto()}
                    >
                      <span className="font-medium">Upload Photo</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png, image/jpg"
                        {...{ ...register('file'), ref: fileRef, onChange: handleFileChange }}
                      />
                    </button>
                    {avatar && (
                      <button
                        type="button"
                        className="mt-2 flex min-h-[36px] w-full grow items-center justify-center rounded border border-black/30 bg-black/80 px-3 text-white transition hover:bg-black/70"
                        onClick={() => handleSetPhoto()}
                      >
                        <span className="font-medium">Set Photo</span>
                      </button>
                    )}
                    {user.profile.avatar_hash && !avatar && (
                      <button
                        type="button"
                        className="mt-2 flex min-h-[22px] w-full grow items-center justify-center px-3 text-link transition hover:underline"
                        onClick={() => handleRemovePhoto()}
                      >
                        <span>Remove Photo</span>
                      </button>
                    )}
                  </div>
                </div>
                <label className="mb-4 block">
                  <div className="mb-2 font-medium">Name recording</div>
                  <button
                    type="button"
                    className="flex min-h-[36px] grow items-center justify-center rounded border border-black/30 px-3 transition hover:bg-black/7"
                  >
                    <span className="font-medium">Record Audio Clip</span>
                  </button>
                </label>
                <label className="mb-4 block">
                  <div className="mb-2 font-medium">Name pronunciation</div>
                  <input
                    type="text"
                    placeholder="Zoe (pronounced 'zo-ee')"
                    className="h-11 w-full rounded border border-default-400 px-3 focus:outline-0"
                  />
                  <div className="mt-0.5 text-ss text-black/40">
                    This could be a phonetic pronunciation, or an example of something your name
                    sounds like.
                  </div>
                </label>
                <label className="mb-4 block">
                  <div className="mb-2 font-medium">Name pronunciation</div>
                  <input
                    type="text"
                    placeholder="(UTC+07:00) Bangkok, Hanoi, Jakarta"
                    className="h-11 w-full rounded border border-default-400 px-3 focus:outline-0"
                  />
                  <div className="mt-0.5 text-ss text-black/40">
                    Your current time zone. Used to send summary and notification emails, for times
                    in your activity feeds, and for reminders.
                  </div>
                </label>
              </ModalBody>

              <ModalFooter>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 flex min-h-[36px] items-center justify-center rounded border border-black/30 px-3 transition hover:bg-black/7"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="mt-4 flex min-h-[36px] items-center justify-center rounded border bg-black/80 px-3 text-white transition hover:bg-black/70"
                >
                  Save Changes
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
