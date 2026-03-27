import { useState, useEffect } from 'react';
import Taskify from './components/Taskify';
import SplashScreen from './components/SplashScreen';
import type { Todo } from './components/Model';
import './App.css';
import Todolist from './components/Todolist';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [appVisible, setAppVisible] = useState(false);

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

  const handleSplashDone = () => {
    setShowSplash(false);
    setTimeout(() => setAppVisible(true), 50);
  };

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}

      <div className={`app-content ${appVisible ? 'app-content--visible' : ''}`}>
        <Taskify
          todo={todo}
          setTodo={setTodo}
          todos={todos}
          setTodos={setTodos}
        />
        <Todolist todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
}

export default App;