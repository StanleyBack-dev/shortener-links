import { Response } from 'express';

const isProd = process.env.NODE_ENV === 'production';

export function SetAuthCookies(
  res: Response,
  refreshToken: string,
  accessToken?: string
) {
  // Refresh token (7 dias)
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax', 
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  if (accessToken) {
    // Access token (15 minutos)
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 15 * 60 * 1000,
    });
  }
}

export function ClearAuthCookies(res: Response) {
  res.clearCookie('refresh_token', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax' });
  res.clearCookie('access_token', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax' });
}