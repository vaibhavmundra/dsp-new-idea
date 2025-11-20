'use server'
import Airtable from "airtable";
export async function handleSubmit(formData) {

  console.log("AIRTABLE_API_KEY:", process.env.AIRTABLE_API_KEY);

    
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base('appQWMi2btUWfrkBk');
    
    try {
      await base('Applications').create([
        {
          fields: {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'), 
            firm: formData.get('firm'),
            // about: formData.get('about'),
            // Opinion: formData.get('opinion'),
            // link: formData.get('portfolio'),
            city: formData.get('city'),
            // referral: formData.get('referral')
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