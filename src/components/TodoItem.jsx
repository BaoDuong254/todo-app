import React from "react";

const TodoItem = (props) => {
    const isSelected = props.id === props.activeTodoItemId;

    return (
        <div
            className={`todo-item ${isSelected ? "todo-item-selected" : ""}`}
            onClick={() => props.handleToggleSidebar(props.id)}
        >
            <div
                style={{
                    display: "flex",
                    gap: 4,
                }}
            >
                <input
                    type="checkbox"
                    checked={props.isCompleted}
                    onChange={() => props.handleCompleteCheckbox(props.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="todo-item-checkbox"
                />
                <p className="todo-item-text">{props.name}</p>
            </div>
            {props.isImportant && <p>⭐</p>}
        </div>
    );
};

export default TodoItem;
