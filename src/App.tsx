import { useState, useEffect } from 'react';
import Taskify from './components/Taskify';
import type { Todo } from './components/Model';
import './App.css';
import Todolist from './components/Todolist';

function App() {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Taskify
        todo={todo}
        setTodo={setTodo}
        todos={todos}
        setTodos={setTodos}
      />
      <div style={{ height: '28px' }} />
      <Todolist todos={todos} setTodos={setTodos} />
    </>
  );
}

export default App;