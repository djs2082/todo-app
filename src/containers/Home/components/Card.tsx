import React from 'react';
import { TodoTask, Status } from '../model';

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
            <button onClick={() => onChangeStatus(task.id, Status.InProgress)}>Start</button>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </>
        )}

        {task.status === Status.Cancelled && (
          <>
            <button onClick={() => onChangeStatus(task.id, Status.InProgress)}>Resume</button>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </>
        )}

        {task.status === Status.InProgress && (
          <>
            <button onClick={() => onChangeStatus(task.id, Status.Done)}>Done</button>
            <button onClick={() => onChangeStatus(task.id, Status.Cancelled)}>Pause</button>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </>
        )}

        {task.status === Status.Done && (
          <>
            <button onClick={() => onChangeStatus(task.id, Status.Pending)}>Re-open</button>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
