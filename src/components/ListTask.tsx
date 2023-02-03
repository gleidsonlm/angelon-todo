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

  return(
    <div className={styles.wrapper}>
      <div className={styles.taskList}>
        <div className={styles.taskListInfo}>
          <strong className={styles.taskListInfoCreated}>Created&nbsp;
            <span className={styles.taskListInfoCount}>{tasks.length}</span>
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
              {tasks.map(task => (
                <ul key={task.id} className={styles.taskContainer}>
                  <Task 
                    task={task}
                    onChange={onChangeTask}
                    onDelete={onDeleteTask}
                  />
                </ul>
              ))}
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
      <form onSubmit={
      (e) => {
        e.preventDefault();
        setIsEditing(false)
      }}>
        <input
          placeholder='Add new Task'
          value={task.title}
          onChange={e => {
            onChange({
              ...task,
              title: e.target.value
            });
          }} />
      </form>
    );
  } else {
    taskContent = (
      <strong onClick={() => setIsEditing(true)} >
        {task.title}
      </strong>
    );
  }
  return (
    <>
      <li className={styles.taskRound}>
        <label
          className={styles.taskCompleteContainer}
        >
          <input
            type='checkbox'
            placeholder='Check for complete the task'
            className={styles.taskCompleteCheckbox}
            checked={task.completed}
            onChange={e => {
              onChange({
                ...task,
                completed: e.target.checked
              });
            }}      
          />
          <span className={styles.taskCompleteCheckmark}></span>
        </label>
        <label className={styles.taskTitleLabel}>
          <strong>{taskContent}</strong>
        </label>
        <label className={styles.taskDeleteContainer}>
          <button
            className={styles.taskDeleteButton}
            onClick={() => onDelete(task.id)}
            type='button'
            title='Delete'
          />
          <span className={styles.taskDeleteIcon}></span>
        </label>
      </li>
    </>
  );
}
