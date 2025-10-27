import AiChatForTask from "../models/AiChatForTaskSchema.js";

/**
 * Retrieve paginated chat messages for a given task.
 * 
 * @param {ObjectId} taskId - The ID of the task.
 * @param {number} limit - Number of chat messages to retrieve per page.
 * @param {number} skip - Number of chat messages to skip (for pagination).
 * @returns {Promise<Array>} Chat messages sorted oldest-to-newest.
 */
export async function getLatestTaskChats(taskId, limit = 5, skip = 0) {
  try {
    const chats = await AiChatForTask
      .find({ taskId })
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)              // skip previous records (for pagination)
      .limit(limit)
      .lean();

    // Reverse so results are oldest → newest (for proper display order)
    return chats.reverse();
  } catch (error) {
    console.error('Error fetching paginated task chats:', error);
    throw new Error('Failed to retrieve chat messages');
  }
}
