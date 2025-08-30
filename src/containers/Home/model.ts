export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum Status {
  Pending = 'pending',
  InProgress = 'in_progress',
  Done = 'done',
  Cancelled = 'cancelled',
}

export type ISODate = string; // YYYY-MM-DD
export type LocalTime = string; // HH:MM (24h)

export interface TaskData {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: ISODate;
  dueTime?: LocalTime;
  status: Status;
  createdAt: string; // ISO datetime
  updatedAt?: string; // ISO datetime
}

function nowIso(): string {
  return new Date().toISOString();
}

/**
 * TodoTask represents a single task with fields requested by the user.
 * Construct with partial data; id/createdAt will be generated when missing.
 */
export class TodoTask implements TaskData {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: ISODate;
  dueTime?: LocalTime;
  status: Status;
  createdAt: string;
  updatedAt?: string;

  constructor(data: Partial<TaskData> & { title: string }) {
    this.id = data.id ?? String(Date.now()) + Math.random().toString(36).slice(2, 8);
    this.title = data.title;
    this.description = data.description;
    this.priority = data.priority ?? Priority.Medium;
    this.dueDate = data.dueDate;
    this.dueTime = data.dueTime;
    this.status = data.status ?? Status.Pending;
    this.createdAt = data.createdAt ?? nowIso();
    this.updatedAt = data.updatedAt;
  }

  update(partial: Partial<Omit<TaskData, 'id' | 'createdAt'>>) {
    if (partial.title !== undefined) this.title = partial.title;
    if (partial.description !== undefined) this.description = partial.description;
    if (partial.priority !== undefined) this.priority = partial.priority;
    if (partial.dueDate !== undefined) this.dueDate = partial.dueDate;
    if (partial.dueTime !== undefined) this.dueTime = partial.dueTime;
    if (partial.status !== undefined) this.status = partial.status;
    this.updatedAt = nowIso();
  }

  markDone() {
    this.status = Status.Done;
    this.updatedAt = nowIso();
  }

  toJSON(): TaskData {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      dueDate: this.dueDate,
      dueTime: this.dueTime,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    } as TaskData;
  }

  static fromJSON(data: TaskData): TodoTask {
    return new TodoTask(data as Partial<TaskData> & { title: string });
  }
}

/**
 * DayTasks groups many tasks for a single day.
 */
export class DayTasks {
  date: ISODate;
  tasks: TodoTask[];

  constructor(date: ISODate, tasks?: TodoTask[] | TaskData[]) {
    this.date = date;
    this.tasks = (tasks ?? []).map((t) => (t instanceof TodoTask ? t : TodoTask.fromJSON(t as TaskData)));
  }

  addTask(task: Partial<TaskData> & { title: string }) {
    const t = new TodoTask(task);
    this.tasks.push(t);
    return t;
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  getTasksByStatus(status: Status) {
    return this.tasks.filter((t) => t.status === status);
  }

  toJSON() {
    return {
      date: this.date,
      tasks: this.tasks.map((t) => t.toJSON()),
    };
  }

  static fromJSON(payload: { date: ISODate; tasks?: TaskData[] }) {
    return new DayTasks(payload.date, (payload.tasks ?? []).map((d) => TodoTask.fromJSON(d)));
  }
}
