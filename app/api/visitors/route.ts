import { NextResponse } from 'next/server';

// Simple in-memory counter for demo purposes
// In production, use Vercel KV or similar
let totalVisitors = 12847;
let todayVisitors = 143;
let lastResetDate = new Date().toDateString();

export async function GET() {
  const today = new Date().toDateString();
  if (today !== lastResetDate) {
    todayVisitors = 0;
    lastResetDate = today;
  }
  todayVisitors++;
  totalVisitors++;

  return NextResponse.json({
    today: todayVisitors,
    total: totalVisitors
  });
}
