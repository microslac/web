import { useContext, useEffect } from 'react'
import { Callback } from '@/patterns/observer'
import { SocketType } from '@/constants/socket'
import { SocketContext } from '@/contexts/socket'

export const useSocket = <T = any>(type: SocketType, callback: Callback<T>) => {
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    const unsubscribe = socket.subscribe<T>(type, callback)
    return () => unsubscribe()
  }, [socket, type, callback])
}
