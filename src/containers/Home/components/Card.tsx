import React from 'react';
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

  return (
    <div
      className={`card ${priorityClass} ${statusClass}`}
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragEnd={() => {
        /* no-op for now */
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
          {/* Buttons depend on status */}
          {task.status === Status.Pending && (
            <>
              <Button variant="success" size="sm" onClick={() => onChangeStatus(task.id, Status.InProgress)} aria-label={`Start ${task.title}`}>
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
  );
}
