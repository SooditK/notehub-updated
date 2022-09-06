// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return {
    success: true,
    message: 'Hello World!',
  };
}
