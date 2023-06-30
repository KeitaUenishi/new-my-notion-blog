import { useUi } from '@/hooks/useUi'
import { Button } from '@mui/material'
import React, { useState } from 'react'

const ReactContext = () => {
  const ui = useUi()
  const [users, setUsers] = useState([])
  const onClick = () => {
    ui.loadingScreen.showWhile(async () => {
      const res = await fetch('/api/dummy')
      const json = await res.json()
      setUsers(json)
    })
  }

  return (
    <div>
      <p>React Contextで共通のローディング処理を作成</p>
      <Button variant="contained" onClick={onClick}>
        フェッチする
      </Button>
      <Button
        style={{ marginLeft: '16px' }}
        variant="contained"
        color="error"
        onClick={() => setUsers([])}
      >
        クリア
      </Button>
      {users.map((u) => {
        return (
          <div key={u.id}>
            <p>{u.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ReactContext
