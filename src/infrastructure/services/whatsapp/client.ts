import axios from 'axios';

const WHATSAPP_API_URL = process.env.NEXT_PUBLIC_WHATSAPP_API_URL;
const WHATSAPP_ACCESS_TOKEN = process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID;

export const whatsappClient = axios.create({
  baseURL: WHATSAPP_API_URL,
  headers: {
    'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const sendWhatsAppMessage = async (
  to: string,
  templateName: string,
  languageCode: string,
  components?: any[]
) => {
  try {
    const response = await whatsappClient.post(`/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: languageCode
        },
        components
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}; 