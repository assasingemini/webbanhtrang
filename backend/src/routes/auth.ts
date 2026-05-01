import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@banhtrang.vn';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === adminEmail && password === adminPassword) {
    res.cookie('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 60 * 60 * 24 * 1000, // 1 day
      path: '/',
    });
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: 'Email hoặc mật khẩu không chính xác' });
  }
});

router.post('/logout', (_req: Request, res: Response): void => {
  res.clearCookie('admin_session', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    path: '/',
  });
  res.json({ success: true });
});

router.get('/check', (req: Request, res: Response): void => {
  const session = req.cookies?.admin_session;
  if (session === 'authenticated') {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

export default router;
