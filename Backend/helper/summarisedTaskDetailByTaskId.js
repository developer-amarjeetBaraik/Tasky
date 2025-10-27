import { findTaskByTaskId } from "../DBQuery/taskDbQuary.js";

async function summarisedTaskDetailByTaskId(taskId) {
  if(!taskId) throw new DevError("taskId can't be undefined.")

  const task = await findTaskByTaskId(taskId)
  
  return [
    `Title: ${task.title}`,
    `Status: ${task.status}`,
    `Priority: ${task.priority}`,
    task.createdAt ? `Created at: ${task.createdAt}`:null,
    task.dueDate ? `Due: ${task.dueDate}` : null,
    task.description ? `Description: ${task.description}` : null,
  ].filter(Boolean).join("\n");
}

export default summarisedTaskDetailByTaskId