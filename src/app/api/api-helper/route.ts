const jwt = require('jsonwebtoken')
import { NextResponse } from "next/server";
import postgres from "postgres";

export async function POST(req:Request){
    const auth = await req.json()
    const token = auth.Authorization
    const res = jwt.verify(token, 'jwtsecret' , {
        "alg": "HS384",
        "typ": "JWT"
      })
    const conn = postgres({
        ssl: require,
    });
    const user = await conn.unsafe(`SELECT * FROM users WHERE clientname = '${res.clientName}' AND clientemail = '${res.clientEmail}'`);
    if(!user) {
        return NextResponse.json({
            "message" : "not a valid user"
        })
    }
    
}


















// try {
//     const auth = req.headers.get('authorization')
    // const res = jwt.verify(auth, 'jwtsecret' , {
    //     "alg": "HS384",
    //     "typ": "JWT"
    //   })
   
    // const conn = postgres({
    //     ssl: require,
    // });
    // const user = await conn.unsafe(`SELECT * FROM users WHERE clientname = '${res.clientName}' AND clientemail = '${res.clientEmail}'`);
    // if(!user) {
    //     return NextResponse.json({
    //         "message" : "not a valid user"
    //     })
    // }
    
// } catch (error) {
//     console.log(error)
// }