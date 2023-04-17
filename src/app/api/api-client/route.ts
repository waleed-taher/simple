const jwt = require('jsonwebtoken')
import { NextResponse, NextRequest } from "next/server";
import postgres from "postgres";


export async function POST(req: NextRequest) {
    try {

        const { clientName, clientEmail } = await req.json()
        let token = jwt.sign({clientName: clientName , clientEmail: clientEmail}, 'jwtsecret' , {expiresIn: "7d"})
        
        if(!clientName && !clientEmail) {
            return new NextResponse(JSON.stringify({
                "message" : "client Name or email not entered"
            }))
        } else {
            const conn = postgres({
                ssl: require,
            });
            const user = await conn.unsafe(`INSERT INTO users(clientName,clientEmail) VALUES ('${clientName}' , '${clientEmail}')`);
            return new NextResponse(JSON.stringify({
               
                "token" : `${token}`
            }), {
                status: 201
            })
            
        }
            
        
    } catch (error) {
        if(error){
            return new NextResponse(JSON.stringify({
                "message" : "API client already registered"
                
            }) , { status: 409 })
        } 
    }
    
    
    
}

