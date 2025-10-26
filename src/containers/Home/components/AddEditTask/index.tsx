import useTaskStore from "../../store";
import { Status } from "../../model";
import AddTask from "./AddTask";
import EditTask from "./EditTask";

type AddEdtitTaskProps = {
  action: 'add' | 'edit';
  status?: Status;
  id?: number;
};

const AddEditTask: React.FC<AddEdtitTaskProps> = ({ action, id, status }) => {
  const { showAddTaskModal, setShowAddTaskModal, showEditTaskModal, setShowEditTaskModal } = useTaskStore();

  if(action === 'edit') return <EditTask editTaskOpen={showEditTaskModal} setEditTaskOpen={setShowEditTaskModal} />;
  if(action === 'add') return <AddTask addTaskOpen={showAddTaskModal} setAddTaskOpen={setShowAddTaskModal} />;
  return <></>
}

export default AddEditTask;