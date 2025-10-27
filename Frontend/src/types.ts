import type { Dispatch, SetStateAction } from "react"
import type React from "react"

// type - user auth context
export type UserAuthContextType = {
    user: userObjectType | null,
    isAuthenticated: boolean | null,
    authLoading: boolean,
    login: (email: string, password: string, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => void,
    signup: (name: string, email: string, password: string, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => void,
    logout: (callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => void,
}

// type - board context
export type BoardContextType = {
    isUserAdmin: boolean
    // boardId:string | undefined
    boards: board[] | null
    boardLoading: boolean,
    activeBoard: board | null
    setActiveBoard: (board: board) => void,
}

// type - task context
export type TaskContextType = {
    tasks: { [key: string]: taskType[] | null } | null
    setTasks: React.Dispatch<React.SetStateAction<TaskContextType['tasks']>>
    taskLoading: boolean,
    fetchAllTasks: (boardId: string | undefined) => void,
    addTaskOnServer: (boardId: string | undefined, taskInfo: unknown, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => void,
    changeStatusOnServer: (boardId: string | undefined, taskId: string, oldStatus: string, newStatus: string, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => void
    changePriorityOnServer: (boardId: string | undefined, taskId: string, newPriority: string, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => void
    deleteTaskOnServer: (boardId: string | undefined, taskId: string, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => void
    changeTitleOnServer: (boardId: string | undefined, taskId: string, oldTitle: string, newTitle: string, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => void
    changeDescriptionOnServer: (boardId: string | undefined, taskId: string, oldDescription: string, newDescription: string, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => void
    assignSomeoneOnServer: (boardId: string | undefined, taskId: string, assignTo: string, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => void
}

export type BoardSocketContextType = {
    isConnectedToBoradSocket: Boolean
    joinBoardRoom: (boardId: string) => void
    totalLiveBoardUser: number | undefined
}

export type TaskSocketContextType = {
    
}

export type editTaskType = {
    actions: 'none' | 'change-title' | 'change-description' | 'change-priority' | 'change-status' | 'assign-someone'
}

// type - user type
export type userObjectType = {
    name: string,
    email: string,
    _id: string,
    createdAt?: string,
}

// type - board user type
export type boardUserType = {
    name: string,
    email: string,
    _id: string,
}

export type taskUser = {
    _id: string,
    name: string,
    email: string,
}

// type - task type
export type taskType = {
    _id: string,
    title: string,
    description: string,
    boardId: string,
    status: string,
    priority: string | null,
    assignedTo: taskUser,
    createdBy: taskUser,
    createdAt: Date,
    updatedAt: Date,
    lastEditedBy: taskUser,
    position: number,
}

// type - success callback type
export type callbackSuccessType = {
    message: string
    res?: any
}

// type - error callback type
export type callbackErrorType = {
    message: string,
    res?: any,
    error?: Error,
    metaData?: any,
}

// type - custom error type
export type CustomError = {
    message: string;
};

// type - board type
export type board = {
    _id: string
    name: string
    description?: string
    stages: [string]
    createdBy?: { _id: string, name: string, email: string }
    createdAt?: string
    canEdit?: { _id: string, name: string, email: string }[]
    admins?: { _id: string, name: string; email: string }[]
}

export interface AlertDialogPopupType {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    alertTitle: React.ReactNode;
    alertDescription?: React.ReactNode;
    onCancel?: () => void;
    onContinue?: () => void;
    cancelBtnText?: string;
    continueBtnText?: string;
    continueVerient?: "Default" | "Destructive";
    children?: React.ReactNode; // trigger
}

export interface CustomDialogType {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: string
    description: string
    trigger?: React.ReactNode
    onContinue?: () => void
    disableContinueBtn?: boolean
    continueLoadingState?: boolean
    continueBtnText?: string
    continueVerient?: "Default" | "Destructive";
    children?: React.ReactNode;
}