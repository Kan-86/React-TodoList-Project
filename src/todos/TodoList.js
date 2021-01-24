import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadTodos, deleteTodoRequest, updateTodoRequest } from './thunks'
import { 
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos,
 } from './selectors';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';

const ListWrapper = styled.div`
max-width: 700px;
margin: auto;
`;

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
        <ListWrapper>
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
        </ListWrapper>
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