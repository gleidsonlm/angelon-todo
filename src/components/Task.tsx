import { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AddTask from './AddTask.js';
import ListTask from './ListTask.js';

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

export interface IAction {
  type: string;
  id: string;
  title: string;
  task: ITask;
}

function tasksReducer(tasks:Array<ITask>, action:any): ITask[] {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        title: action.title,
        completed: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    seedTasks
  );

  function handleAddTask(title:string) {
    dispatch({
      type: 'added',
      id: uuid(),
      title: title,
    });
  }

  function handleChangeTask(task:ITask) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId:string) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <AddTask
        onAddTask={handleAddTask}
      />
      <ListTask
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

const seedTasks:Array<ITask> = [
  {
    id: uuid(),
    title: "The First Task is to create the task manager",
    completed: false,
  },
  {
    id: uuid(),
    title: "The Second Task is to build the frontend with React. Vite can be our helper here or maybe",
    completed: false,
  }
];
