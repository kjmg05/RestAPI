import Todos from "./Todos";
import { useSelector } from 'react-redux';

const TodoPage = () => {
    const [{todos}, dispatch] =  useSelector(({todos}) => { return todos;});
    const onAddTodo = (todoMessage) => {
        const action = {
            type: 'ADD_TODO_MESSAGE',
            payload: {
                msg: todoMessage
            }
        }
        dispatch(action);
    }

    const onToggleDone = (idTodo) => {

    }
    return(
        <Todos
        list={Object.entries(todos.list)}
        onAddTodo = {onAddTodo}
        onToggleDone = {onToggleDone}
        />
    );
}

export default TodoPage;