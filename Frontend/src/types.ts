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
    boards: board[] | null
    boardLoading: boolean,
    activeBoard: board | null
    setActiveBoard: (board: board) => void,
}

// type - task context
export type TaskContextType = {
    tasks: { [key: string]: taskType[] | null } | null
    taskLoading: boolean,
    fetchAllTasks: (boardId: string) => void
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
    priority: string,
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
}

// type - error callback type
export type callbackErrorType = {
    message: string,
    error: Error
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
    createdBy?: { _id: string, name: string, email: string }
    createdAt?: string
    canEdit?: { _id: string, name: string, email: string }[]
    admins?: { _id: string, name: string; email: string }[]
}
