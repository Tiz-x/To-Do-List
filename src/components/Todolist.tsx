import React from 'react';
import type { Todo } from './Model';
import './Todolist.css';
import SingleTodo from './SingleTodo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Todolist: React.FC<Props> = ({ todos, setTodos }) => {
  if (todos.length === 0) return null;

  const remaining = todos.filter((t) => !t.isDone).length;
  const allDone = remaining === 0;

  const clearDone = () => setTodos(todos.filter((t) => !t.isDone));

  return (
    <div className="todos__container">
      <div className="todos__header">
        <span className="todos__header__label">Tasks</span>
        <span className="todos__header__count">{todos.length} total</span>
      </div>
      <ul className="todos">
        {todos.map((todo) => (
          <SingleTodo
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </ul>
      <div className="todos__footer">
        <div className="todos__footer__status">
          <span className={`todos__footer__dot ${allDone ? 'all-done' : ''}`} />
          {allDone ? 'All tasks complete — great work!' : `${remaining} task${remaining !== 1 ? 's' : ''} left`}
        </div>
        {todos.some((t) => t.isDone) && (
          <button className="todos__footer__clear" onClick={clearDone}>
            Clear done
          </button>
        )}
      </div>
    </div>
  );
};

export default Todolist;