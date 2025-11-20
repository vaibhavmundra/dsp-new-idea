import { sendPushNotifications } from "@/app/components/utilities/notifications";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try{
        const {contactUserToken,senderName,content}=await req.json();
        console.log('Deatils received',contactUserToken,senderName,content);
        const{tickets,receipts}=await sendPushNotifications([{ sound: 'default',to:contactUserToken,title:`${senderName}`,body: content.length > 100 ? content.slice(0, 97) + '…' : content}])
        console.log('All tickets:', tickets);
        console.log('All receipts:', receipts);
        return NextResponse.json({ ok: true,tickets, receipts });
    }
    catch(error){
        console.error(error);
        return NextResponse.json(
        {
            ok: false,
        },
        { status: 500 }
        );

    }

}