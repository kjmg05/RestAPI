import {useState} from 'react';
import Page from '../../UX/Page/Page';
import Input from '../../UX/Forms/Input';
import {PrimaryButton} from '../../UX/Forms/Button';

const Todos = ({
    list,
    onAddTodo,
    onToggleDone
}) => {
    return (
        <Page header={(<h1>ToDo List</h1>)}>
            <TodoAddForm addToDo={onAddTodo}></TodoAddForm>
            <TodoFormList todoFormList={list} toggleTodo={onToggleDone}></TodoFormList>
        </Page>
    );
}

const TodoAddForm = ({addToDo}) => {
    const [todoMessage, setTodoMessage] = useState();
    const onChange = (e) => {
        const {value} = e.target;
        setTodoMessage(value);
    }
    const onAddClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToDo(todoMessage);
        setTodoMessage('');
    }
    return(
        <>
           <Input
            type="text"
            name="txtTodoText"
            placeholder="A ToDo text Message"
            label= "A ToDo text Message"
            onChange={onChange}
            value={todoMessage}
           />
           <PrimaryButton onClick={onAddClick}>Add</PrimaryButton>
        </>
    );
}

const TodoFormList = (todoFormList, toggleTodo) => {
        const formItems = (todoFormList || []).map(({text, ...o}, i) => {return (
            <TodoFormListItem key={i} onToggleDone= {toggleTodo} {...o}>{text}</TodoFormListItem>
        )});
     return(
         <ul>
            {formItems}
         </ul>
     );
}

const TodoFormListItem = ({onToggleDone, children}) => {
    return(
        <>
            {children}
        </>
    );
}

export default Todos;