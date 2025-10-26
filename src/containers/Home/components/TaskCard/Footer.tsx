import React, { useMemo, useState } from 'react';
import Typography from '../../../../components/ui/Typography';
import { Status, TaskData } from '../../model';
import Button from './../../../../components/ui/Button';
import FooterButton from './FooterButton';

type FooterProps = {
  dueDateTime: string | null;
  status: Status;
  pauses: number[];
  task: TaskData
};

const Footer = ({ dueDateTime, status, pauses, task }: FooterProps) => {
    const { HelperText, ErrorText, SuccessText } = Typography;
    const [trackedSeconds, setTrackedSeconds] = useState(16);

    // const secondsLeft = useMemo(() => {
    //     if (!dueDateTime) return null;
    //     // dueDate expected YYYY-MM-DD, dueTime expected HH:MM
    //     const dParts = dueDateTime.split('-').map((p) => parseInt(p, 10));
    //     const tParts = dueDateTime.split(':').map((p) => parseInt(p, 10));
    //     if (dParts.length !== 3 || tParts.length < 2 || Number.isNaN(dParts[0]) || Number.isNaN(tParts[0])) return null;
    //     const due = new Date(dParts[0], dParts[1] - 1, dParts[2], tParts[0], tParts[1], 0);
    //     const now = new Date();
    //     const diffSec = Math.round((due.getTime() - now.getTime()) / 1000); // seconds
    //     return diffSec;
    // }, [dueDate, dueTime]);

    const secondsLeft = 0;

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
            case Status.Paused:
                return <SuccessText>Worked: {formatUpFromSeconds(trackedSeconds)}</SuccessText>;
            default:
                return '';
        }
    }

  return (
    <>
        <div>
         {pauses.length > 0 && <Button color='secondary' variant='text' style={{ padding: 0}} >Paused 10 times</Button>}
            { statusString() }
        </div>
        <div style={{display: 'flex', gap: '16px'}}>
            <div style={{display: 'flex', gap: '4px'}}>
                <HelperText>Due date:</HelperText>
                <HelperText>{dueDateTime ?? 'Not set'}</HelperText>
            </div>
            <div style={{display: 'flex', gap: '4px'}}>
               <HelperText>Due time:</HelperText>
               <HelperText>{dueDateTime ?? 'Not set'}</HelperText>
            </div>
        </div>
        <div style={{marginTop: '24px'}}>
            <FooterButton status={status} task={task} />
        </div>
    </>
  );
};

export default Footer;