import React, { useEffect, useState } from 'react';
import { TodoTask, Status, Priority } from '../../model';
import Button from './../Button';
import Modal from './../Modal';
import Card from '../../../../components/ui/Card';
import PriorityBadge from '../../../../components/ui/PriorityBadge';
import Typography from '../../../../components/ui/Typography';
import Header from './Header';
import Footer from './Footer';

// helper types for pauses
// type PauseEntry = {
//   reason: string;
//   progress: number;
//   comment?: string;
//   at: string; // ISO string
// };

  const truncate = (s?: string, n = 50) => {
    if (!s) return '';
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  };

type TaskCardProps = {
  task: TodoTask;
  onChangeStatus: (id: string, status: Status) => void;
  onEdit: (task: TodoTask) => void;
  onDelete: (id: string) => void;
};

const CardAccentPriorityMap: Record<Priority, 'info' | 'warning' | 'danger'> = {
  low: 'info',
  medium: 'warning',
  high: 'danger',
};

export default function TaskCard({ task, onChangeStatus, onEdit, onDelete }: TaskCardProps) {
  
  const { BodyText } = Typography;
  return (
    <Card
        style={{gap: "4px"}}
        headerHeight="32px"
        padding="16px 16px 4px 16px"
        resizable
        accent
        headerBodyGap="2px"
        bodyFooterGap="2px"
        showHeaderDivider
        accentVariant={CardAccentPriorityMap[task.priority as Priority]}
        header={<Header title={task.title} priority={task.priority as Priority} />}
        footer={<Footer dueDate={task.dueDate} dueTime={task.dueTime} status={task.status} />}
    >
       {task.description ? (
        <BodyText style={{padding: "2px", marginBottom: 0}}>{truncate(task.description, 500)}</BodyText>
          ) : null}
    </Card>
  )
}