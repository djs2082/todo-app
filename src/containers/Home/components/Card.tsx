import React, { useEffect, useState } from 'react';
import { TaskData, Status, Priority } from '../model';
import Button from './Button';
import Modal from './Modal';

// helper types for pauses
type PauseEntry = {
  reason: string;
  progress: number;
  comment?: string;
  at: string; // ISO string
};

type CardProps = {
  task: TaskData;
};

export default function Card({ task }: CardProps) {
  const priorityClass =
    task.priority === Priority.Low
      ? 'card--low'
      : task.priority === Priority.Medium
      ? 'card--medium'
      : 'card--high';

  // status class overrides accent for certain statuses
  let statusClass = '';
  if (task.status === Status.Pending) statusClass = 'card--status-todo';
  else if (task.status === Status.Paused) statusClass = 'card--status-paused';
  else if (task.status === Status.Completed) statusClass = 'card--status-done';

  const truncate = (s?: string, n = 50) => {
    if (!s) return '';
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  };

  // live seconds until due (positive) or overdue (negative)
  // const [secondsLeft, setSecondsLeft] = useState<number | null>(() => computeSecondsLeft(task.dueDate, task.dueTime));

  // useEffect(() => {
  //   setSecondsLeft(computeSecondsLeft(task.due_date_time, task.dueTime));
  //   const t = setInterval(() => setSecondsLeft(computeSecondsLeft(task.dueDate, task.dueTime)), 1000);
  //   return () => clearInterval(t);
  // }, [task.dueDate, task.dueTime]);

  function computeSecondsLeft(dueDate?: string, dueTime?: string): number | null {
    if (!dueDate || !dueTime) return null;
    // dueDate expected YYYY-MM-DD, dueTime expected HH:MM
    const dParts = dueDate.split('-').map((p) => parseInt(p, 10));
    const tParts = dueTime.split(':').map((p) => parseInt(p, 10));
    if (dParts.length !== 3 || tParts.length < 2 || Number.isNaN(dParts[0]) || Number.isNaN(tParts[0])) return null;
    const due = new Date(dParts[0], dParts[1] - 1, dParts[2], tParts[0], tParts[1], 0);
    const now = new Date();
    const diffSec = Math.round((due.getTime() - now.getTime()) / 1000); // seconds
    return diffSec;
  }

  // tracked work time in seconds (persisted to localStorage per task)
  const lsKey = `worktime_${task.id}`;
  const [trackedSeconds, setTrackedSeconds] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(lsKey);
      return raw ? parseInt(raw, 10) || 0 : 0;
    } catch (e) {
      return 0;
    }
  });

  // keep interval id in a ref so we can always clear the same timer
  const intervalRef = React.useRef<number | null>(null);
  
  // eslint-disable-next-line
  useEffect(() => {
    // load when task.id changes (new card)
    try {
      const raw = localStorage.getItem(lsKey);
      setTrackedSeconds(raw ? parseInt(raw, 10) || 0 : 0);
    } catch (e) {
      setTrackedSeconds(0);
    }

    // ensure we don't leave a stray interval when switching cards
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [lsKey, task.id]);

  // start/stop interval based on status; use a ref so it's reliably cleared
  useEffect(() => {
    if (task.status === Status.InProgress) {
      // only create if there's not already one
      if (intervalRef.current === null) {
        intervalRef.current = window.setInterval(() => {
          setTrackedSeconds((s) => s + 1);
        }, 1000) as unknown as number;
      }
    } else {
      // not in progress -> clear any running timer
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // cleanup on unmount / before next run
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [task.status, task.id]);

  // persist trackedSeconds whenever it changes so we don't rely on closures during cleanup
  useEffect(() => {
    try {
      localStorage.setItem(lsKey, String(trackedSeconds));
    } catch (e) {
    }
  }, [lsKey, trackedSeconds]);

  // save on unmount too (harmless with the above persistence)
  useEffect(() => {
    return () => {
      try {
        localStorage.setItem(lsKey, String(trackedSeconds));
      } catch (e) {
        // ignore
      }
    };
  }, [lsKey, trackedSeconds]);

  function formatDurationFromSeconds(sec: number) {
    const isNegative = sec < 0;
    const abs = Math.abs(sec);
    const hrs = Math.floor(abs / 3600);
    const mins = Math.floor((abs % 3600) / 60);
    if (hrs > 0) return `${isNegative ? 'Overdue ' : 'Due in '}${hrs}h ${mins}m`;
    return `${isNegative ? 'Overdue ' : 'Due in '}${mins}m`;
  }

  function formatUpFromSeconds(sec: number) {
    const abs = Math.abs(sec);
    const hrs = Math.floor(abs / 3600);
    const mins = Math.floor((abs % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  }

  // Pause modal state
  const [pauseOpen, setPauseOpen] = useState(false);
  const [pauseReason, setPauseReason] = useState('');
  const [pauseProgress, setPauseProgress] = useState<number | ''>('');
  const [pauseComment, setPauseComment] = useState('');

  // Details and pauses state
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [pausesOpen, setPausesOpen] = useState(false);
  const [pauseDetailsOpen, setPauseDetailsOpen] = useState(false);
  const [selectedPause, setSelectedPause] = useState<PauseEntry | null>(null);
  const [pauses, setPauses] = useState<PauseEntry[]>([]);

  const pausesKey = `pauses_${task.id}`;
  const legacyPauseKey = `pause_${task.id}`;

  const loadPauses = (): PauseEntry[] => {
    try {
      const raw = localStorage.getItem(pausesKey);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return arr as PauseEntry[];
      }
      const legacy = localStorage.getItem(legacyPauseKey);
      if (legacy) {
        const obj = JSON.parse(legacy);
        if (obj && typeof obj === 'object') return [obj as PauseEntry];
      }
    } catch (e) {
      /* ignore */
    }
    return [];
  };

  useEffect(() => {
    setPauses(loadPauses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.id]);

  // preload any last saved pause info when opening
  useEffect(() => {
    if (!pauseOpen) return;
    const all = loadPauses();
    setPauses(all);
    const last = all[all.length - 1];
    if (last) {
      setPauseReason(last.reason || '');
      setPauseProgress(typeof last.progress === 'number' ? last.progress : '');
      setPauseComment(last.comment || '');
    } else {
      setPauseReason('');
      setPauseProgress('');
      setPauseComment('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseOpen]);

  const savePauseAndCancel = () => {
    const prog = typeof pauseProgress === 'number' ? pauseProgress : parseFloat(String(pauseProgress));
    const bounded = Number.isFinite(prog) ? Math.max(0, Math.min(100, Math.round(prog))) : 0;
    const payload: PauseEntry = {
      reason: pauseReason.trim(),
      progress: bounded,
      comment: pauseComment.trim(),
      at: new Date().toISOString(),
    };
    try {
      const existing = loadPauses();
      const next = [...existing, payload];
      localStorage.setItem(pausesKey, JSON.stringify(next));
      // keep legacy key updated with latest for compatibility
      localStorage.setItem(legacyPauseKey, JSON.stringify(payload));
      setPauses(next);
    } catch (e) {
      // ignore storage errors
    }
    setPauseOpen(false);
    // onChangeStatus(task.id, Status.Paused);
  };

  const formatDateTime = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  const prettyPriority = (p: Priority) => ({ low: 'Low', medium: 'Medium', high: 'High' }[p]);
  const prettyStatus = (s: Status) => ({ pending: 'Pending', in_progress: 'In Progress', completed: 'Completed', paused: 'Paused' }[s]);

  return (
    <>
      <div
        className={`card ${priorityClass} ${statusClass}`}
        draggable={true}
        onClick={() => setDetailsOpen(true)}
        onDragStart={(e) => {
          // e.dataTransfer.setData('text/plain', task.id);
          e.dataTransfer.effectAllowed = 'move';
          try {
            // global fallback for browsers/events where dataTransfer isn't available during dragover
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.__draggingTaskId = task.id;
            // also record source column and index (the column code sets data-task-id on wrappers)
            try {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const wrapper = document.querySelector(`.card-wrapper[data-task-id="${task.id}"]`);
              if (wrapper) {
                // get column title from ancestor
                const col = wrapper.closest('.column');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.__draggingSrcColumn = col ? (col.querySelector('.column-header div')?.textContent || '') : '';
                // compute index among siblings
                const siblings = Array.from(wrapper.parentElement?.querySelectorAll('.card-wrapper') || []) as HTMLElement[];
                // const idx = siblings.findIndex((s) => s.dataset.taskId === task.id);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.__draggingSrcIndex = idx;
              }
            } catch (err) {
              // ignore
            }
          } catch (err) {
            // ignore
          }
          // add a class so CSS can style the dragged element if needed
          try {
            (e.currentTarget as HTMLElement)?.classList.add('dragged');
          } catch (err) {
            // ignore
          }
        }}
        onDragEnd={() => {
          try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.__draggingTaskId = undefined;
          } catch (err) {
            // ignore
          }
          try {
            // remove dragged class
            const el = document.querySelector('.card.dragged') as HTMLElement | null;
            if (el) el.classList.remove('dragged');
          } catch (err) {
            // ignore
          }
        }}
      >
        <div className="card-main">
          {/* Top row: priority + title (left), due date/time (right) */}
          {/* First row: title */}
          <div className="card-top">
            <span className="priority-badge">{task.priority}</span>
            <span className="card-title" title={task.title}>{truncate(task.title, 50)}</span>
          </div>

          {/* Second row: description (trim to 100 chars) */}
          {task.description ? (
            <div className="card-desc" title={task.description}>{truncate(task.description, 100)}</div>
          ) : null}

          {/* Third row: due date and time */}
          {/* <div className="card-datetime">
            <div className="datetime-group">
              <span className="datetime-label">Due date:</span>
              <span className="datetime-value">{task.dueDate ?? 'Not set'}</span>
            </div>
            <div className="datetime-group">
              <span className="datetime-label">Due time:</span>
              <span className="datetime-value">{task.dueTime ?? 'Not set'}</span>
            </div>
          </div> */}

          {/* Paused count above actions */}
          {pauses.length > 0 && (
            <div className="card-paused" style={{ marginTop: 8 }}>
              <button
                type="button"
                className="status-pill"
                title={`View all pauses (${pauses.length})`}
                onClick={(e) => { e.stopPropagation(); setPausesOpen(true); }}
                style={{ cursor: 'pointer' }}
              >
                Paused {pauses.length} {pauses.length === 1 ? 'time' : 'times'}
              </button>
            </div>
          )}

          {/* Fourth row: actions */}
          <div className="card-actions">
            {/* left: due-in timer for Pending (only) */}
            {/* {task.status === Status.Pending && (
              <div className={`due-in ${secondsLeft !== null && secondsLeft < 0 ? 'overdue' : ''}`}>
                {secondsLeft === null ? 'Due: not set' : formatDurationFromSeconds(secondsLeft)}
              </div>
            )} */}

            {/* working time (live while InProgress, shown as Worked when paused) */}
            {(task.status === Status.InProgress || task.status === Status.Paused) && (
              <div className={`working-time ${task.status === Status.Paused ? 'worked' : ''}`}>
                {task.status === Status.InProgress ? `Working time ${formatUpFromSeconds(trackedSeconds)}` : `Worked: ${formatUpFromSeconds(trackedSeconds)}`}
              </div>
            )}

            <div className="actions-right">
             {/* Buttons depend on status */}
            {/* {task.status === Status.Pending && (
              <>
                <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); onChangeStatus(task.id, Status.InProgress); }} aria-label={`Start ${task.title}`}>
                  Start
                </Button>
                 <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(task); }}>Edit</Button>
                 <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>Delete</Button>
               </>
             )}

            {task.status === Status.Paused && (
              <>
                <Button variant="success" size="sm" onClick={(e) => { e.stopPropagation(); onChangeStatus(task.id, Status.InProgress); }}>Resume</Button>
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(task); }}>Edit</Button>
                <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>Delete</Button>
              </>
            )}

            {task.status === Status.InProgress && (
              <>
                <Button variant="success" size="sm" onClick={(e) => { e.stopPropagation(); onChangeStatus(task.id, Status.Completed); }}>Done</Button>
                <Button variant="muted" size="sm" type="button" onClick={(e) => { e.stopPropagation(); setPauseOpen(true); }}>Pause</Button>
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(task); }}>Edit</Button>
                <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>Delete</Button>
              </>
            )}

            {task.status === Status.Completed && (
              <>
                 <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onChangeStatus(task.id, Status.Pending); }}>Re-open</Button>
                 <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(task); }}>Edit</Button>
                 <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>Delete</Button>
               </>
             )} */}
            </div>
           </div>
         </div>
       </div>

       {/* Pause Modal - render outside the card */}
       <Modal isOpen={pauseOpen} title="Pause task" onClose={() => setPauseOpen(false)}>
         <form
           onSubmit={(e) => {
             e.preventDefault();
             savePauseAndCancel();
           }}
           style={{ display: 'grid', gap: 12 }}
         >
           <label style={{ display: 'grid', gap: 6 }}>
             <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Reason</span>
             <textarea
               value={pauseReason}
               onChange={(e) => setPauseReason(e.target.value)}
               placeholder="Why are you pausing this task?"
               rows={4}
               style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb', resize: 'vertical' }}
               required
             />
           </label>
           <label style={{ display: 'grid', gap: 6 }}>
             <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Progress (%)</span>
             <input
               type="number"
               min={0}
               max={100}
               value={pauseProgress}
               onChange={(e) => {
                 const v = e.target.value;
                 setPauseProgress(v === '' ? '' : Number(v));
               }}
               placeholder="0 - 100"
               style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}
               required
             />
           </label>
           <label style={{ display: 'grid', gap: 6 }}>
             <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Progress comment</span>
             <textarea
               value={pauseComment}
               onChange={(e) => setPauseComment(e.target.value)}
               placeholder="Add any details about current progress"
               rows={3}
               style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb', resize: 'vertical' }}
             />
           </label>
           <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
             <Button variant="ghost" size="sm" onClick={() => setPauseOpen(false)} type="button">Cancel</Button>
             <Button variant="primary" size="sm" type="submit">Save & Pause</Button>
           </div>
         </form>
       </Modal>

       {/* Details Modal */}
  
       {/* Pauses list Modal */}
       <Modal isOpen={pausesOpen} title="Pauses" onClose={() => setPausesOpen(false)}>
         {pauses.length === 0 ? (
           <div>No pauses recorded.</div>
         ) : (
           <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
             {pauses.map((p, i) => (
               <li key={i}>
                 <button
                   onClick={() => { setSelectedPause(p); setPauseDetailsOpen(true); }}
                   style={{ width: '100%', textAlign: 'left', border: '1px solid #e5e7eb', borderRadius: 8, padding: 10, background: 'white', cursor: 'pointer' }}
                 >
                   <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                     <span><strong>{p.progress}%</strong> — {p.reason || 'No reason'}</span>
                     <span style={{ opacity: 0.7 }}>{formatDateTime(p.at)}</span>
                   </div>
                   {p.comment ? <div style={{ marginTop: 6, color: '#374151' }}>{p.comment}</div> : null}
                 </button>
               </li>
             ))}
           </ul>
         )}
       </Modal>

       {/* Single pause details Modal */}
       <Modal isOpen={pauseDetailsOpen} title="Pause details" onClose={() => setPauseDetailsOpen(false)}>
         {selectedPause ? (
           <div style={{ display: 'grid', gap: 8 }}>
             <div><strong>When:</strong> {formatDateTime(selectedPause.at)}</div>
             <div><strong>Progress:</strong> {selectedPause.progress}%</div>
             <div><strong>Reason:</strong> {selectedPause.reason || '—'}</div>
             {selectedPause.comment ? <div><strong>Comment:</strong> {selectedPause.comment}</div> : null}
           </div>
         ) : (
           <div>No pause selected.</div>
         )}
       </Modal>
     </>
  );
}
