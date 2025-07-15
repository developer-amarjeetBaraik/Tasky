import DevError from "../../errors/devError.js"
import Task from "../../models/taskSchema.js"

const getPositionForTaskInStatusGroup = async (desiredStatus, boardId, desiredPosition = 1, options = {}) => {
  if (!desiredStatus || !boardId) {
    throw new DevError("Status and boardId are required.");
  }

  // Convert to integer if string
  desiredPosition = parseInt(desiredPosition);
  if (isNaN(desiredPosition) || desiredPosition < 0) {
    throw new DevError("desiredPosition must be a number >= 0.");
  }

  // Treat 0 and 1 the same (insert at beginning)
  if (desiredPosition === 0) desiredPosition = 1;

  // Fetch all tasks in same board and status, sorted by position
  let query = Task.find({ boardId: boardId, status: desiredStatus }).sort({ position: 1 });
  if (options?.session) query = query.session(options.session);
  const tasks = await query;
  console.log(tasks)

  const total = tasks.length;
  const index = Math.max(0, desiredPosition - 1); // 1-based to 0-based

  // Sparse position spacing (default gap)
  const GAP = 1000;

  // CASE 1: No tasks in this status
  if (total === 0) return GAP;

  // CASE 2: Insert at beginning
  if (index === 0) {
    console.log(tasks[0].position - GAP)
    return tasks[0].position - GAP;
  }

  // CASE 3: Insert at end
  if (index >= total) {
    return tasks[total - 1].position + GAP;
  }

  // CASE 4: Insert between two tasks
  const prev = tasks[index - 1].position;
  const next = tasks[index].position;
  const avg = (prev + next) / 2;

  // If average is same as one of them (means not enough gap), trigger fallback
  if (avg === prev || avg === next) {
    // Optional: You can trigger re-indexing here if needed
    return next - 1; // still keep ordering
  }

  return avg;
};

export default getPositionForTaskInStatusGroup;