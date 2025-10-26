import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import HomeViewModel from './viewModel';
import { Status } from './model';
import Column from './components/Column';
import Modal from './components/Modal';
import { Button } from  '@karya_app1/rain-js';
import AddEditTask from './components/AddEditTask';
import { fetchTasks } from './api';
import useTaskStore from './store';
// Time format conversion utilities
const to12Hour = (time24: string): { hours: string, minutes: string, period: 'AM' | 'PM' } => {
  if (!time24 || time24 === '') return { hours: '12', minutes: '00', period: 'AM' };
  
  const [hours24, minutes] = time24.split(':');
  let hours = parseInt(hours24, 10);
  const period = hours >= 12 ? 'PM' : 'AM';
  
  if (hours === 0) hours = 12;
  if (hours > 12) hours = hours - 12;
  
  return { 
    hours: hours.toString().padStart(2, '0'), 
    minutes: minutes || '00', 
    period 
  };
};

const to24Hour = (hours: string, minutes: string, period: 'AM' | 'PM'): string => {
  let hours24 = parseInt(hours, 10);
  
  if (period === 'PM' && hours24 < 12) hours24 += 12;
  if (period === 'AM' && hours24 === 12) hours24 = 0;
  
  return `${hours24.toString().padStart(2, '0')}:${minutes}`;
};


export default function Home(): React.ReactElement {

  const taskStore = useTaskStore();
  const { tasks, addTasks, setShowAddTaskModal } = taskStore;
// eslint-disable-next-line
const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false);
  const vmRef = useRef<HomeViewModel | null>(null);
  // const [snapshot, setSnapshot] = useState<TodoTask[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Removed isTimeModalOpen and TimeClock modal
  const [form, setForm] = useState<any>({ id: undefined, title: '', description: '', priority: 'medium', dueDate: date, dueTime: '', status: 'pending' });
  // Derived time state for 12-hour format display
  const [timeState, setTimeState] = useState<{ hours: string, minutes: string, period: 'AM' | 'PM' }>({ hours: '12', minutes: '00', period: 'AM' });

  // useEffect(() => {
  //   if (!vmRef.current) vmRef.current = new HomeViewModel();
  //   const vm = vmRef.current;
  //   const unsubscribe = vm.subscribe(() => {
  //     setSnapshot(vm.getTasksForDate(date));
  //   });
  //   // initial snapshot
  //   setSnapshot(vm.getTasksForDate(date));
  //   return unsubscribe;
  // }, [date]);

  function openNewTaskModal() {
    setForm({ id: undefined, title: '', description: '', priority: 'medium', dueDate: date, dueTime: '', status: 'pending' });
    setTimeState({ hours: '12', minutes: '00', period: 'AM' });
    setIsModalOpen(true);
  // setIsTimeModalOpen(false); // removed
  }

  // function openEditTaskModal(task: TodoTask) {
  //   const dueTime = task.dueTime ?? '';
  //   setForm({ id: task.id, title: task.title, description: task.description ?? '', priority: task.priority, dueDate: task.dueDate ?? date, dueTime: dueTime, status: task.status });
  //   // Update time picker UI state when editing a task
  //   setTimeState(to12Hour(dueTime));
  //   setIsModalOpen(true);
  // // setIsTimeModalOpen(false); // removed
  // }

  useEffect(() => {
    async function fetchUserTasks() {
      const response = await fetchTasks({});
      if (response.data) {
        addTasks(response.data);
      }
    }
    fetchUserTasks();
  }, []);

  // function submitForm(e?: React.FormEvent) {
  //   e?.preventDefault();
  //   const vm = vmRef.current!;
  //   if (form.id) {
  //     vm.updateTask(form.id, {
  //       title: form.title,
  //       description: form.description,
  //       priority: form.priority,
  //       dueDate: form.dueDate,
  //       dueTime: form.dueTime,
  //       status: form.status,
  //     });
  //   } else {
  //     // addTask is async now (will attempt remote create when authenticated)
  //     vm.addTask(date, {
  //       title: form.title,
  //       description: form.description,
  //       priority: form.priority,
  //       dueDate: form.dueDate,
  //       dueTime: form.dueTime,
  //       status: form.status,
  //     }).catch(() => {
  //       // swallow errors, viewmodel handles fallback to local
  //     });
  //   }
  //   // refresh snapshot immediately so UI updates without waiting for subscription
  //   setSnapshot(vm.getTasksForDate(date));
  //   setIsModalOpen(false);
  // }

  // function deleteTodo(id: string) {
  //   const vm = vmRef.current!;
  //   vm.removeTask(id);
  //   setSnapshot(vm.getTasksForDate(date));
  // }

  // function changeStatus(id: string, status: Status, insertIndex?: number) {
  //   const vm = vmRef.current!;
  //   vm.updateTask(id, { status }, insertIndex);
  //   setSnapshot(vm.getTasksForDate(date));
  // }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Remember your duty.</h1>
        <button type="button" onClick={() => setShowAddTaskModal(true)} className="add-button">
          <span className="add-button-text">New Task</span>
          <span className="add-button-icon">+</span>
        </button>
      </div>

      {/* <Modal isOpen={isModalOpen} title={form.id ? 'Edit Task' : 'Create Task'} onClose={() => setIsModalOpen(false)}>
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
            <div style={{ display: 'flex', gap: 8, flex: 1, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                <select 
                  value={timeState.hours} 
                  onChange={(e) => {
                    const newHours = e.target.value;
                    setTimeState(prev => {
                      const newState = { ...prev, hours: newHours };
                      const newTime = to24Hour(newHours, newState.minutes, newState.period);
                      setForm({ ...form, dueTime: newTime });
                      return newState;
                    });
                  }}
                  style={{ padding: 8, borderRadius: 6, width: '70px' }}
                >
                  {Array.from({ length: 12 }).map((_, i) => {
                    const hour = (i + 1).toString().padStart(2, '0');
                    return <option key={hour} value={hour}>{hour}</option>;
                  })}
                </select>
                <span>:</span>
                <select 
                  value={timeState.minutes} 
                  onChange={(e) => {
                    const newMinutes = e.target.value;
                    setTimeState(prev => {
                      const newState = { ...prev, minutes: newMinutes };
                      const newTime = to24Hour(newState.hours, newMinutes, newState.period);
                      setForm({ ...form, dueTime: newTime });
                      return newState;
                    });
                  }}
                  style={{ padding: 8, borderRadius: 6, width: '70px' }}
                >
                  {Array.from({ length: 60 }).map((_, i) => {
                    const minute = i.toString().padStart(2, '0');
                    return <option key={minute} value={minute}>{minute}</option>;
                  })}
                </select>
                <select 
                  value={timeState.period} 
                  onChange={(e) => {
                    const newPeriod = e.target.value as 'AM' | 'PM';
                    setTimeState(prev => {
                      const newState = { ...prev, period: newPeriod };
                      const newTime = to24Hour(newState.hours, newState.minutes, newPeriod);
                      setForm({ ...form, dueTime: newTime });
                      return newState;
                    });
                  }}
                  style={{ padding: 8, borderRadius: 6, width: '70px' }}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 12px', borderRadius: 6 }}>Cancel</button>
            <button type="submit" style={{ padding: '8px 12px', borderRadius: 6, background: '#2563eb', color: '#fff' }}>{form.id ? 'Save' : 'Create'}</button>
          </div>
        </form>
      </Modal> */}

  {/* TimeClock and modal removed: now only a simple time input is used */}

      <div className="main-columns">
        <Column title="ToDo" status={Status.Pending} tasks={tasks.pending}  />
        <Column title="Paused" status={Status.Paused} tasks={tasks.paused}  />
        <Column title="In Progress" status={Status.InProgress} tasks={tasks.in_progress}  />
        <Column title="Completed" status={Status.Completed} tasks={tasks.completed}  />
      </div>
      <AddEditTask action="add" />
      <div className="todo-footer">

      </div>
    </div>
  );
}
