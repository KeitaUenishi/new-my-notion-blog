import { Box } from "@mui/material";
import React from "react";

import AddTask from "@/components/sandBox/reducer/AddTask";
import TaskList from "@/components/sandBox/reducer/TaskList";

const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];

let nextId = 3;

const Reducer = () => {
  const [tasks, dispatch] = React.useReducer(tasksReducer, initialTasks);

  function handleAddTask(text: string) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  }
  function handleChangeTask(task: Task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "removed",
      id: taskId,
    });
  }

  return (
    <Box>
      <h1>Task</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
    </Box>
  );
};

export default Reducer;

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type Tasks = Task[];

type Action =
  | {
      type: "added";
      id: number;
      text?: string;
    }
  | {
      type: "changed";
      id?: number;
      task?: Task;
    }
  | {
      type: "removed";
      id: number;
    };

const tasksReducer = (tasks: Tasks, action: Action): Tasks => {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "removed": {
      return tasks.filter((t) => t.id !== action.id);
    }
  }
};
