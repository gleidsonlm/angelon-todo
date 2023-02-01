import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './Task.module.css'
import clipboard from '../assets/clipboard.svg';

export interface ITask {
    id: string,
    title: string,
    completed: boolean,
    deleted: boolean,
}

export function Task(task:ITask) {
    return (
      <ul className={styles.task} id={task.id}>
          <li className={styles.taskCompleted}>{
              task.completed ? 'completed' : 'complete'
          }</li>
          <li className={styles.taskTitle}>{task.title}</li>
          <li className={styles.taskDeleted}>{
              task.deleted ? 'deleted' : 'delete'
          }</li>
      </ul>
    )
}

export function ListTask({taskList}: {taskList: ITask[]}) {
  const activeTasks = taskList.filter(task => task.deleted === false);
  const activeCompletedTasks = taskList.filter(task => task.deleted === false && task.completed === true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.taskList}>
        <div className={styles.taskListInfo}>
            <p className={styles.taskListInfoCreated}>Created&nbsp;
                <span className={styles.taskListInfoCount}>
                    {activeTasks.length}
                </span>
            </p>
            <p className={styles.taskListInfoCompleted}>Completed&nbsp;
                <span className={styles.taskListInfoCount}>
                    {activeCompletedTasks.length}
                    /
                    {activeTasks.length}
                </span>
            </p>
        </div>
        {!activeTasks.length ?
          <div className={styles.taskListEmpty}>
            <img src={clipboard} width= {100} height= {100} alt='clipboard showing empty lines' aria-disabled='true' />
            <p><strong>You have not created tasks.</strong>
            <br />Create new tasks for your todo list!</p>
          </div>
        :
          <div className={styles.taskListTasks}>
            <nav className={styles.taskContainer}>
              {activeTasks.map(
                (task, id) => (
                  <Task key={id} id={task.id} completed={task.completed} title={task.title} deleted={task.deleted} />
                )
              )}
            </nav>
          </div>
        }
      </div>
    </div>
  )
}

export function CreateTask() {
  const [title, setTitle] = useState('');
  const [taskList, setTaskList] = useState<ITask[]>([]);

  function handleNewTask() {
    // deprecated function to prevent page reload,
    // specially when the form is submitted by pressing enter.
    event?.preventDefault(); 
    const newTask = {
      id: uuid(),
      title,
      completed: false,
      deleted: false,
    };
    setTaskList([...taskList, newTask]);
    setTitle('');
  }

  return (
    <>
      <form
        className={styles.createTaskForm}
        onSubmit={handleNewTask}
        name='addTask'
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.createTaskFormInput}
          placeholder='Add a new task'
          name='taskTitle'
        />
        <button
          className={styles.createTaskFormButton}
          onClick={handleNewTask}
          type='button'
        >
          Create
        </button>
      </form>

      <ListTask taskList={taskList} />
    </>
  );
}
