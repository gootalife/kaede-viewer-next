import type { NextApiRequest, NextApiResponse } from 'next'
import { IdsResponse } from 'types/Response'

const baseUrl = process.env.API_BASE_URL

export default async (req: NextApiRequest, res: NextApiResponse<IdsResponse>) => {
  const {
    query: { name }
  } = req
  if (name === '') {
    return
  }
  const response = await fetch(encodeURI(`${baseUrl}/ids/${name}`))
  const json = (await response.json()) as IdsResponse
  res.status(200).json(json)
}
