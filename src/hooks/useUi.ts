import { useContext } from 'react'

import { Ui, UiContext } from '@/hooks/uiContext'

export const useUi = (): Ui => {
  return useContext(UiContext)
}
