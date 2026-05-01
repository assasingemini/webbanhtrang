import { Request, Response, NextFunction } from 'express';

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const session = req.cookies?.admin_session;
  if (!session || session !== 'authenticated') {
    res.status(401).json({ error: 'Unauthorized – Bạn cần đăng nhập admin.' });
    return;
  }
  next();
}
