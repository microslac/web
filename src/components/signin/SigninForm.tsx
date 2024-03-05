'use client'

import { NextComponentType } from 'next'
import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCookie } from 'react-use'
import { Button } from '@nextui-org/react'
import { noop } from 'remeda'

import { useAppDispatch } from '@/redux/store'
import { authLogin, authSignup } from '@/redux/auth/actions'
import { RegEx } from '@/constants/validation'
import { useAppCookies } from '@/hooks/app/use-app-cookies'

type Props = {
  className?: string
  isSignup?: boolean
  onLogin?: () => void
}

type FormValues = {
  email: string
  password: string
}

const SigninForm: NextComponentType<{}, {}, Props> = ({
  className,
  isSignup = false,
  onLogin = noop,
}) => {
  const { updateAuthCookie } = useAppCookies()
  const dispatch = useAppDispatch()
  const [errorCode, setErrorCode] = useState<string>('')
  const errorMessages: Record<string, string> = {
    invalid_credentials: 'Invalid credentials. Please try again.',
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },

    watch,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    const email = data.email.trim()
    const password = data.password.trim()
    try {
      const payload = { email, password }
      const asyncThunk = isSignup ? authSignup(payload) : authLogin(payload)
      const data = await dispatch(asyncThunk).unwrap()
      if (data.ok) {
        const oneMonth = 30 * 24 * 60 * 60 * 1000
        const expires = new Date(Date.now() + oneMonth)
        updateAuthCookie(data.access, { expires })
        onLogin()
      }
    } catch (err: any) {
      setErrorCode(err.code)
    }
  }

  useEffect(() => {
    const sub = watch(() => setErrorCode(''))
    return () => sub.unsubscribe()
  }, [watch])

  return (
    <div className={classnames(className, 'flex w-[400px] flex-col gap-y-4')}>
      <Button
        variant="bordered"
        color="primary"
        className="h-11 border-default-400 text-lg font-medium"
      >
        Sign In With Google
      </Button>
      <Button
        variant="bordered"
        color="primary"
        className="h-11 border-default-400 text-lg font-medium"
      >
        Sign In With Apple
      </Button>
      <div className="flex items-center">
        <hr className="flex-1" />
        <div className="px-5">OR</div>
        <hr className="flex-1" />
      </div>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="name@work-email.com"
            {...register('email', {
              required: 'Please fill in your email.',
              pattern: { value: RegEx.Email, message: 'Sorry, but that email is invalid.' },
            })}
            className={classnames(
              'mb-4 h-11 w-full rounded border border-default-400 px-3 focus:outline-0',
              { 'border-raspberry': errors.email || errorCode },
            )}
          />{' '}
          {errors.email && (
            <div className="-mt-2.5 mb-4 text-sm text-raspberry">{errors.email.message}</div>
          )}
          <input
            type="password"
            {...register('password', {
              required: 'Please fill in your password.',
            })}
            placeholder="password"
            className={classnames(
              'mb-4 h-11 w-full rounded border border-default-400 px-3 focus:outline-0',
              { 'border-raspberry': errors.password || errorCode },
            )}
          />
          {errors.password && (
            <div className="-mt-2.5 mb-4 text-sm text-raspberry">{errors.password.message}</div>
          )}
          {errorCode && errorMessages[errorCode] && (
            <div className="-mt-2.5 mb-4 text-sm text-raspberry">{errorMessages[errorCode]}</div>
          )}
          <Button
            type="submit"
            variant="solid"
            color="primary"
            disabled={!isValid && isSubmitted}
            className="h-11 h-11 w-full border-default-400 text-lg font-semibold"
          >
            {isSignup && <span>Sign up</span>}
            {!isSignup && <span>Sign In With Email</span>}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SigninForm
