import { useParams } from 'next/navigation'

export const useAppParams = () => {
  const params = useParams()

  return {
    team: params.team as string,
    channel: params.slug?.[0] as string,
    group: params.slug?.[1] as string,
    secondary: params.slug?.[2] as string,
  }
}
