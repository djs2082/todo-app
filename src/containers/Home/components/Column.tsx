import React from 'react';
import { TodoTask, Status } from '../model';
import Card from './Card';

type ColumnProps = {
  title: string;
  status: Status | null; // null means show all
  tasks: TodoTask[];
  onChangeStatus: (id: string, status: Status) => void;
  onEdit: (task: TodoTask) => void;
  onDelete: (id: string) => void;
};

export default function Column({ title, status, tasks, onChangeStatus, onEdit, onDelete }: ColumnProps) {
  const items = status ? tasks.filter((t) => t.status === status) : tasks;
  return (
    <div className="column">
      <div
        className="column-inner"
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }}
        onDrop={(e) => {
          e.preventDefault();
          try {
            const id = e.dataTransfer.getData('text/plain');
            if (id && status !== null) onChangeStatus(id, status);
          } catch (err) {
            // ignore
          }
        }}
      >
        <div className="column-header">
          <div>{title}</div>
          <div>{items.length}</div>
        </div>
        <div className="column-body">
          {items.map((task) => (
            <Card key={task.id} task={task} onChangeStatus={onChangeStatus} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
