'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateLandingPage(formData: FormData) {
  const data = {
    heroTitle: formData.get('heroTitle') as string,
    heroSubtitle: formData.get('heroSubtitle') as string,
    heroBgImage: formData.get('heroBgImage') as string,
    aboutTitle: formData.get('aboutTitle') as string,
    aboutDescription1: formData.get('aboutDescription1') as string,
    aboutDescription2: formData.get('aboutDescription2') as string,
    aboutImage: formData.get('aboutImage') as string,
    statsRating: formData.get('statsRating') as string,
    statsDailyCustomers: formData.get('statsDailyCustomers') as string,
    statsExperience: formData.get('statsExperience') as string,
    heroPhone: formData.get('heroPhone') as string,
    contactAddress: formData.get('contactAddress') as string,
    contactEmail: formData.get('contactEmail') as string,
    contactHours: formData.get('contactHours') as string,
    contactDays: formData.get('contactDays') as string,
    facebookUrl: formData.get('facebookUrl') as string,
    instagramUrl: formData.get('instagramUrl') as string,
    youtubeUrl: formData.get('youtubeUrl') as string,
  };

  await prisma.langdingPage.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath('/');
  revalidatePath('/admin/langding-page');
}
