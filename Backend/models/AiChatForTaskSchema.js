import mongoose, { Schema } from 'mongoose';

const metaDataSchema = new Schema({
  model: { type: String },
  tokensUsed: { type: Number },
});

// Define your chat schema
const aiChatForTaskSchema = new Schema({
  taskId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Task',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  role: {
    type: String,
    enum: ['user', 'assistant', 'admin'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  metaData: metaDataSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for fast retrieval by task and time
aiChatForTaskSchema.index({ taskId: 1, createdAt: -1 });

const AiChatForTask = mongoose.model('AiChatForTask', aiChatForTaskSchema);
export default AiChatForTask;
