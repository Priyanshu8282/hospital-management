import express from 'express';
import {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteAllMessages,
  deleteMessageById,
} from '../../controller/Admin/messageController.js';

const messageRouter = express.Router();

// Base path: /messages
messageRouter
  .route('/message')
  .post(createMessage) // Create a new message
  .get(getAllMessages) // Get all messages
  .delete(deleteAllMessages); // Delete all messages

// Path: /messages/:id
messageRouter
  .route('/message/:id')
  .get(getMessageById) // Get a message by ID
  .delete(deleteMessageById); // Delete a message by ID

export default messageRouter;