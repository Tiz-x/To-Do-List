import './InputField.css';
import type { Todo } from './Model';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const InputField = ({ todo, setTodo, todos, setTodos }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo.trim()) return;
    setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
    setTodo('');
  };

  return (
    <div className="input__wrap">
      <form className="input" onSubmit={handleSubmit}>
        <span className="input__icon">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new task..."
          className="input__box"
        />
        <button className="submit__btn" type="submit">+ Add</button>
      </form>
    </div>
  );
};

export default InputField;