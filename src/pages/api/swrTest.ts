// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  key: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('req')
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const word = Math.random().toString(32).slice(-8)
  res.status(200).json({ key: word })
}
