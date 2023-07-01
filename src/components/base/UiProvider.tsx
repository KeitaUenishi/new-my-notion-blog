import React, { ReactNode } from 'react'

import { LoadingScreen } from '@/components/base/LoadingScreen'
import { emptyActions } from '@/hooks/emptyActions'
import { UiContext } from '@/hooks/uiContext'

const ui = {
  loadingScreen: emptyActions,
}

export const UiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UiContext.Provider value={ui}>
      {children}
      <LoadingScreen />
    </UiContext.Provider>
  )
}
