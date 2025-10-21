import React, { useMemo, useState } from 'react';
import Typography from '../../../../components/ui/Typography';
import { Status } from '../../model';
import Button from './../../../../components/ui/Button';
import FooterButton from './FooterButton';

type FooterProps = {
  dueDate: string | undefined;
  dueTime: string | undefined;
  status: Status;
};

const Footer = ({ dueDate, dueTime, status }: FooterProps) => {
    const { HelperText, ErrorText, SuccessText } = Typography;
    const [trackedSeconds, setTrackedSeconds] = useState(16);

    const secondsLeft = useMemo(() => {
        if (!dueDate || !dueTime) return null;
        // dueDate expected YYYY-MM-DD, dueTime expected HH:MM
        const dParts = dueDate.split('-').map((p) => parseInt(p, 10));
        const tParts = dueTime.split(':').map((p) => parseInt(p, 10));
        if (dParts.length !== 3 || tParts.length < 2 || Number.isNaN(dParts[0]) || Number.isNaN(tParts[0])) return null;
        const due = new Date(dParts[0], dParts[1] - 1, dParts[2], tParts[0], tParts[1], 0);
        const now = new Date();
        const diffSec = Math.round((due.getTime() - now.getTime()) / 1000); // seconds
        return diffSec;
    }, [dueDate, dueTime]);


  const formatDurationFromSeconds = (sec: number | null): React.ReactNode => {
    if (sec === null) return 'Due: not set';
    const isNegative = sec < 0;
    const abs = Math.abs(sec);
    const hrs = Math.floor(abs / 3600);
    const mins = Math.floor((abs % 3600) / 60);
    if (hrs > 0) {
      return (
        <div style={{ display: 'flex', gap: '4px' }}>
          {isNegative ? <ErrorText>Overdue </ErrorText> : <SuccessText>Due in </SuccessText>}
          {isNegative ? <ErrorText>{hrs}h {mins}m</ErrorText> : <SuccessText>{hrs}h {mins}m</SuccessText>}
        </div>
      );
    }
    return (
      <>
        {isNegative ? <ErrorText>Overdue </ErrorText> : <SuccessText>Due in </SuccessText>}
        {isNegative ? <ErrorText>{mins}m</ErrorText> : <SuccessText>{mins}m</SuccessText>}
      </>
    );
  }
    

    const formatUpFromSeconds = (sec: number) => {
        const abs = Math.abs(sec);
        const hrs = Math.floor(abs / 3600);
        const mins = Math.floor((abs % 3600) / 60);
        if (hrs > 0) return `${hrs}h ${mins}m`;
        return `${mins}m`;
    }

  const statusString = (): React.ReactNode => {
        switch (status) {
            case Status.Pending:
                if(secondsLeft === null) return <ErrorText>Due date not set</ErrorText>;
                return formatDurationFromSeconds(secondsLeft);
            case Status.InProgress:
                return <SuccessText>Working time {formatUpFromSeconds(trackedSeconds)}</SuccessText>;
            case Status.Cancelled:
                return <SuccessText>Worked: {formatUpFromSeconds(trackedSeconds)}</SuccessText>;
            default:
                return '';
        }
    }

    const onChangeStatus = (id: string, newStatus: Status) => {
        // Placeholder function to avoid errors
    }
    
    const onEdit = (task: any) => {
    }

    const onDelete = (id: string) => {
        // Placeholder function to avoid errors
    }

    const setPauseOpen = (val: boolean) => {
        // Placeholder function to avoid errors
    }

    // const footerButtons = (): React.ReactNode => {
    //     switch (status) {
    //         case Status.Pending:
    //             return (
    //                 <div style={{display: 'flex', gap: '8px'}}>
    //                     <Button variant="contained" size="small" color="info" onClick={(e) => { e.stopPropagation(); onChangeStatus('1', Status.InProgress); }}>
    //                         Start
    //                     </Button>
    //                     <Button variant="contained" size="small" color="secondary" onClick={(e) => { e.stopPropagation(); onEdit("task"); }}>Edit</Button>
    //                     <Button variant="contained" size="small" color="error" onClick={(e) => { e.stopPropagation(); onDelete("task.id"); }}>Delete</Button>
    //                 </div>
    //             );
    //         case Status.InProgress:
    //             return (
    //                 <div style={{display: 'flex', gap: '8px'}}>
    //                    <Button variant="contained" size="small" color="success" onClick={(e) => { e.stopPropagation(); onChangeStatus("id", Status.Done); }}>Done</Button>
    //                    <Button variant="contained" size="small" color="warning" type="button" onClick={(e) => { e.stopPropagation(); setPauseOpen(true); }}>Pause</Button>
    //                    <Button variant="contained" size="small" color="secondary" onClick={(e) => { e.stopPropagation(); onEdit("task"); }}>Edit</Button>
    //                    <Button variant="contained" size="small" color="error" onClick={(e) => { e.stopPropagation(); onDelete("task"); }}>Delete</Button>
    //                 </div>
    //             );
    //         case Status.Cancelled:
    //             return (
    //                <>
    //                <div style={{display: 'flex', gap: '8px'}}>
    //                                <Button variant="contained" color="success" size="small" onClick={(e) => { e.stopPropagation(); onChangeStatus("", Status.InProgress); }}>Resume</Button>
    //                                <Button variant="contained" color="secondary" size="small" onClick={(e) => { e.stopPropagation(); onEdit("task"); }}>Edit</Button>
    //                                <Button variant="contained" color="error" size="small" onClick={(e) => { e.stopPropagation(); onDelete("task.id"); }}>Delete</Button>

    //                 </div>
    //                 </>
    //             );

    //         case Status.Done:
    //             return (
    //                 <div style={{display: 'flex', gap: '8px'}}>
    //                                     <Button variant="contained" color="warning" size="small" onClick={(e) => { e.stopPropagation(); onChangeStatus("td", Status.Pending); }}>Re-open</Button>
    //                                     <Button variant="contained" color="secondary" size="small" onClick={(e) => { e.stopPropagation(); onEdit("task"); }}>Edit</Button>
    //                                     <Button variant="contained" color="error" size="small" onClick={(e) => { e.stopPropagation(); onDelete("task.id"); }}>Delete</Button>
    //                 </div>
    //             );
    //         default:
    //             return null;
    //     }
    // }

  return (
    <>
        <div>
            { statusString() }
        </div>
        <div style={{display: 'flex', gap: '16px'}}>
            <div style={{display: 'flex', gap: '4px'}}>
                <HelperText>Due date:</HelperText>
                <HelperText>{dueDate ?? 'Not set'}</HelperText>
            </div>
            <div style={{display: 'flex', gap: '4px'}}>
               <HelperText>Due time:</HelperText>
               <HelperText>{dueTime ?? 'Not set'}</HelperText>
            </div>
        </div>
        <div style={{marginTop: '24px'}}>
            <FooterButton status={status} />
        </div>
    </>
  );
};

export default Footer;