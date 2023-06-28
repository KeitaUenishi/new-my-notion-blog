import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Box, CircularProgress } from '@mui/material'

import { fetcher } from '@/common/fetcher'

const Swr: NextPage = () => {
  const [db, setDb] = useState('asdfg')
  const { data, isLoading, isValidating } = useSWR('/api/swrTest', fetcher, {
    fallbackData: 'initial',
    refreshInterval: 10000,
  })
  useEffect(() => {
    const interval = setInterval(() => {
      setDb(data.key)
    }, 3000)
    return () => clearInterval(interval)
  })

  const key = data?.key

  return (
    <Box>
      <Box mb={8}>現在のstateのデータ: {db}</Box>
      <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Box>SWRで取得したデータ: </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {isLoading ? <div></div> : <div>{key}</div>}
          {!isLoading && isValidating && <CircularProgress />}
        </Box>
      </Box>
      <p>
        refreshIntervalを 10000 に設定しているため、10秒に一度データ取得を行う
      </p>
    </Box>
  )
}

export default Swr
