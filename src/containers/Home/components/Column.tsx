import React, { useState, useRef, useLayoutEffect } from 'react';
import { TodoTask, Status } from '../model';
import Card from './Card';
import { capturePositions, consumePrevRects } from '../flipStore';

type ColumnProps = {
  title: string;
  status: Status | null; // null means show all
  tasks: TodoTask[];
  onChangeStatus: (id: string, status: Status, insertIndex?: number) => void;
  onEdit: (task: TodoTask) => void;
  onDelete: (id: string) => void;
};

export default function Column({ title, status, tasks, onChangeStatus, onEdit, onDelete }: ColumnProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const items = status ? tasks.filter((t) => t.status === status) : tasks;
  // refs for FLIP animation
  const wrappersRef = useRef<Map<string, HTMLElement>>(new Map());
  const prevRectsRef = useRef<Map<string, DOMRect>>(new Map());

  useLayoutEffect(() => {
    // consume previous rects captured before DOM update (so removals can animate)
    const prevRects = consumePrevRects();
    const newRects = new Map<string, DOMRect>();
    wrappersRef.current.forEach((el, id) => {
      try {
        newRects.set(id, el.getBoundingClientRect());
      } catch (e) {
        // ignore
      }
    });

    // compute deltas and apply FLIP transforms using prevRects
    prevRects.forEach((prevRect, id) => {
      const el = wrappersRef.current.get(id);
      const newRect = newRects.get(id);
      if (!el || !newRect) return;
      const deltaY = prevRect.top - newRect.top;
      if (Math.abs(deltaY) < 0.5) return;
      el.style.transition = 'none';
      el.style.transform = `translateY(${deltaY}px)`;
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.getBoundingClientRect();
      requestAnimationFrame(() => {
        el.style.transition = '';
        el.style.transform = '';
      });
    });

    // save current rects for next update
    prevRectsRef.current = newRects;
  }, [items]);

  return (
    <div className="column" data-column-title={title}>
      <div
        className={`column-inner ${collapsed ? 'collapsed' : ''} ${dragOverIndex !== null ? 'dragging' : ''}`}
        onDragEnter={() => {
          // capture current positions for FLIP before potential DOM changes
          try {
            capturePositions();
          } catch (e) {
            // ignore
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';

          // compute hover index and set placeholder
          try {
            const columnBody = (e.currentTarget as HTMLElement).querySelector('.column-body');
            if (columnBody) {
              // get wrappers in DOM order and exclude the dragged card (if any)
              const wrappers = Array.from(columnBody.querySelectorAll('.card-wrapper')) as HTMLElement[];
              let draggedId = '';
              try {
                draggedId = e.dataTransfer.getData('text/plain') || '';
              } catch (ex) {
                /* ignore */
              }
              // fallback to global id set on dragstart
              try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (!draggedId && typeof window !== 'undefined') draggedId = window.__draggingTaskId || '';
              } catch (ex) {
                // ignore
              }
              const visible = draggedId ? wrappers.filter((w) => w.dataset.taskId !== draggedId) : wrappers;
              const y = e.clientY;
              let insertIndex = visible.findIndex((c) => {
                const r = c.getBoundingClientRect();
                return y < r.top + r.height / 2;
              });
              if (insertIndex === -1) insertIndex = visible.length;

              // if this column is the origin and computed slot equals origin index, don't show placeholder
              if (draggedId) {
                const originIndex = items.findIndex((t) => t.id === draggedId);
                if (originIndex !== -1 && originIndex === insertIndex) {
                  // user hasn't moved far enough; hide placeholder
                  insertIndex = -1;
                }
              }

              // only update if changed to reduce re-renders
              if (insertIndex !== dragOverIndex) setDragOverIndex(insertIndex);
            }
          } catch (err) {
            // ignore
          }
        }}
        onDragLeave={(e) => {
          // clear placeholder when leaving the column entirely
          const related = e.relatedTarget as Node | null;
          if (!related || !(e.currentTarget as HTMLElement).contains(related)) {
            setDragOverIndex(null);
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          try {
            const id = e.dataTransfer.getData('text/plain');
            if (id && status !== null) {
              // if column was collapsed, expand so user sees result
              if (collapsed) setCollapsed(false);

              // compute drop index by comparing mouse Y to card centers
              const columnBody = (e.currentTarget as HTMLElement).querySelector('.column-body');
              let insertIndex: number | undefined = undefined;
              if (columnBody) {
                // use wrappers in DOM order and exclude the dragged element so calculation
                // isn't influenced by the still-present dragged card
                const wrappers = Array.from(columnBody.querySelectorAll('.card-wrapper')) as HTMLElement[];
                const visible = wrappers.filter((w) => w.dataset.taskId !== id);
                const y = e.clientY;
                insertIndex = visible.findIndex((c) => {
                  const r = c.getBoundingClientRect();
                  return y < r.top + r.height / 2;
                });
                if (insertIndex === -1) insertIndex = visible.length;
              }

              // if dropping into the same column, we should reorder without changing status
              try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const srcColumn = window.__draggingSrcColumn as string | undefined;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const srcIndex = typeof window.__draggingSrcIndex === 'number' ? window.__draggingSrcIndex : undefined;
                if (srcColumn === title && typeof srcIndex === 'number') {
                  // reorder within same column
                  capturePositions();
                  onChangeStatus(id, status, insertIndex);
                } else {
                  // moving between columns: update status and insert at index
                  capturePositions();
                  onChangeStatus(id, status, insertIndex);
                }
              } catch (ex) {
                // fallback
                onChangeStatus(id, status, insertIndex);
              }

              // clear placeholder
              setDragOverIndex(null);
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
          {!collapsed && (
            // render cards with optional placeholder at dragOverIndex
            <>
              {items.map((task, idx) => (
                <React.Fragment key={task.id}>
                  {dragOverIndex === idx ? <div className="card placeholder" /> : null}
                  <div
                    className="card-wrapper"
                    data-task-id={task.id}
                    ref={(el) => {
                      if (el) wrappersRef.current.set(task.id, el);
                      else wrappersRef.current.delete(task.id);
                    }}
                    style={{
                      transform: dragOverIndex !== null && idx >= dragOverIndex ? 'translateY(68px)' : undefined,
                    }}
                  >
                    <Card
                      task={task}
                      onChangeStatus={onChangeStatus}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      // expose drag metadata by writing to window in drag handlers inside Card
                    />
                   </div>
                 </React.Fragment>
               ))}

              {dragOverIndex !== null && dragOverIndex === items.length ? <div className="card placeholder" /> : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
