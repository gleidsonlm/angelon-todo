import { useState } from 'react';
import { ITask } from './Task';
import styles from './Task.module.css'
import clipboard from '../assets/clipboard.svg'
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
  const activeTasks = tasks.filter(task =>!task.completed).length;

  return(
    <div className={styles.wrapper}>
      <div className={styles.taskList}>
        <div className={styles.taskListInfo}>
          <strong className={styles.taskListInfoCreated}>Created&nbsp;
            <span className={styles.taskListInfoCount}>{activeTasks}</span>
          </strong>
          <strong className={styles.taskListInfoCompleted}> Completed&nbsp;
            <span className={styles.taskListInfoCount}>
              {tasks.filter(task => task.completed).length}
              &nbsp;of&nbsp;
              {tasks.length}
            </span>
          </strong> 
        </div>
        {/* Empty Task List or Task List */}
        {
          tasks.length === 0
          ?
            <div className={styles.taskListEmpty}>
              <p>
                <img src={clipboard} alt='task clipboard icon' aria-hidden='true' />< br/>
                <strong>You have no tasks created.</strong>< br/>
                <span>Add a new task to your todo list!</span>< br/>
              </p>
            </div>
          :
            <div className={styles.taskListTasks}>
              <ul className={styles.task}>
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
            </div>
        }
      </div>
    </div>
  )
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
    <label className={styles.taskLabel}>
      <input
        className={styles.taskCompletedCheckbox}
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
