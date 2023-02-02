import { useState } from 'react';
import styles from './Task.module.css'

interface IAddTask {
  onAddTask: (title: string) => void
}

export default function AddTask({ onAddTask }: IAddTask) {
  const [title, setText] = useState('');
  return (
    <form
      className={styles.createTaskForm}
      onSubmit={
        (event) => {
          event.preventDefault();
          setText('');
          return onAddTask(title);
        }
    }>
      <input
        className={styles.createTaskFormInput}
        placeholder="Add a new task"
        value={title}
        onChange={e => setText(e.target.value)}
      />
      <button
        className={styles.createTaskFormButton}
        onClick={() => { setText(''); onAddTask(title); }}
        type='button'
      >
        <span>Add</span>
        <span className="material-symbols-rounded">add_circle</span>
      </button>
    </form>
  )
}
