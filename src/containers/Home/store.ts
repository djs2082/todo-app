import { create } from 'zustand';
import { Task, TasksByStatus, TaskState, Priority, Status } from '../../types';

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: {
    pending: [],
    in_progress: [],
    paused: [],
    completed: [],
  },

  taskToEdit: {
    id: 0,
    priority: Priority.Medium,
    status: Status.Pending,
    title: "",
    description: "",
    due_date_time: "",
  },

  addTask: (task) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [task.status]: [...state.tasks[task.status], task],
      },
    })),

  addTasks: (tasks) =>
    set(() => ({
       tasks: {
        pending: tasks.pending || [],
        in_progress: tasks.in_progress || [],
        paused: tasks.paused || [],
        completed: tasks.completed || [],
      },
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        pending: state.tasks.pending.filter((task) => task.id !== id),
        in_progress: state.tasks.in_progress.filter((task) => task.id !== id),
        paused: state.tasks.paused.filter((task) => task.id !== id),
        completed: state.tasks.completed.filter((task) => task.id !== id),
      },
    })),
  clearAllTasks: () => set({ tasks: {
      pending: [],
      in_progress: [],
      paused: [],
      completed: [],
  }}),
  getTask: (id: number, status: Status) => {
    const taskList = get().tasks[status];
    return taskList.find((task) => task.id === id);
  },
  setTaskToEdit: (id: number, status: Status) => {
    console.log('setTaskToEdit called with id:', id, 'status:', status);
    const task = get().tasks[status].find((task) => task.id === id);
    set({ taskToEdit: task });
  },
  taskToPause: {
    id: 0,
    priority: Priority.Medium,
    status: Status.Pending,
    title: "",
    description: "",
    due_date_time: "",
  },
  setTaskToPause: (id: number, status: Status) => {
    console.log('setTaskToPause called with id:', id, 'status:', status);
    const task = get().tasks[status].find((task) => task.id === id);
    set({ taskToPause: task });
  },
  showAddTaskModal: false,
  setShowAddTaskModal: (show: boolean) => set({ showAddTaskModal: show }),
  showEditTaskModal: false,
  setShowEditTaskModal: (show: boolean) => set({ showEditTaskModal: show }),
  showTaskPauseModal: false,
  setShowTaskPauseModal: (show: boolean) => set({ showTaskPauseModal: show }),
}));

export default useTaskStore;
