import Modal from './../../../../components/ui/Modal';
import usePauseForm from './useTaskPauseForm';
import Button from './../../../../components/ui/Button';
import useTaskStore from '../../store';
import { pauseTask } from './api';
import { fetchTasks } from '../../api';
type TaskPauseProps = {
  pauseOpen: boolean;
  setPauseOpen: (open: boolean) => void;
};
const TaskPause = ({ pauseOpen, setPauseOpen }: TaskPauseProps) => {
  const { addTasks } = useTaskStore();
      const { form, submit } = usePauseForm({
          onSubmit: async (vals) => {
            const { taskToPause } = useTaskStore.getState();
            await pauseTask(taskToPause.id, vals);
            const response = await fetchTasks({});
            if (response.data) {
                addTasks(response.data);
            }
            setPauseOpen(false);
          },
          onChange: (vals) => {
          },
      });
    return (
      <Modal show={pauseOpen} 
       header="Pause task" 
       onClose={() => setPauseOpen(false)}
      >
        {form}
        <Button variant="contained" onClick={submit} disabled={false} style={{marginTop: '16px'}}>
            Pause Task
        </Button>
        <Button variant="contained" color="secondary" onClick={()=>setPauseOpen(false)} disabled={false} style={{marginTop: '16px', marginLeft: '8px'}}>
            Cancel
        </Button>
      </Modal>
    );
}




export default TaskPause;