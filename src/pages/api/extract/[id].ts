import type { NextApiRequest, NextApiResponse } from 'next'
import { ExtractResponse } from 'types/Response'

const baseUrl = process.env.API_BASE_URL

export default async (req: NextApiRequest, res: NextApiResponse<ExtractResponse>) => {
  const {
    query: { id }
  } = req
  if (id === '') {
    return
  }
  const response = await fetch(encodeURI(`${baseUrl}/extract/${id}`))
  const json = (await response.json()) as ExtractResponse
  res.status(200).json(json)
}
