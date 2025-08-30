import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import HomeViewModel from './viewModel';
import { TodoTask, Status } from './model';
import Column from './components/Column';
import Modal from './components/Modal';
import TimeClock from './components/TimeClock';

export default function Home(): React.ReactElement {
// eslint-disable-next-line
const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const vmRef = useRef<HomeViewModel | null>(null);
  const [snapshot, setSnapshot] = useState<TodoTask[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [form, setForm] = useState<any>({ id: undefined, title: '', description: '', priority: 'medium', dueDate: date, dueTime: '', status: 'pending' });

  useEffect(() => {
    if (!vmRef.current) vmRef.current = new HomeViewModel();
    const vm = vmRef.current;
    const unsubscribe = vm.subscribe(() => {
      setSnapshot(vm.getTasksForDate(date));
    });
    // initial snapshot
    setSnapshot(vm.getTasksForDate(date));
    return unsubscribe;
  }, [date]);

  function openNewTaskModal() {
    setForm({ id: undefined, title: '', description: '', priority: 'medium', dueDate: date, dueTime: '', status: 'pending' });
    setIsModalOpen(true);
    setIsTimeModalOpen(false);
  }

  function openEditTaskModal(task: TodoTask) {
    setForm({ id: task.id, title: task.title, description: task.description ?? '', priority: task.priority, dueDate: task.dueDate ?? date, dueTime: task.dueTime ?? '', status: task.status });
    setIsModalOpen(true);
    setIsTimeModalOpen(false);
  }

  function submitForm(e?: React.FormEvent) {
    e?.preventDefault();
    const vm = vmRef.current!;
    if (form.id) {
      vm.updateTask(form.id, {
        title: form.title,
        description: form.description,
        priority: form.priority,
        dueDate: form.dueDate,
        dueTime: form.dueTime,
        status: form.status,
      });
    } else {
      vm.addTask(date, {
        title: form.title,
        description: form.description,
        priority: form.priority,
        dueDate: form.dueDate,
        dueTime: form.dueTime,
        status: form.status,
      });
    }
    // refresh snapshot immediately so UI updates without waiting for subscription
    setSnapshot(vm.getTasksForDate(date));
    setIsModalOpen(false);
  }

  function deleteTodo(id: string) {
    const vm = vmRef.current!;
    vm.removeTask(id);
    setSnapshot(vm.getTasksForDate(date));
  }

  function changeStatus(id: string, status: Status, insertIndex?: number) {
    const vm = vmRef.current!;
    vm.updateTask(id, { status }, insertIndex);
    setSnapshot(vm.getTasksForDate(date));
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Remember your duty.</h1>
        <button type="button" onClick={openNewTaskModal} className="add-button">
          <span className="add-button-text">New Task</span>
          <span className="add-button-icon">+</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} title={form.id ? 'Edit Task' : 'Create Task'} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={submitForm} style={{ display: 'grid', gap: 12 }}>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" style={{ padding: 8, borderRadius: 6, border: '1px solid #e5e7eb' }} required />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={4} style={{ padding: 8, borderRadius: 6, border: '1px solid #e5e7eb' }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} style={{ padding: 8, borderRadius: 6 }}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} style={{ padding: 8, borderRadius: 6 }} />
            <div style={{ display: 'grid', gap: 6, flex: 1 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="time" value={form.dueTime} onChange={(e) => setForm({ ...form, dueTime: e.target.value })} style={{ padding: 8, borderRadius: 6, flex: 1 }} />
                <button type="button" onClick={() => setIsTimeModalOpen(true)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb' }}>
                  Pick time
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 12px', borderRadius: 6 }}>Cancel</button>
            <button type="submit" style={{ padding: '8px 12px', borderRadius: 6, background: '#2563eb', color: '#fff' }}>{form.id ? 'Save' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      {/* Time picker modal */}
      <Modal isOpen={isTimeModalOpen} title="Pick time" onClose={() => setIsTimeModalOpen(false)} maxWidth={380}>
        <div style={{ display: 'grid', gap: 10, justifyItems: 'center' }}>
          <TimeClock value={form.dueTime || '00:00'} onChange={(v) => setForm({ ...form, dueTime: v })} size={220} />
          <div style={{ textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
            <strong>{form.dueTime || '00:00'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, width: '100%' }}>
            <button type="button" onClick={() => setIsTimeModalOpen(false)} style={{ padding: '8px 12px', borderRadius: 6 }}>Done</button>
          </div>
        </div>
      </Modal>

      <div className="main-columns">
        <Column title="ToDo" status={Status.Pending} tasks={snapshot} onChangeStatus={changeStatus} onEdit={openEditTaskModal} onDelete={deleteTodo} />
        <Column title="Paused" status={Status.Cancelled} tasks={snapshot} onChangeStatus={changeStatus} onEdit={openEditTaskModal} onDelete={deleteTodo} />
        <Column title="In Progress" status={Status.InProgress} tasks={snapshot} onChangeStatus={changeStatus} onEdit={openEditTaskModal} onDelete={deleteTodo} />
        <Column title="Done" status={Status.Done} tasks={snapshot} onChangeStatus={changeStatus} onEdit={openEditTaskModal} onDelete={deleteTodo} />
      </div>

      <div className="todo-footer">

      </div>
    </div>
  );
}
