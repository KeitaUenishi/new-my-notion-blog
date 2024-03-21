// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const json = await data.json();
  res.status(200).json(json);
}
