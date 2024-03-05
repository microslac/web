import { createContext, useCallback, useState } from 'react'
import { NextComponentType } from 'next'
import { useCookie } from 'react-use'
import useWebsocket, { Options } from 'react-use-websocket'
import { SendJsonMessage } from 'react-use-websocket/src/lib/types'
import { SocketType } from '@/constants/socket'
import { SocketData } from '@/types/socket'
import socket, { SocketSubject } from '@/patterns/observer/socket'
import { selectTeamId } from '@/redux/team'
import { useAppSelector } from '@/redux/store'
import { selectUserId } from '@/redux/user'
import { noop } from 'remeda'

type Websocket = ReturnType<typeof useWebsocket>

type SocketContextType = {
  websocket: Websocket
  socket: SocketSubject
  sendJson: SendJsonMessage
}

export const SocketContext = createContext<SocketContextType>({
  websocket: {} as Websocket,
  socket: socket,
  sendJson: noop,
})

type Props = {
  children: React.ReactNode
}

export const SocketProvider: NextComponentType<{}, {}, Props> = ({ children }) => {
  const [token] = useCookie(process.env.COOKIE_ACCESS_TOKEN as string)
  const teamId = useAppSelector(selectTeamId)
  const userId = useAppSelector(selectUserId)

  const [socketUrl, setSocketUrl] = useState<string>(process.env.SOCKET_URL || '')

  const parseData = (event: MessageEvent) => {
    let data = null
    let error = false
    try {
      data = JSON.parse(event.data) as SocketData
    } catch {
      error = true
    }
    error = error || !data || !Object.values(SocketType).includes(data.type)
    return { data, error }
  }

  const onMessage: Options['onMessage'] = (event) => {
    const { data, error } = parseData(event)
    if (data && !error) socket.notify(data.type, data)
  }

  const websocket = useWebsocket(socketUrl, {
    queryParams: {
      team: teamId,
      user: userId,
      token: token || '',
    },
    onMessage,
  })

  const sendJson = useCallback<SendJsonMessage>(
    (message, keep) => websocket.sendJsonMessage(message, keep),
    [websocket],
  )

  return (
    <SocketContext.Provider value={{ socket, websocket, sendJson }}>
      {children}
    </SocketContext.Provider>
  )
}
