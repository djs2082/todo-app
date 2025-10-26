import Modal from './../../../../components/ui/Modal';
import useAddTaskForm from './useAddTaskForm';
import Button from './../../../../components/ui/Button';
import { updateTask } from './api';
import useTaskStore from '../../store';
import { fetchTasks } from '../../api';

type EditTaskProps = {
    editTaskOpen: boolean;
    setEditTaskOpen: (open: boolean) => void;
};

type EditTaskInnerProps = EditTaskProps & { taskToEdit: any, addTasks: any };

const EditTaskInner: React.FC<EditTaskInnerProps> = ({ editTaskOpen, setEditTaskOpen, taskToEdit, addTasks }) => {
  const { form, submit } = useAddTaskForm({
    onSubmit: async (vals) => {
      try {
        const localDate = new Date(`${vals.date}T${vals.time}:00`);
        const utcString = localDate.toISOString();
        await updateTask(taskToEdit.id, {
          title: vals.title,
          description: vals.description,
          due_date_time: utcString,
          priority: vals.priority,
        });
        setEditTaskOpen(false);
       const response = await fetchTasks({});
           if (response.data) {
               addTasks(response.data);
           }
      } catch (error) {
        // handle error if needed
      }
    },
    onChange: () => {},
    taskToEdit,
  });

  return (
    <Modal
      show={editTaskOpen}
      header="Edit task"
      onClose={() => setEditTaskOpen(false)}
    >
      {form}
      <Button variant="contained" onClick={submit} disabled={false} style={{ marginTop: '16px' }}>
        Edit Task
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setEditTaskOpen(false)}
        disabled={false}
        style={{ marginTop: '16px', marginLeft: '8px' }}
      >
        Cancel
      </Button>
    </Modal>
  );
};

const EditTask: React.FC<EditTaskProps> = ({ editTaskOpen, setEditTaskOpen }) => {
  const { taskToEdit, addTasks} = useTaskStore();
  // Remount the form when taskToEdit changes (keyed by id) to recalc defaults
  const key = String(taskToEdit?.id ?? 'none');
  return (
    <EditTaskInner
      key={key}
      editTaskOpen={editTaskOpen}
      setEditTaskOpen={setEditTaskOpen}
      taskToEdit={taskToEdit}
      addTasks={addTasks}
    />
  );
};

export default EditTask;