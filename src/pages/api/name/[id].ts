import type { NextApiRequest, NextApiResponse } from 'next'
import { NameResponse } from 'types/Response'

const baseUrl = process.env.API_BASE_URL

export default async (req: NextApiRequest, res: NextApiResponse<NameResponse>) => {
  const {
    query: { id }
  } = req
  if (id === '') {
    return
  }
  const response = await fetch(encodeURI(`${baseUrl}/name/${id}`))
  const json = (await response.json()) as NameResponse
  res.status(200).json(json)
}
