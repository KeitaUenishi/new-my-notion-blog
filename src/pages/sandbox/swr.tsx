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
    setDb(data.key)
  }, [data])

  const key = data?.key

  return (
    <Box>
      <Box mb={8}>
        <p>現在のstateのデータ: {db}</p>
        <p>データ取得後、3秒後にstateが更新される。</p>
      </Box>
      <Box mb={4} sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
      <p>
        データ取得中（isLoadingがtrue）の間は、ローディングスピナーを表示する
      </p>
    </Box>
  )
}

export default Swr
