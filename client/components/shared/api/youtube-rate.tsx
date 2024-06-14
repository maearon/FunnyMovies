import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { videoId, rating, authCode } = req.body;

      // Lấy token từ authCode
      const { tokens } = await oauth2Client.getToken(authCode);
      oauth2Client.setCredentials(tokens);

      const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

      // Gọi API để thêm Like hoặc Dislike
      await youtube.videos.rate({
        id: videoId,
        rating: rating,
      });

      res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
