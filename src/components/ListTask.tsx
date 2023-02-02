import { useState } from 'react';
import { ITask } from './Task';

interface ITaskList {
  tasks: Array<ITask>;
  onChangeTask: (task: ITask) => void;
  onDeleteTask: (taskId: string) => void;

}

interface ITaskFunction {
  task: ITask;
  onChange: (task: ITask) => void;
  onDelete: (id:string) => void;
}

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}:ITaskList) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }:ITaskFunction) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          placeholder='Add new Task'
          value={task.title}
          onChange={e => {
            onChange({
              ...task,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={e => {
          onChange({
            ...task,
            completed: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </label>
  );
}
