import Message from '../../models/message.js';

// Create a new message
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create a new message
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message created successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message', details: error.message });
  }
};

// Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages', details: error.message });
  }
};

// Get a message by ID
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ data: message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve message', details: error.message });
  }
};

// Delete all messages
export const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany();
    res.status(200).json({ message: 'All messages have been deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete messages', details: error.message });
  }
};

// Delete a message by ID
export const deleteMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message', details: error.message });
  }
};