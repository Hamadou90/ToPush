import { NextResponse } from "next/server";
// const jwt = require('jsonwebtoken') ;

export default function middleware(req){
    const url = req.url;
    const sentCookies = req.cookies;
    console.log("The Cookies received is: ", sentCookies, 'And type of accountType = ', typeof sentCookies.accountType);

    // console.log("\n\nThe Signed Token: ", jwt.verify(sentCookies.connectedUser, process.env.JWt_SECRET));

    // Redirect to Dashboard if already connected
    if(url === (`${process.env.NEXT_PUBLIC_HOST}/`)){
        if(sentCookies.connectedUser && sentCookies.accountType === '1'){
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/Staffs`);
        }
        else if(sentCookies.connectedUser && sentCookies.accountType === '2'){
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/Director`);
        }
    }

    if(url.includes('/Staffs') || url.includes('/Director') || url.includes('/Admin')){
        if(!sentCookies.connectedUser && !sentCookies.accountType){
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/`)
        }
        else{
            // let dedicatedDirectory;
            if(sentCookies.accountType === '1'){
                // dedicatedDirectory = '/Staffs';

                if(!url.includes('/Staffs')){
                    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/Staffs`);
                }
                else{
                    return NextResponse.next();
                }
            }
            else if(sentCookies.accountType === '2'){
                // dedicatedDirectory = '/Director';

                if(!url.includes('/Director')){
                    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/Director`);
                }
                else{
                    return NextResponse.next();
                }
            }
            else if(sentCookies.accountType === '3'){
                // dedicatedDirectory = '/Admin';

                if(!url.includes('/Admin')){
                    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/Admin`);
                }
                else{
                    return NextResponse.next();
                }
            }
            // else if(sentCookies.accountType === 2){
            //     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/Director`);
            // }
            // else if(sentCookies.accountType === 3){
            //     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/Admin`);
            // }
        }
    }
}