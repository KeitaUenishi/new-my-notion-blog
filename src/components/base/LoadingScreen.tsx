import React, { useState } from 'react'

import { useUi } from '@/hooks/useUi'
import { Box, CircularProgress } from '@mui/material'

export const LoadingScreen: React.FC = () => {
  const ui = useUi()
  const [visible, setVisible] = useState(false)

  const processingTasks: Set<() => Promise<void>> = new Set()

  ui.loadingScreen.showWhile = async (
    callback: () => Promise<void>
  ): Promise<void> => {
    processingTasks.add(callback)
    try {
      setVisible(true)
      await callback()
    } catch (error) {
      throw error
    } finally {
      processingTasks.delete(callback)
      if (processingTasks.size === 0) {
        setVisible(false)
      }
    }
  }

  ui.loadingScreen.show = (): void => {
    setVisible(true)
  }

  ui.loadingScreen.close = (): void => {
    setVisible(false)
  }

  if (!visible) {
    return <></>
  }

  return (
    <div
      style={{
        background: 'rgba(20, 20, 20, 0.5)',
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        zIndex: '2000',
      }}
    >
      <br />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress size={64} />
      </Box>
    </div>
  )
}
