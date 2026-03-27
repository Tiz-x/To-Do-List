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
    <form className="input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="What needs to be done?"
        className="input__box"
      />
      <button className="submit__btn" type="submit">Add task</button>
    </form>
  );
};

export default InputField;