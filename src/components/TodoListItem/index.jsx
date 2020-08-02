import React from 'react';
import {
    Checkbox,
    Icon,
    IconButton,
    ListItem, ListItemGraphic, ListItemText, ListItemMeta
} from 'mdc-react';

import './index.scss';

export default function TodoListItem({
    todo,
    onUpdate,
    onDelete,
    onSelect
}) {
    function handleChange(completed) {
        onUpdate(todo.id, { completed});
    }

    return (
        <ListItem className="todo-list-item">
            <ListItemGraphic>
                <Checkbox
                    checked={todo.completed}
                    onChange={() => handleChange(todo.id)}
                />
            </ListItemGraphic>

            <ListItemText onClick={() => onSelect(todo)}>{todo.title}</ListItemText>

            <ListItemMeta>
                <IconButton onClick={() => onDelete(todo.id)}>
                    <Icon>delete</Icon>
                </IconButton>


                <IconButton onClick={() => onUpdate(todo.id, { important: !todo.important })}>
                    <Icon>{todo.important ? 'star' : 'star_bordered'}</Icon>
                </IconButton>


            </ListItemMeta>
        </ListItem>
    );
}