import React, { useState } from 'react';
import type { Todo } from './Model';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';
import { FiCheck } from 'react-icons/fi';
import './Todolist.css';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.todo);

  const handleDone = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEditSave = (id: number) => {
    if (editTodo.trim()) {
      setTodos(todos.map((t) => (t.id === id ? { ...t, todo: editTodo } : t)));
    }
    setEdit(false);
  };

  return (
    <li className={`todos__single ${todo.isDone ? 'is-done' : ''}`}>
      <span
        className={`todo__check ${todo.isDone ? 'checked' : ''}`}
        onClick={() => handleDone(todo.id)}
        role="checkbox"
        aria-checked={todo.isDone}
        tabIndex={0}
        onKeyDown={(e) => e.key === ' ' && handleDone(todo.id)}
      >
        <svg viewBox="0 0 12 12">
          <polyline points="1.5,6 4.5,9.5 10.5,2.5" />
        </svg>
      </span>

      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single__input"
          autoFocus
          onBlur={() => handleEditSave(todo.id)}
          onKeyDown={(e) => e.key === 'Enter' && handleEditSave(todo.id)}
        />
      ) : (
        <span className={`todos__single__text ${todo.isDone ? 'done' : ''}`}>
          {todo.todo}
        </span>
      )}

      <div className="icons">
        {edit ? (
          <span className="icon" onClick={() => handleEditSave(todo.id)}>
            <FiCheck size={15} />
          </span>
        ) : (
          <span className="icon" onClick={() => setEdit(true)}>
            <CiEdit size={17} />
          </span>
        )}
        <span className="icon delete" onClick={() => handleDelete(todo.id)}>
          <MdDeleteForever size={17} />
        </span>
      </div>
    </li>
  );
};

export default SingleTodo;