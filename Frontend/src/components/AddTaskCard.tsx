import { Input } from './ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useBoardFeatures } from '@/hooks/useBoardFeatures'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import { Button } from './ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useFormSchemas from '@/schemas/useFormSchemas'
import useTaskFeatures from '@/hooks/useTaskFeatures'
import { useParams } from 'react-router-dom'
import SmallSpinner from './ui/SmallSpinner'
import { toast } from 'sonner'


const AddTaskCard = () => {
    const { boardId } = useParams()
    const { activeBoard } = useBoardFeatures()
    const { addTaskFormSchema } = useFormSchemas()
    const { addTaskOnServer, setTasks } = useTaskFeatures()
    const { setError, formState: { errors } } = useForm({ resolver: zodResolver(addTaskFormSchema) })

    // define form
    const form = useForm<z.infer<typeof addTaskFormSchema>>({
        resolver: zodResolver(addTaskFormSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "",
            priority: ""
        },
    })

    // form submit handler
    function onSubmit(values: z.infer<typeof addTaskFormSchema>) {
        addTaskOnServer(boardId, values, (error, success) => {
            if (error) {
                setError("root", {
                    message: error.message
                })
            } else if (success) {
                console.log(success.res.task)
                setTasks(prevTasks => {
                    if (!prevTasks) return prevTasks;

                    const restTask = prevTasks[success.res.task.status] ?? [];

                    return {
                        ...prevTasks,
                        [success.res.task.status]: [success.res.task, ...restTask],
                    };
                });
                toast.success('Task added', {
                    description: `Task added successfully.`,
                    position: 'bottom-left'
                })
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 w-full h-full bg- space-y-4 border border-border rounded-lg custom-scrollbar overflow-y-auto">
                {/* Task title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task title</FormLabel>
                            <FormControl>
                                <Input placeholder="Make a report on..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Task description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Discuss with TL and..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Add a description of the task.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Task status */}
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Status</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Choose status' />
                                        {/* <Input placeholder="shadcn" {...field} /> */}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            activeBoard?.stages.map((s) => (
                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Task priority */}
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task priority</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Choose priority' />
                                        {/* <Input placeholder="shadcn" {...field} /> */}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            ["High", "Medium", "Low"].map((p) => (
                                                <SelectItem key={p} value={p}>{p}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                Choose priority for the task.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    errors.root?.message && <p className="text-destructive text-sm mt-2">{errors.root.message}</p>
                }
                <Button variant='submit' disabled={form.formState.isSubmitting} type="submit">{form.formState.isSubmitting ? <SmallSpinner /> : 'Submit'}</Button>
            </form>
        </Form>
    )
}

export default AddTaskCard
