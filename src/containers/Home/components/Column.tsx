import React, { useState } from 'react';
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
  const [collapsed, setCollapsed] = useState(false);
  const items = status ? tasks.filter((t) => t.status === status) : tasks;
  return (
    <div className="column">
      <div
        className={`column-inner ${collapsed ? 'collapsed' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }}
        onDrop={(e) => {
          e.preventDefault();
          try {
            const id = e.dataTransfer.getData('text/plain');
            if (id && status !== null) {
              // if column was collapsed, expand so user sees result
              if (collapsed) setCollapsed(false);
              onChangeStatus(id, status);
            }
          } catch (err) {
            // ignore
          }
        }}
      >
        <div className="column-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div>{title}</div>
            <div style={{ opacity: 0.6 }}>{items.length}</div>
          </div>

          {/* collapse/expand button visible on mobile via CSS */}
          <button
            className="collapse-btn"
            aria-expanded={!collapsed}
            aria-label={collapsed ? `Expand ${title}` : `Collapse ${title}`}
            onClick={() => setCollapsed((s) => !s)}
            type="button"
          >
            {collapsed ? '▸' : '▾'}
          </button>
        </div>
        <div className="column-body">
          {!collapsed && items.map((task) => (
            <Card key={task.id} task={task} onChangeStatus={onChangeStatus} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
