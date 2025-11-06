/**
 * Task-related types and enums
 * Centralized task model for the entire application
 */

import { ID, ISODateTime } from './common';

/**
 * Task priority levels
 */
export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

/**
 * Task status states
 */
export enum Status {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
  Paused = 'paused',
}

/**
 * Task actions - operations that can be performed on a task
 */
export enum TaskAction {
  Start = 'start',
  Edit = 'edit',
  Delete = 'delete',
  ReOpen = 'reopen',
  Done = 'done',
  Pause = 'pause',
  Resume = 'resume',
}

/**
 * Complete task data structure (from server/database)
 * This is the most comprehensive task representation
 */
export interface TaskData {
  id: number;
  usr_id: number;
  title: string;
  description?: string;
  priority: Priority;
  created_at: ISODateTime;
  updated_at?: ISODateTime;
  due_date_time: ISODateTime | null;
  status: Status;
  total_working_time: number; // in seconds
  started_at: ISODateTime | null;
  last_resumed_at: ISODateTime | null;
}

/**
 * Client-side task representation (simplified for UI)
 * Use this for client state management and components
 */
export interface Task {
  id: ID;
  title: string;
  description: string;
  priority: Priority;
  due_date_time: ISODateTime;
  status: Status;
}

/**
 * Tasks organized by status
 * Used in the task store for efficient status-based rendering
 */
export type TasksByStatus = {
  [key in Status]: Task[];
};

/**
 * Payload for creating a new task
 */
export interface CreateTaskPayload {
  title: string;
  description: string;
  due_date_time: ISODateTime;
  priority: Priority;
}

/**
 * Payload for updating an existing task
 */
export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {
  id: ID;
}

/**
 * Payload for pausing a task
 */
export interface PauseTaskPayload {
  reason: string;
  progress: number;
  comment: string;
}

/**
 * Response when creating a task
 */
export interface CreateTaskResponse {
  message: string;
  data: {
    id: number;
  };
}

/**
 * Response when fetching tasks
 */
export interface FetchTasksResponse {
  message?: string;
  data?: TasksByStatus;
}
