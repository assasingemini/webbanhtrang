import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/landing-page – public
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const config = await prisma.langdingPage.findFirst({ where: { id: 1 } });
    res.json(config || {});
  } catch (error) {
    console.error('Error fetching landing page:', error);
    res.status(500).json({ error: 'Lỗi khi lấy cấu hình trang chủ.' });
  }
});

// PUT /api/landing-page – admin
router.put('/', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = {
      heroTitle: req.body.heroTitle,
      heroSubtitle: req.body.heroSubtitle,
      heroBgImage: req.body.heroBgImage,
      aboutTitle: req.body.aboutTitle,
      aboutDescription1: req.body.aboutDescription1,
      aboutDescription2: req.body.aboutDescription2,
      aboutImage: req.body.aboutImage,
      statsRating: req.body.statsRating,
      statsDailyCustomers: req.body.statsDailyCustomers,
      statsExperience: req.body.statsExperience,
      heroPhone: req.body.heroPhone,
      contactAddress: req.body.contactAddress,
      contactEmail: req.body.contactEmail,
      contactHours: req.body.contactHours,
      contactDays: req.body.contactDays,
      facebookUrl: req.body.facebookUrl,
      instagramUrl: req.body.instagramUrl,
      youtubeUrl: req.body.youtubeUrl,
    };

    const config = await prisma.langdingPage.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });

    res.json(config);
  } catch (error) {
    console.error('Error updating landing page:', error);
    res.status(500).json({ error: 'Không thể cập nhật cấu hình trang chủ.' });
  }
});

export default router;
