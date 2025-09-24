import { NextRequest, NextResponse } from 'next/server';
import { handlers } from '@/auth';

export async function OPTIONS() {
  const res = NextResponse.json({});
  res.headers.set('Access-Control-Allow-Origin', 'https://rest-client-app-rosy-six.vercel.app');
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  return res;
}

export async function GET(req: NextRequest) {
  return handlers.GET(req);
}

export async function POST(req: NextRequest) {
  return handlers.POST(req);
}
