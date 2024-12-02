import { useMutation } from '@tanstack/react-query';
import { sendWhatsAppMessage } from '@/infrastructure/services/whatsapp/client';

export const useWhatsApp = () => {
  const sendMessageMutation = useMutation({
    mutationFn: ({
      to,
      templateName,
      languageCode = 'es',
      components
    }: {
      to: string;
      templateName: string;
      languageCode?: string;
      components?: any[];
    }) => sendWhatsAppMessage(to, templateName, languageCode, components),
  });

  const sendBookingConfirmation = async (phoneNumber: string, bookingDetails: {
    customerName: string;
    service: string;
    date: string;
    time: string;
  }) => {
    return sendMessageMutation.mutateAsync({
      to: phoneNumber,
      templateName: 'booking_confirmation',
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: bookingDetails.customerName
            },
            {
              type: "text",
              text: bookingDetails.service
            },
            {
              type: "text",
              text: bookingDetails.date
            },
            {
              type: "text",
              text: bookingDetails.time
            }
          ]
        }
      ]
    });
  };

  return {
    sendBookingConfirmation,
    isLoading: sendMessageMutation.isPending,
    error: sendMessageMutation.error
  };
}; 