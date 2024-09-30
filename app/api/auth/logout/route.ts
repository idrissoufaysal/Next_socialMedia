import { NextRequest, NextResponse } from "next/server";

 

 export async function POST(req:NextRequest){
     if(req.method !== 'POST'){
       return NextResponse.json({message: 'Methode not allowed'})
     }
     const {email, password, username, name} = await req.json()
     // ...
 
 }