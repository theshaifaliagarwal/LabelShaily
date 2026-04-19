import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const isLocalhost =
    host.startsWith('localhost') ||
    host.startsWith('127.0.0.1') ||
    host.startsWith('[::1]');

  if (!isLocalhost) {
    return new NextResponse(
      `<!DOCTYPE html><html><head><title>Access Denied</title>
      <style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0d0905;color:#fef3c7;}
      .box{text-align:center;padding:2rem;}h1{font-size:2rem;margin-bottom:0.5rem;}p{color:#d97706;}</style>
      </head><body><div class="box"><h1>🔒 Access Denied</h1>
      <p>The admin panel is only accessible from localhost.</p></div></body></html>`,
      { status: 403, headers: { 'Content-Type': 'text/html' } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
