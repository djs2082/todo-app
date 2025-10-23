import { TodoTask, Status, Priority } from '../../model';
import Card from '../../../../components/ui/Card';
import Typography from '../../../../components/ui/Typography';
import Header from './Header';
import Footer from './Footer';
import { truncateString } from '../../../../utils';

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

export default function TaskCard({ task }: TaskCardProps) {
  
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
        <BodyText style={{padding: "2px", marginBottom: 0}}>{truncateString(task.description, 500)}</BodyText>
          ) : null}
    </Card>
  )
}