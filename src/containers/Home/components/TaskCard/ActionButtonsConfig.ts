 import { Actions } from "../../model";
 export type ActionButtonConfig = {
     variant: 'text' | 'outlined' | 'contained';
     size: 'small' | 'medium' | 'large';
     label: string;
     color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
     onClick: (e: React.MouseEvent) => void;
 };


 const actionsButtonConfig: Record<Actions, ActionButtonConfig> = {
            [Actions.Start]: {
                variant: 'contained',
                size: 'small',
                label: 'Start',
                color: 'success',
                onClick: (e: React.MouseEvent) => { e.stopPropagation();},
            },
            [Actions.Edit]: {
                variant: 'contained',
                size: 'small',
                label: 'Edit',
                color: 'secondary',
                onClick: (e: React.MouseEvent) => { e.stopPropagation(); }
            },
            [Actions.Delete]: {
                variant: 'contained',
                size: 'small',
                label: 'Delete',
                color: 'error',
                onClick: (e: React.MouseEvent) => { e.stopPropagation();}
            },
            [Actions.ReOpen]: {
                variant: 'contained',
                size: 'small',
                label: 'Re-open',
                color: 'warning',
                onClick: (e: React.MouseEvent) => { e.stopPropagation(); },
            },
            [Actions.Done]: {
                variant: 'contained',
                size: 'small',
                label: 'Done',
                color: 'success',
                onClick: (e: React.MouseEvent) => { e.stopPropagation();  },
            },
            [Actions.Pause]: {
                variant: 'contained',
                size: 'small',
                label: 'Pause',
                color: 'warning',
                onClick: (e: React.MouseEvent) => { e.stopPropagation(); },
            },
            [Actions.Resume]: {
                variant: 'contained',
                size: 'small',
                label: 'Resume',
                color: 'success',
                onClick: (e: React.MouseEvent) => { e.stopPropagation(); },
            }
    }

    export default actionsButtonConfig;