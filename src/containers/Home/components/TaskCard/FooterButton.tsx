import React from 'react';
import { Status, Actions } from '../../model';
import Button from './../../../../components/ui/Button';
import { ActionButtonConfig } from './ActionButtonsConfig';
import actionsButtonConfig from './ActionButtonsConfig';

type FooterButtonProps = {
    status: Status;
};


const FooterButton = ({status}: FooterButtonProps) => {
    const CardButtonMapping = {
        [Status.Pending]: [Actions.Start, Actions.Edit, Actions.Delete],
        [Status.InProgress]: [Actions.Done, Actions.Edit, Actions.Pause, Actions.Delete],
        [Status.Cancelled]: [Actions.Resume, Actions.Edit, Actions.Delete],
        [Status.Done]: [Actions.ReOpen, Actions.Edit, Actions.Delete],
    };

    const onChangeStatus = (id: string, newStatus: Status) => {
        // Placeholder function to avoid errors
    }

    const renderButton = (ActionButtonConfig: ActionButtonConfig) => {
        return (
            <Button
                variant={ActionButtonConfig.variant}
                size={ActionButtonConfig.size}
                color={ActionButtonConfig.color}
                onClick={ActionButtonConfig.onClick}
            >
                {ActionButtonConfig.label}
            </Button>
        );
    }

   
    return (
        <div>
            {CardButtonMapping[status].map((action) => (
                <span key={action} style={{marginRight: '8px'}}>
                    {renderButton(actionsButtonConfig[action])}
                </span>
            ))}
        </div>
    );
}

export default FooterButton;