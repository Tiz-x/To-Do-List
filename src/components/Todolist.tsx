import React from 'react';
import type { Todo } from './Model';
import './Todolist.css';
import SingleTodo from './SingleTodo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Todolist: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <ul className="todos">
      {todos.map((todo) => (
        <SingleTodo
        todo = {todo}
        key={todo.id}
        todos={todos}
        setTodos ={setTodos}
        />
      ))}
    </ul>
  );
};

export default Todolist;
