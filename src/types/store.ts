/**
 * Store-related types
 * Zustand store state interfaces
 */

import { Task, TasksByStatus, Status } from './task';

/**
 * Task store state interface
 */
export interface TaskState {
  tasks: TasksByStatus;
  addTasks: (tasks: TasksByStatus) => void;
  addTask: (task: Task) => void;
  removeTask: (id?: string | number) => void;
  getTask: (id: number, status: Status) => Task | undefined;
  clearAllTasks: () => void;
  showAddTaskModal: boolean;
  setShowAddTaskModal: (show: boolean) => void;
  showEditTaskModal: boolean;
  setShowEditTaskModal: (show: boolean) => void;
  taskToEdit: Task | null;
  setTaskToEdit: (id: number, status: Status) => void;
  showTaskPauseModal: boolean;
  setShowTaskPauseModal: (show: boolean) => void;
  taskToPause: Task | null;
  setTaskToPause: (id: number, status: Status) => void;
}
