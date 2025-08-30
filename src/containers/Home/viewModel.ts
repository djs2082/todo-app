import { DayTasks, TodoTask, TaskData, ISODate, Priority, Status } from './model';

const STORAGE_KEY = 'daytasks_v1';

type ChangeCallback = () => void;

/**
 * HomeViewModel - supplies data to the view and mediates updates.
 * - keeps DayTasks in-memory indexed by ISO date
 * - persists to localStorage
 * - provides convenience methods to query/add/update/remove tasks
 * - notifies subscribers on changes
 */
export default class HomeViewModel {
  private days = new Map<ISODate, DayTasks>();
  private callbacks: ChangeCallback[] = [];

  constructor() {
    this.load();
  }

  private notify() {
    this.save();
    this.callbacks.forEach((cb) => cb());
  }

  subscribe(cb: ChangeCallback) {
    this.callbacks.push(cb);
    return () => {
      this.callbacks = this.callbacks.filter((c) => c !== cb);
    };
  }

  getDay(date: ISODate): DayTasks {
    let d = this.days.get(date);
    if (!d) {
      d = new DayTasks(date, []);
      this.days.set(date, d);
    }
    return d;
  }

  getTasksForDate(date: ISODate): TodoTask[] {
    return this.getDay(date).tasks;
  }

  addTask(date: ISODate, task: Partial<TaskData> & { title: string; priority?: Priority; status?: Status }) {
    const day = this.getDay(date);
    const t = day.addTask({
      title: task.title,
      description: task.description,
      priority: task.priority ?? Priority.Medium,
      dueDate: task.dueDate ?? date,
      dueTime: task.dueTime,
      status: task.status ?? Status.Pending,
    });
    this.notify();
    return t;
  }

  removeTask(id: string) {
    for (const date of Array.from(this.days.keys())) {
      const day = this.days.get(date)!;
      const before = day.tasks.length;
      day.removeTask(id);
      if (day.tasks.length !== before) {
        this.notify();
        return true;
      }
    }
    return false;
  }

  updateTask(id: string, partial: Partial<Omit<TaskData, 'id' | 'createdAt'>>) {
    const found = this.findTask(id);
    if (!found) return null;
    const { task, day } = found;
    // detect status change and move task to front of list
    const prevStatus = task.status;
    task.update(partial as Partial<TaskData>);
    if (partial.status !== undefined && partial.status !== prevStatus) {
      // remove existing instance
      day.tasks = day.tasks.filter((t) => t.id !== task.id);
      // insert at front so it appears at top of column
      day.tasks.unshift(task);
    }
    this.notify();
    return task;
  }

  markDone(id: string) {
    const found = this.findTask(id);
    if (!found) return false;
    found.task.markDone();
    this.notify();
    return true;
  }

  findTask(id: string): { date: ISODate; day: DayTasks; task: TodoTask } | null {
    for (const date of Array.from(this.days.keys())) {
      const day = this.days.get(date)!;
      const t = day.tasks.find((x: TodoTask) => x.id === id);
      if (t) return { date, day, task: t };
    }
    return null;
  }

  listDates(): ISODate[] {
    return Array.from(this.days.keys()).sort();
  }

  // persistence
  save() {
    try {
      const payload = Array.from(this.days.entries()).map(([date, day]) => day.toJSON());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      // ignore write errors
    }
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as Array<{ date: ISODate; tasks?: TaskData[] }>;
      this.days = new Map(data.map((d) => [d.date, DayTasks.fromJSON(d)]));
    } catch (e) {
      // ignore parse errors
    }
  }

  clearAll() {
    this.days.clear();
    this.notify();
  }
}
