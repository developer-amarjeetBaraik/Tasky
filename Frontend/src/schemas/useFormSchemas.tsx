import { useBoardFeatures } from "@/hooks/useBoardFeatures"
import z from "zod"

// Further refinement has been added in this schema inside the useFormSchema > addTaskFromSchema
const baseAddTaskFromSchema = z.object({
    title: z.string().min(5, { message: 'Task title must be at least 5 characters.' }).max(40, { message: 'Task title must be less then 40 characters.' }),
    description: z.string().min(10, { message: 'Task description must be at least 10 characters.' }).max(70, { message: 'Task description must be less then 70 characters.' }),
    status: z.string(),
    priority: z.string(),
})
export type addTaskFormSchemaType = z.infer<typeof baseAddTaskFromSchema>

const useFormSchemas = () => {
    const { activeBoard } = useBoardFeatures()

    // refine the add task form schme with zod
    const addTaskFormSchema = baseAddTaskFromSchema.extend({
        // title:z.string().refine(
        //     (val) =>
        // ),
        status: z.string().refine(
            (val) => activeBoard?.stages.includes(val),
            { message: "Task status must be one of the given list." }
        ),
        priority: z.string().refine(
            (val) => ["High", "Medium", "Low"].includes(val),
            { message: "Task priority can be only High, Medium or Low." }
        ),
    })

    return {
        addTaskFormSchema,
    }
}

export default useFormSchemas
