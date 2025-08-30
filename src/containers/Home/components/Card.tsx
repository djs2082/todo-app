import React from 'react';
import { TodoTask, Status } from '../model';
import Button from './Button';

type CardProps = {
  task: TodoTask;
  onChangeStatus: (id: string, status: Status) => void;
  onEdit: (task: TodoTask) => void;
  onDelete: (id: string) => void;
};

export default function Card({ task, onChangeStatus, onEdit, onDelete }: CardProps) {
  return (
    <div
      className="card"
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
        <div className="card-title">{task.title}</div>
        {task.description ? <div className="card-desc">{task.description}</div> : null}
        <div className="card-meta">Priority: {task.priority} · {task.dueDate ?? ''} {task.dueTime ?? ''}</div>
      </div>
      <div className="card-actions">
        {/* Buttons depend on status */}
        {task.status === Status.Pending && (
          <>
            <Button variant="primary" size="sm" onClick={() => onChangeStatus(task.id, Status.InProgress)}>Start</Button>
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
  );
}
