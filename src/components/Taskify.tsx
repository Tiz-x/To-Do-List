import './Taskify.css';
import InputField from './InputField';
import type { Todo } from './Model';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Taskify = ({ todo, setTodo, todos, setTodos }: Props) => {
  return (
    <div className="taskify">
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div className="taskify__badge">
          <span className="taskify__badge__dot" />
          Personal workspace
        </div>
        <h1 className="taskify__title">
          Make it <span>done.</span>
        </h1>
        <p className="taskify__sub">Capture tasks. Stay focused. Ship things.</p>
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