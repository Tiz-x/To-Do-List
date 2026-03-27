import './Taskify.css';
import InputField from './InputField';
import type { Todo } from './Model';
import React from 'react';   // add this if missing

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Taskify = ({ todo, setTodo, todos, setTodos }: Props) => {
  return (
    <div className="taskify">
      <div className="taskify__header">
        <h1 className="taskify__title">
          Do <em>&</em> Done
        </h1>
      </div>
      <InputField
        todo={todo}
        setTodo={setTodo}
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
};

export default Taskify;