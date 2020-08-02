import React, { useState, useEffect } from 'react';
import {
    Icon,
    IconButton,
    Layout,
    SideSheet,
    Typography
} from 'mdc-react';

import useStore from '../../hooks/store';
// import {getTodosByList, getTodosByPath} from '../../store/selectors';
import PageHeader from '../../components/PageHeader'
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import TodoDetails from '../../components/TodoDetails';

import './index.scss';

export default function ListPage({ match }) {
    const { state, actions } = useStore();
    const [selectedTodo, setSelectedTodo] = useState(null);
   

    function handleSubmit(title) {
        actions.createTodo({
            title,
            userId: state.user.uid,
            listId: list.id || ''
        });
    }

    function handleDelete(todoId) {
        actions.deleteTodo(todoId);
    }

    function handleUpdate(todoId, data) {
        actions.updateTodo(todoId, data);
    }

    function handleSelect(todo) {
        setSelectedTodo(todo);
    }

    function handleSortChange(sort) {
        
        actions.updateList(list.id,{ sort });
    }

    const sortFn = {
        title: (a, b) => a.title.localeCompare(b.title),
        date: (a, b) => new Date(a.seconds * 1000) - new Date(b.seconds * 1000),
        important: (a, b) => b.important - a.important,
        completed: (a, b) => b.completed - a.completed
    };

    const list = state.lists.find(list => list.id === match.params.listId) || 
    { title: 'Задачи' };
    // const todos = match.params.listId ? getTodosByList(state.todos, match.params.listId) : getTodosByPath(state.todos,match.path);
    const todos = list ? state.todos.filter(todo => todo.listId === list.id) : state.todos;

    const sortedTodos = list.sort ? todos.slice().sort(sortFn[list.sort]): todos;



    // const getTodosByFilter = ({
    //     '/': todos => todos,
    //     '/important': todos => todos.filter(todo => todo.important),
    //     '/planned': todos => todos.filter(todo => todo.dueDate),

    // });

    // const getTodosByList = (listId, todos) => todos.filter(todo => todo.listId === listId);


    // const todos = match.params.listId ? getTodosByList(match.params.listId, state.todos) : getTodosByFilter[path](state.todos);
    // const sortedTodos = sortBy ? todos.slice().sort(sortFn[sortBy]) : todos;


    return (
        <Layout id="list-page" className="page">
            <PageHeader
                title={list.title}
                sortBy={list.sort}
                onSortChange={handleSortChange}
            />

            <Layout row>
                <SideSheet
                    open={selectedTodo}
                    dismissible
                    appContentSelector=".mdc-side-sheet-app-content"
                >
                    <Layout row justifyContent="between" alignItems="center">
                        <Typography noMargin>Детали задачи</Typography>

                        <IconButton onClick={() => setSelectedTodo(null)}>
                            <Icon>close</Icon>
                        </IconButton>
                    </Layout>

                    {selectedTodo &&
                        <TodoDetails
                            todo={selectedTodo}
                        />
                    }
                </SideSheet>

                <Layout column className="mdc-side-sheet-app-content">
                    <TodoList
                        list={state.list}
                        todos={sortedTodos}
                        onSelect={handleSelect}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />

                    <TodoForm
                        onSubmit={handleSubmit}
                    />
                </Layout>
            </Layout>
        </Layout>
    );
}