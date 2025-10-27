import type { editTaskType, taskType, userObjectType } from '@/types'
import React, { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import CustomDialog from './CustomDialog'
import { Label } from './label'
import { Input } from './input'
import { useFieldValidationWithZod } from '@/hooks/useFieldValidationWithZod'
import useFormSchemas from '@/schemas/useFormSchemas'
import ErrorNote from './ErrorNote'
import useTaskFeatures from '@/hooks/useTaskFeatures'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import UserList from './UserList'

const EditTaskDialogBoxes = ({ task, action, setEditTaskAction }: { task: taskType, action: editTaskType['actions'], setEditTaskAction: Dispatch<SetStateAction<editTaskType['actions']>> }) => {
    const { boardId } = useParams()
    const { setTasks, changeTitleOnServer, changeDescriptionOnServer, assignSomeoneOnServer } = useTaskFeatures()
    const [isOpenDialogbox, setIsOpenDialogbox] = useState<boolean>(false)
    const [userSearchQuery, setuserSearchQuery] = useState<string>('')
    const [selectedUserToAssign, setSelectedUserToAssign] = useState<userObjectType>()
    const [assignSomeoneOnSearverLoading, setAssignSomeoneOnServerLoading] = useState<boolean>(false)
    const taskTitleInputRef = useRef<HTMLInputElement>(null)
    const taskDescriptionInputRef = useRef<HTMLInputElement>(null)
    const assignToSomeoneInputRef = useRef<HTMLInputElement>(null)
    const { addTaskFormSchema } = useFormSchemas()
    const { validate: validateTaskTitle, error: titleValidationError } = useFieldValidationWithZod(addTaskFormSchema.pick({ title: true }), "title")
    const { validate: validateTaskDescription, error: descriptionValidationError } = useFieldValidationWithZod(addTaskFormSchema.pick({ description: true }), "description")

    useEffect(()=>{
        setSelectedUserToAssign(undefined)
    },[isOpenDialogbox])

    useEffect(() => {
        if (action !== 'none') {
            setIsOpenDialogbox(true)
        } else {
            setIsOpenDialogbox(false)
        }
    }, [action])

    useEffect(() => {
        if (!isOpenDialogbox) {
            setEditTaskAction("none")
        }
    }, [isOpenDialogbox])

    // check for field validation

    // validate title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateTaskTitle(e.target.value)
    }

    // validate description
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateTaskDescription(e.target.value)
    }

    // handling the assign someone feature
    const handleAssignSomeoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedUserToAssign(undefined)
        setuserSearchQuery(e.target.value)
    }

    const handleUserListUserClick = (user: userObjectType) => {
        setSelectedUserToAssign(user)
    }


    // saving change on server

    // handle edit title
    const handleEditTitle = async () => {
        // checking if the task title is same
        if (task.title === taskTitleInputRef.current?.value) return

        if (!taskTitleInputRef.current?.value) return toast.error("Something went wrong with task new title.", {
            richColors: true,
            position: "top-center"
        })

        try {
            // change title on server
            changeTitleOnServer(boardId, task._id, task.title, taskTitleInputRef.current?.value, (error, success) => {
                if (error) {
                    return toast.error(error.message, {
                        richColors: true,
                    })
                }

                setTasks(prevTasks => {
                    if (!prevTasks) return prevTasks;

                    const statusGroup = prevTasks[task.status] ?? [];

                    return {
                        ...prevTasks,
                        [task.status]: [success?.res.updatedTask, ...statusGroup.filter(t => t._id !== task._id)],
                    };
                });
            })
        } catch (error) {
            toast.error("Something went wrong, faild to change title.", {
                richColors: true,
                position: 'top-center'
            })
        }
    }

    // handle edit description
    const handleDescription = async () => {
        // checking if the task description is same
        if (task.description === taskDescriptionInputRef.current?.value) return

        if (!taskDescriptionInputRef.current?.value) return toast.error("Something went wrong with task new title.", {
            richColors: true,
            position: "top-center"
        })

        try {
            // change description on server
            changeDescriptionOnServer(boardId, task._id, task.description, taskDescriptionInputRef.current?.value, (error, success) => {
                if (error) {
                    return toast.error(error.message, {
                        richColors: true,
                    })
                }

                setTasks(prevTasks => {
                    if (!prevTasks) return prevTasks;

                    const statusGroup = prevTasks[task.status] ?? [];

                    return {
                        ...prevTasks,
                        [task.status]: [success?.res.updatedTask, ...statusGroup.filter(t => t._id !== task._id)],
                    };
                });
            })
        } catch (error) {
            toast.error("Something went wrong, faild to change description.", {
                richColors: true,
                position: 'top-center'
            })
        }
    }

    // handle assign someone
    const handleAssingSomeone = async () => {
        setSelectedUserToAssign(undefined)
        
        // checking if the new assigned user is selected
        if (!selectedUserToAssign) return
        
        // check if the user is already assigned to the same user
        if(task?.assignedTo?._id === selectedUserToAssign?._id) return
        
        setAssignSomeoneOnServerLoading(true)

        try {
            // change description on server
            assignSomeoneOnServer(boardId, task._id, selectedUserToAssign!._id, (error, success) => {
                if (error) {
                    return toast.error(error.message, {
                        richColors: true,
                    })
                }
                console.log(success)

                setTasks(prevTasks => {
                    if (!prevTasks) return prevTasks;

                    const statusGroup = prevTasks[task.status] ?? [];

                    return {
                        ...prevTasks,
                        [task.status]: [success?.res.updatedTask, ...statusGroup.filter(t => t._id !== task._id)],
                    };
                });
            })
        } catch (error) {
            toast.error("Something went wrong, faild to assign someone.", {
                richColors: true,
                position: 'top-center'
            })
        } finally {
            setAssignSomeoneOnServerLoading(false)
        }
    }

    return (
        <>
            {
                action === 'change-title' && <CustomDialog open={isOpenDialogbox} onOpenChange={setIsOpenDialogbox} title='Edit title' description='Change the title of the task. Click save when you are done.' continueBtnText='Save changes' onContinue={handleEditTitle} disableContinueBtn={titleValidationError.length > 0}>
                    <Label htmlFor='taskTitle'>Task title</Label>
                    <Input ref={taskTitleInputRef} id='taskTitle' name='taskTitle' type='text' defaultValue={task.title} onChange={handleTitleChange} />
                    <ErrorNote error={titleValidationError} />
                </CustomDialog>
            }
            {
                action === 'change-description' && <CustomDialog open={isOpenDialogbox} onOpenChange={setIsOpenDialogbox} title='Edit description' description='Change the description of the task. Click save when you are done.' continueBtnText='Save changes' onContinue={handleDescription} disableContinueBtn={descriptionValidationError.length > 0}>
                    <Label htmlFor='taskDescription'>Task description</Label>
                    <Input ref={taskDescriptionInputRef} id='taskDescription' name='taskDescription' type='text' defaultValue={task.description} onChange={handleDescriptionChange} />
                    <ErrorNote error={descriptionValidationError} />
                </CustomDialog>
            }
            {
                action === 'assign-someone' && <CustomDialog open={isOpenDialogbox} onOpenChange={setIsOpenDialogbox} title='Assign someone' description='Assign this task to someone else.' continueBtnText='Assign' continueLoadingState={assignSomeoneOnSearverLoading} onContinue={handleAssingSomeone} disableContinueBtn={(!selectedUserToAssign && !assignToSomeoneInputRef.current) || !selectedUserToAssign}>
                    <Label htmlFor='assignSomeone'>Assign to</Label>
                    <Input ref={assignToSomeoneInputRef} id='assignSomeone' name='assignSomeone' type='text' placeholder='Search user by name.' autoComplete='off' onChange={handleAssignSomeoneInputChange} />

                    {!selectedUserToAssign && <UserList searchQuery={userSearchQuery} onUserClick={handleUserListUserClick} />}
                    {selectedUserToAssign ? <div>
                        <p>Assigning to: <strong>{selectedUserToAssign.name}</strong> ({selectedUserToAssign._id})</p>
                    </div> : null}

                </CustomDialog>
            }
        </>
    )
}

export default EditTaskDialogBoxes
