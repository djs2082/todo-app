import React from 'react';
import { Status, Actions, TaskData } from '../../model';
import Button from './../../../../components/ui/Button';
import { ActionButtonConfig } from './ActionButtonsConfig';
import actionsButtonConfig from './ActionButtonsConfig';
import TaskPause from './TaskPause';
import useTaskStore from '../../store';
import AddEditTask from '../AddEditTask';

type FooterButtonProps = {
    status: Status;
    task: TaskData;
};





const FooterButton = ({status, task}: FooterButtonProps) => {

    const [showPauseForm, setShowPauseForm] = React.useState(false);
    const taskStore = useTaskStore();
    const { showTaskPauseModal, setShowTaskPauseModal } = taskStore;

    const onFooterButtonClick = (e: React.MouseEvent, action: Actions, data: any) => {
    switch (action) {
        case Actions.Start:
            // Handle Start action
            break;
        case Actions.Edit:
            // Handle Edit action
            break;
        case Actions.Delete:
            // Handle Delete action
            break;
        case Actions.ReOpen:
            // Handle ReOpen action
            break;
        case Actions.Done:
            // Handle Done action
            break;
        case Actions.Pause:
            setShowPauseForm(true);
            break;
        case Actions.Resume:
            // Handle Resume action
            break;
    }
    e.stopPropagation();
    // Placeholder function to avoid errors
}

    const CardButtonMapping = {
        [Status.Pending]: [Actions.Start, Actions.Edit, Actions.Delete],
        [Status.InProgress]: [Actions.Done, Actions.Edit, Actions.Pause, Actions.Delete],
        [Status.Paused]: [Actions.Resume, Actions.Edit, Actions.Delete],
        [Status.Completed]: [Actions.ReOpen, Actions.Edit, Actions.Delete],
    };

    const onChangeStatus = (id: string, newStatus: Status) => {
        // Placeholder function to avoid errors
    }

    const renderButton = (action: Actions, ActionButtonConfig: ActionButtonConfig) => {
        return (
            <Button
                variant={ActionButtonConfig.variant}
                size={ActionButtonConfig.size}
                color={ActionButtonConfig.color}
                onClick={(e) =>
                    // onFooterButtonClick(e, action, task)
                    ActionButtonConfig.onClick(e, task, taskStore)
                }
            >   
                {ActionButtonConfig.label}
            </Button>
        );
    }

   
    return (
        <div>
            {CardButtonMapping[status].map((action) => (
                <span key={action} style={{marginRight: '8px'}}>
                    {renderButton(action, actionsButtonConfig[action])}
                </span>
            ))}
            <TaskPause pauseOpen={showTaskPauseModal} setPauseOpen={setShowTaskPauseModal} />
            <AddEditTask action="edit" id={task.id} status={task.status} />
        </div>
    );
}

export default FooterButton;