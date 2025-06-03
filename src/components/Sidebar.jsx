import React, { useState } from "react";
import "./Sidebar.css";
import { CATEGORY_ITEMS } from "../constants";

const Sidebar = (props) => {
    const data = props.todoItem;
    const [name, setName] = useState(data.name);
    const [isImportant, setIsImportant] = useState(data.isImportant);
    const [isCompleted, setIsCompleted] = useState(data.isCompleted);
    const [category, setCategory] = useState(data.category);
    const handleSave = () => {
        const newTodo = {
            id: data.id,
            name: name,
            isImportant: isImportant,
            isCompleted: isCompleted,
            category,
        };
        props.handleTodoItemChange(newTodo);
        props.closeSidebar();
    };

    return (
        <div className={`sidebar ${props.isVisible ? "show" : ""}`}>
            <form className="sb-form">
                <div className="sb-form-field">
                    <input
                        type="text"
                        id="sb-name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="sb-form-field">
                    <label htmlFor="sb-important">Is Important?</label>
                    <input
                        type="checkbox"
                        id="sb-important"
                        name="isImportant"
                        checked={isImportant}
                        onChange={(e) => setIsImportant(e.target.checked)}
                    />
                </div>
                <div className="sb-form-field">
                    <label htmlFor="sb-completed">Is Completed?</label>
                    <input
                        type="checkbox"
                        id="sb-completed"
                        name="isCompleted"
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                    />
                </div>
                <div className="sb-form-field">
                    <label htmlFor="sb-category">Category</label>
                    <select
                        id="sb-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {CATEGORY_ITEMS.map((category) => {
                            return (
                                <option value={category.id} key={category.id}>
                                    {category.label}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </form>
            <div className="sb-footer">
                <button className="save-btn" onClick={handleSave}>
                    Save
                </button>
                <button
                    className="cancel-btn"
                    onClick={() => props.closeSidebar()}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
