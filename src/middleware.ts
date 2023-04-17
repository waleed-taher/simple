import { NextPageContext } from 'next';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


   
export async function middleware(request: NextRequest) {
    
    const auth= request.headers.get('Authorization')
    if(!auth){
        return new NextResponse(
            JSON.stringify({ success: false, message: 'authentication failed' }),
            { status: 401, headers: { 'content-type': 'application/json' } }
          )
    } else {
        const req = await fetch('http://localhost:3000/api/api-helper' , {
            method: 'POST',
            body: JSON.stringify({
                "Authorization": auth
            })
        })
        NextResponse.next()
        
    }

    
    
  }

export const config = {
    matcher: ['/api/orders', '/api/orders/:path*']
  }