import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import postRoutes from './routes/posts';
import orderRoutes from './routes/orders';
import landingPageRoutes from './routes/landing-page';
import dashboardRoutes from './routes/dashboard';
import customerRoutes from './routes/customers';

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middleware ---
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/landing-page', landingPageRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/customers', customerRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
