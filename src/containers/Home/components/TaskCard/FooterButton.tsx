import React from 'react';
import { Status, Actions } from '../../model';
import Button from './../../../../components/ui/Button';

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

    const renderButtons = (action: Actions) => {
        switch (action) {
            case Actions.Start:
                return(
                    <Button variant="contained" size="small" color="success" onClick={(e) => { e.stopPropagation(); onChangeStatus('1', Status.InProgress); }}>
                            Start
                    </Button>
                )
            case Actions.Edit:
                return (
                    <Button variant="contained" size="small" color="secondary" onClick={(e) => { e.stopPropagation(); onChangeStatus('1', Status.InProgress); }}>
                        Edit
                    </Button>
                );
            case Actions.Delete:
                return (
                    <Button variant="contained" size="small" color="error" onClick={(e) => { e.stopPropagation(); onChangeStatus('1', Status.InProgress); }}>
                        Delete
                    </Button>
                );
            case Actions.ReOpen:
                return (
                    <Button variant="contained" size="small" color="warning" onClick={(e) => { e.stopPropagation(); onChangeStatus('1', Status.InProgress); }}>
                        ReOpen
                    </Button>
                );
            case Actions.Done:
                return (
                    <Button variant="contained" size="small" color="success" onClick={(e) => { e.stopPropagation(); onChangeStatus('1', Status.InProgress); }}>
                        Done
                    </Button>
                );
            case Actions.Pause:
                return (
                    <Button variant="contained" size="small" color="warning" onClick={(e) => { e.stopPropagation(); onChangeStatus('1', Status.InProgress); }}>
                        Pause
                    </Button>
                );
            case Actions.Resume:
                return (
                    <Button variant="contained" size="small" color="success" onClick={(e) => { e.stopPropagation(); onChangeStatus('1', Status.InProgress); }}>
                        Resume
                    </Button>
                );
            default:
                return '';
        }
    }
    return (
        <div>
            {CardButtonMapping[status].map((action) => (
                <span key={action} style={{marginRight: '8px'}}>
                    {renderButtons(action)}
                </span>
            ))}
        </div>
    );
}

export default FooterButton;