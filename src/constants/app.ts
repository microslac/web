import { ISidebar } from '@/types/app'

export const STATIC_SIDEBAR: ISidebar[] = [
  {
    type: 'static',
    label: 'Threads',
    icon: 'threads',
    data: { id: 'threads' },
  },
  { type: 'static', label: 'Later', icon: 'later', data: { id: 'later' } },
  {
    type: 'static',
    label: 'Draft & sent',
    icon: 'draft',
    data: { id: 'draft' },
  },
  {
    type: 'static',
    label: 'Canvases',
    icon: 'canvases',
    data: { id: 'canvases' },
  },
  { type: 'static', label: 'Files', icon: 'files', data: { id: 'files' } },
  { type: 'static', label: 'More', icon: 'more', data: { id: 'more' } },
]
