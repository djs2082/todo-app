import React, { useEffect, useState } from 'react';
import { TodoTask, Status, Priority } from '../model';
import Button from './Button';

type CardProps = {
  task: TodoTask;
  onChangeStatus: (id: string, status: Status) => void;
  onEdit: (task: TodoTask) => void;
  onDelete: (id: string) => void;
};

export default function Card({ task, onChangeStatus, onEdit, onDelete }: CardProps) {
  const priorityClass =
    task.priority === Priority.Low
      ? 'card--low'
      : task.priority === Priority.Medium
      ? 'card--medium'
      : 'card--high';

  // status class overrides accent for certain statuses
  let statusClass = '';
  if (task.status === Status.Pending) statusClass = 'card--status-todo';
  else if (task.status === Status.Cancelled) statusClass = 'card--status-paused';
  else if (task.status === Status.Done) statusClass = 'card--status-done';

  const truncate = (s?: string, n = 50) => {
    if (!s) return '';
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  };

  // live seconds until due (positive) or overdue (negative)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(() => computeSecondsLeft(task.dueDate, task.dueTime));

  useEffect(() => {
    setSecondsLeft(computeSecondsLeft(task.dueDate, task.dueTime));
    const t = setInterval(() => setSecondsLeft(computeSecondsLeft(task.dueDate, task.dueTime)), 1000);
    return () => clearInterval(t);
  }, [task.dueDate, task.dueTime]);

  function computeSecondsLeft(dueDate?: string, dueTime?: string): number | null {
    if (!dueDate || !dueTime) return null;
    // dueDate expected YYYY-MM-DD, dueTime expected HH:MM
    const dParts = dueDate.split('-').map((p) => parseInt(p, 10));
    const tParts = dueTime.split(':').map((p) => parseInt(p, 10));
    if (dParts.length !== 3 || tParts.length < 2 || Number.isNaN(dParts[0]) || Number.isNaN(tParts[0])) return null;
    const due = new Date(dParts[0], dParts[1] - 1, dParts[2], tParts[0], tParts[1], 0);
    const now = new Date();
    const diffSec = Math.round((due.getTime() - now.getTime()) / 1000); // seconds
    return diffSec;
  }

  // tracked work time in seconds (persisted to localStorage per task)
  const lsKey = `worktime_${task.id}`;
  const [trackedSeconds, setTrackedSeconds] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(lsKey);
      return raw ? parseInt(raw, 10) || 0 : 0;
    } catch (e) {
      return 0;
    }
  });

  // keep interval id in a ref so we can always clear the same timer
  const intervalRef = React.useRef<number | null>(null);
  
  //   eslint-disable-next-line
  useEffect(() => {
    // load when task.id changes (new card)
    try {
      const raw = localStorage.getItem(lsKey);
      setTrackedSeconds(raw ? parseInt(raw, 10) || 0 : 0);
    } catch (e) {
      setTrackedSeconds(0);
    }

    // ensure we don't leave a stray interval when switching cards
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [task.id]);

  // start/stop interval based on status; use a ref so it's reliably cleared
  useEffect(() => {
    if (task.status === Status.InProgress) {
      // only create if there's not already one
      if (intervalRef.current === null) {
        intervalRef.current = window.setInterval(() => {
          setTrackedSeconds((s) => s + 1);
        }, 1000) as unknown as number;
      }
    } else {
      // not in progress -> clear any running timer
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // cleanup on unmount / before next run
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [task.status, task.id]);

  // persist trackedSeconds whenever it changes so we don't rely on closures during cleanup
  useEffect(() => {
    try {
      localStorage.setItem(lsKey, String(trackedSeconds));
    } catch (e) {
    }
  }, [lsKey, trackedSeconds]);

  // save on unmount too (harmless with the above persistence)
  useEffect(() => {
    return () => {
      try {
        localStorage.setItem(lsKey, String(trackedSeconds));
      } catch (e) {
        // ignore
      }
    };
  }, [lsKey, trackedSeconds]);

  function formatDurationFromSeconds(sec: number) {
    const isNegative = sec < 0;
    const abs = Math.abs(sec);
    const hrs = Math.floor(abs / 3600);
    const mins = Math.floor((abs % 3600) / 60);
    if (hrs > 0) return `${isNegative ? 'Overdue ' : 'Due in '}${hrs}h ${mins}m`;
    return `${isNegative ? 'Overdue ' : 'Due in '}${mins}m`;
  }

  function formatUpFromSeconds(sec: number) {
    const abs = Math.abs(sec);
    const hrs = Math.floor(abs / 3600);
    const mins = Math.floor((abs % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  }

  return (
    <div
      className={`card ${priorityClass} ${statusClass}`}
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = 'move';
        try {
          // global fallback for browsers/events where dataTransfer isn't available during dragover
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.__draggingTaskId = task.id;
          // also record source column and index (the column code sets data-task-id on wrappers)
          try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const wrapper = document.querySelector(`.card-wrapper[data-task-id="${task.id}"]`);
            if (wrapper) {
              // get column title from ancestor
              const col = wrapper.closest('.column');
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.__draggingSrcColumn = col ? (col.querySelector('.column-header div')?.textContent || '') : '';
              // compute index among siblings
              const siblings = Array.from(wrapper.parentElement?.querySelectorAll('.card-wrapper') || []) as HTMLElement[];
              const idx = siblings.findIndex((s) => s.dataset.taskId === task.id);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.__draggingSrcIndex = idx;
            }
          } catch (err) {
            // ignore
          }
        } catch (err) {
          // ignore
        }
        // add a class so CSS can style the dragged element if needed
        try {
          (e.currentTarget as HTMLElement)?.classList.add('dragged');
        } catch (err) {
          // ignore
        }
      }}
      onDragEnd={() => {
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.__draggingTaskId = undefined;
        } catch (err) {
          // ignore
        }
        try {
          // remove dragged class
          const el = document.querySelector('.card.dragged') as HTMLElement | null;
          if (el) el.classList.remove('dragged');
        } catch (err) {
          // ignore
        }
      }}
    >
      <div className="card-main">
        {/* Top row: priority + title (left), due date/time (right) */}
        {/* First row: title */}
        <div className="card-top">
          <span className="priority-badge">{task.priority}</span>
          <span className="card-title" title={task.title}>{truncate(task.title, 50)}</span>
        </div>

        {/* Second row: description (trim to 100 chars) */}
        {task.description ? (
          <div className="card-desc" title={task.description}>{truncate(task.description, 100)}</div>
        ) : null}

        {/* Third row: due date and time */}
        <div className="card-datetime">
          <div className="datetime-group">
            <span className="datetime-label">Due date:</span>
            <span className="datetime-value">{task.dueDate ?? 'Not set'}</span>
          </div>
          <div className="datetime-group">
            <span className="datetime-label">Due time:</span>
            <span className="datetime-value">{task.dueTime ?? 'Not set'}</span>
          </div>
        </div>

        {/* Fourth row: actions */}
        <div className="card-actions">
          {/* left: due-in timer for Pending (only) */}
          {task.status === Status.Pending && (
            <div className={`due-in ${secondsLeft !== null && secondsLeft < 0 ? 'overdue' : ''}`}>
              {secondsLeft === null ? 'Due: not set' : formatDurationFromSeconds(secondsLeft)}
            </div>
          )}

          {/* working time (live while InProgress, shown as Worked when paused) */}
          {(task.status === Status.InProgress || task.status === Status.Cancelled) && (
            <div className={`working-time ${task.status === Status.Cancelled ? 'worked' : ''}`}>
              {task.status === Status.InProgress ? `Working time ${formatUpFromSeconds(trackedSeconds)}` : `Worked: ${formatUpFromSeconds(trackedSeconds)}`}
            </div>
          )}

          <div className="actions-right">
           {/* Buttons depend on status */}
          {task.status === Status.Pending && (
            <>
              <Button variant="primary" size="sm" onClick={() => onChangeStatus(task.id, Status.InProgress)} aria-label={`Start ${task.title}`}>
                Start
              </Button>
               <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>Edit</Button>
               <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
             </>
           )}

          {task.status === Status.Cancelled && (
            <>
              <Button variant="success" size="sm" onClick={() => onChangeStatus(task.id, Status.InProgress)}>Resume</Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
            </>
          )}

          {task.status === Status.InProgress && (
            <>
              <Button variant="success" size="sm" onClick={() => onChangeStatus(task.id, Status.Done)}>Done</Button>
              <Button variant="muted" size="sm" onClick={() => onChangeStatus(task.id, Status.Cancelled)}>Pause</Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
            </>
          )}

          {task.status === Status.Done && (
            <>
               <Button variant="ghost" size="sm" onClick={() => onChangeStatus(task.id, Status.Pending)}>Re-open</Button>
               <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>Edit</Button>
               <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
             </>
           )}
          </div>
         </div>
       </div>
     </div>
   );
 }
