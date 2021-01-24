import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTodos, deleteTodoRequest, updateTodoRequest } from './thunks'
import { 
    getTodos, 
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos,
 } from './selectors';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import './TodoList.css';

const TodoList = ({ 
        completedTodos, 
        incompletedTodos, 
        onRemovePressed, 
        onCompletedPressed, 
        isLoading, 
        startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    
    const loadingMessage = <div>Loading Todos...</div>;
    const content = (
        <div className="list-wrapper">
            <NewTodoForm/>
            <h3>Incompleted:</h3>
            {incompletedTodos.map(todo => <TodoListItem 
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletedPressed={onCompletedPressed}/>)}
            <h3>Completed:</h3>
            {completedTodos.map(todo => <TodoListItem 
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletedPressed={onCompletedPressed}/>)}
        </div>
    );
    return isLoading ? loadingMessage : content;
}

const mapStateToProps = state=> ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(deleteTodoRequest(id)),
    onCompletedPressed: id => dispatch(updateTodoRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);