'use server'
import Airtable from "airtable";
const WEBHOOK_URL = 'https://n8n-railway-production-976c7.up.railway.app/webhook/ecec76f0-b5ca-4238-b9b0-c5765edef96a' //Production
// const WEBHOOK_URL = 'https://n8n-railway-production-976c7.up.railway.app/webhook-test/ecec76f0-b5ca-4238-b9b0-c5765edef96a' //Testing


export async function handleVendorSubmit(formData){

    async function airtableUpdate(){

        const base = new Airtable({
              apiKey: process.env.AIRTABLE_API_KEY
            }).base('appcwecj2ii8TXToW');
        
             try {
          await base('Form Submissions').create([
            {
              fields: {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                search: formData.get('search'),
                city: formData.get('city') || 'India',
                category: formData.get('category')
              }
            }
          ])
          console.log("Airtable base updated successfully");
          return { success: true }
        } catch (error) {
          console.error(error)
          return { success: false }
        }
    }
    await airtableUpdate();
    const query =  `${formData.get('search')} ${formData.get('city')||'India'} Instagram`
    const response = await fetch(WEBHOOK_URL,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({name:formData.get('name'),phone:formData.get('phone'), email:formData.get('email'), search:formData.get('search'), city:formData.get('city') || 'India', query, category:formData.get('category')})
    })
    const resp = await response.json();
    console.log('Webhook successfully sent',resp);
    return resp;

}