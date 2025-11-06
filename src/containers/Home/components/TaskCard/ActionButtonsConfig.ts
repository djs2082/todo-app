 import { To } from "react-router-dom";
 import { Status, TaskAction } from "../../../../types"
 import { startTask, addTask, TodoTask, deleteTask, completeTask, resumeTask } from "./api";
 import { fetchTasks } from "../../api";
 export type ActionButtonConfig = {
     variant: 'text' | 'outlined' | 'contained';
     size: 'small' | 'medium' | 'large';
     label: string;
     color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
     onClick: (e: React.MouseEvent, data: TodoTask, taskStore: any) => void;
 };

 const Actions ={
    "Start": "start",
    "Edit": "edit",
    "Delete": "delete",
    "ReOpen": "reopen",
    "Done": "done",
    "Pause": "pause",
    "Resume": "resume"
 }

const addNewTask = async (data: TodoTask) => {
    await addTask({
        id: 1,
        title: 'New Task',
        description: 'This is a new task',
        status: Status.Pending,
        priority: 'medium',
    });
};

const startTaskApi = async (id: number, taskStore: any) => {
    await startTask(id);
    const response = await fetchTasks({});
    if (response.data) {
        const { addTasks } = taskStore;
        addTasks(response.data);
    }
};

const deleteTaskApi = async (id: number, taskStore: any) => {
    await deleteTask(id);
    const response = await fetchTasks({});
    if (response.data) {
        const { addTasks } = taskStore;
        addTasks(response.data);
    }
    // Logic to delete the task
}

const completeTaskApi = async (id: number, taskStore: any) => {
    await completeTask(id);
    const response = await fetchTasks({});
    if (response.data) {
        const { addTasks } = taskStore;
        addTasks(response.data);
    }
    // Logic to complete the task
}

const resumeTaskApi = async(id: number, status: Status, taskStore: any) => {
    await resumeTask(id);
    const response = await fetchTasks({});
    if (response.data) {
        const { addTasks } = taskStore;
        addTasks(response.data);
    }
}


const editTask = (id: number, status: Status, taskStore: any) => {
    const { setShowEditTaskModal, setTaskToEdit } = taskStore;
     
       setShowEditTaskModal(true);
       setTaskToEdit(id, status);
}


const pauseTask = (id: number, status: Status, taskStore: any) => {
    const { setShowTaskPauseModal, setTaskToPause } = taskStore;
     
       setShowTaskPauseModal(true);
       setTaskToPause(id, status);
}


 const actionsButtonConfig: Record<TaskAction, ActionButtonConfig> = {
            [TaskAction.Start]: {
                variant: 'contained',
                size: 'small',
                label: 'Start',
                color: 'success',
                onClick: (e: React.MouseEvent, data: TodoTask, taskStore: any) => { e.stopPropagation(); startTaskApi(data.id, taskStore); },
            },
            [TaskAction.Edit]: {
                variant: 'contained',
                size: 'small',
                label: 'Edit',
                color: 'secondary',
                onClick: (e: React.MouseEvent, data: TodoTask, taskStore: any) => { e.stopPropagation(); editTask(data.id, data.status, taskStore); }
            },
            [TaskAction.Delete]: {
                variant: 'contained',
                size: 'small',
                label: 'Delete',
                color: 'error',
                onClick: (e: React.MouseEvent, data: TodoTask, taskStore: any) => { e.stopPropagation();  deleteTaskApi(data.id, taskStore); },
            },
            [TaskAction.ReOpen]: {
                variant: 'contained',
                size: 'small',
                label: 'Re-open',
                color: 'warning',
                onClick: (e: React.MouseEvent, data: TodoTask, taskStore: any) => { e.stopPropagation(); },
            },
            [TaskAction.Done]: {
                variant: 'contained',
                size: 'small',
                label: 'Done',
                color: 'success',
                onClick: (e: React.MouseEvent, data: TodoTask, taskStore: any) => { e.stopPropagation(); completeTaskApi(data.id, taskStore); },
            },
            [TaskAction.Pause]: {
                variant: 'contained',
                size: 'small',
                label: 'Pause',
                color: 'warning',
                onClick: (e: React.MouseEvent, data: TodoTask, taskStore: any) => { e.stopPropagation(); pauseTask(data.id, data.status, taskStore); },
            },
            [TaskAction.Resume]: {
                variant: 'contained',
                size: 'small',
                label: 'Resume',
                color: 'success',
                onClick: (e: React.MouseEvent, data: TodoTask, taskStore: any) => { e.stopPropagation(); resumeTaskApi(data.id, data.status, taskStore); },
            }
    }

    export default actionsButtonConfig;