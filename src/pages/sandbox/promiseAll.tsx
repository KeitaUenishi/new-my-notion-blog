import { Button } from '@mui/material'
import React, { useState } from 'react'

const PromiseAll = () => {
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])

  const onClickAwait = async () => {
    console.time('await3連発で3つのAPIからデータを取得')
    const oneAwait = await fetch('/api/dummy/one_time').then((res) =>
      res.json()
    )
    const twoAwait = await fetch('/api/dummy/two_time').then((res) =>
      res.json()
    )
    const threeAwait = await fetch('/api/dummy/three_time').then((res) =>
      res.json()
    )
    console.timeEnd('await3連発で3つのAPIからデータを取得')
    setData1([oneAwait, twoAwait, threeAwait])
  }

  const onClickPromiseAll = async () => {
    console.time('promise.Allで3つのAPIからデータを取得')
    const data = await Promise.all([
      fetch('/api/dummy/one_time').then((res) => res.json()),
      fetch('/api/dummy/two_time').then((res) => res.json()),
      fetch('/api/dummy/three_time').then((res) => res.json()),
    ])
    console.timeEnd('promise.Allで3つのAPIからデータを取得')
    setData2(data)
  }

  // 2つ目がエラーの場合 await
  const onClickAwaitOneError = async () => {
    console.time('await3連発で3つのAPIからデータを取得')
    const oneAwait = await fetch('/api/dummy/one_time')
      .then((res) => res.json())
      .catch(() => alert('error: 1つ目'))
    const twoAwait = await fetch('/api/dummy/error')
      .then((res) => res.json())
      .catch((err) => alert(`error: 2つ目 ${err}`))
    const threeAwait = await fetch('/api/dummy/three_time')
      .then((res) => res.json())
      .catch(() => alert('error: 3つ目'))
    console.timeEnd('await3連発で3つのAPIからデータを取得')
    setData3([oneAwait, twoAwait, threeAwait])
  }
  return (
    <div>
      <div style={{ marginTop: '32px' }}>
        <Container
          message="await3連発で3つのAPIからデータを取得"
          data={data1}
          setData={setData1}
          onClick={onClickAwait}
        />
      </div>
      <div style={{ marginTop: '32px' }}>
        <Container
          message="promise.Allで3つのAPIからデータを取得"
          data={data2}
          setData={setData2}
          onClick={onClickPromiseAll}
        />
      </div>
      <div style={{ marginTop: '32px' }}>
        <Container
          message="await3連発で3つのAPIからデータを取得（2つ目でエラー）"
          data={data3}
          setData={setData3}
          onClick={onClickAwaitOneError}
        />
      </div>
    </div>
  )
}

type ContainerProps = {
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData: any
  onClick: () => void
}

const Container = ({ message, data, setData, onClick }: ContainerProps) => {
  return (
    <div>
      <p>
        {message}
        <br />
        かかった時間はconsoleから確認できます。
      </p>
      <Button variant="contained" onClick={onClick}>
        フェッチ
      </Button>
      <Button
        style={{ marginLeft: '16px' }}
        variant="contained"
        color="error"
        onClick={() => setData([])}
      >
        クリア
      </Button>
      <div style={{ marginTop: '16px' }}>
        {data?.map((data, idx) => {
          return (
            <div key={idx}>
              <div>
                データ{idx + 1}: {data?.key ?? ''}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PromiseAll
