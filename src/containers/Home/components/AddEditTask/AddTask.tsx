import Modal from './../../../../components/ui/Modal';
import useAddTaskForm from './useAddTaskForm';
import Button from './../../../../components/ui/Button';
import { addTask } from './api';
type TaskAddProps = {
  addTaskOpen: boolean;
  setAddTaskOpen: (open: boolean) => void;
};
const AddTask = ({ addTaskOpen, setAddTaskOpen }: TaskAddProps) => {

      const { form, submit } = useAddTaskForm({
          onSubmit: async (vals) => {
              try {
                    const localDate = new Date(`${vals.date}T${vals.time}:00`);
                    const utcString = localDate.toISOString();
                    const res = await addTask({
                      title: vals.title,
                      description: vals.description,
                      due_date_time: utcString,
                      priority: vals.priority
                  });
              } catch (error) {
                 
              }
          },
          onChange: (vals) => {
          },
         
      });
    return (
      <Modal show={addTaskOpen} 
       header="Add task" 
       onClose={() => setAddTaskOpen(false)}
      >
        {form}
        <Button variant="contained" onClick={submit} disabled={false} style={{marginTop: '16px'}}>
            Add Task
        </Button>
        <Button variant="contained" color="secondary" onClick={()=>setAddTaskOpen(false)} disabled={false} style={{marginTop: '16px', marginLeft: '8px'}}>
            Cancel
        </Button>
      </Modal>
    );
}

export default AddTask;