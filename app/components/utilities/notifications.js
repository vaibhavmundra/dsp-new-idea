// lib/notifications.js
import Expo from 'expo-server-sdk';

let expo = new Expo();

export async function sendPushNotifications(messages) {
  // messages = [{ to, title, body }, ...]
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log('Push tickets:', ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error('Push error:', error);
    }
  }
  // 2) grab all the receipt IDs
  let receiptIds = tickets
    .filter(t => t.id)
    .map(t => t.id);

  // 3) fetch receipts in chunks
  let receipts = {};
  for (let chunk of expo.chunkPushNotificationReceiptIds(receiptIds)) {
    try {
      let chunkReceipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log('Push receipts:', chunkReceipts);
      receipts = { ...receipts, ...chunkReceipts };
    } catch (err) {
      console.error('Error fetching receipts:', err);
    }
  }

  return { tickets, receipts };
}
