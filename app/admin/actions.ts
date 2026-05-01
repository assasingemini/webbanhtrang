'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (email === 'admin@banhtrang.vn' && password === 'admin123') {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    return { success: true };
  }

  return { success: false, error: 'Email hoặc mật khẩu không chính xác' };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
