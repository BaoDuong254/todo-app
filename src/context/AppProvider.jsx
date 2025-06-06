import React, { createContext, useState } from "react";
import App from "../App";
import { useContext } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState();

    const [selectedFilterId, setSelectedFilterId] = useState("all");

    const [searchText, setSearchText] = useState("");

    const [activeTodoItemId, setActiveTodoItemId] = useState();

    const [showSidebar, setShowSidebar] = useState(false);

    const [todoList, setTodoList] = useState([
        {
            id: 1,
            name: "Coding exercise",
            isImportant: false,
            isCompleted: true,
            isDeleted: false,
            category: "personal",
        },
        {
            id: 2,
            name: "Watch a movie",
            isImportant: true,
            isCompleted: false,
            isDeleted: false,
            category: "personal",
        },
        {
            id: 3,
            name: "Camping",
            isImportant: false,
            isCompleted: false,
            isDeleted: false,
            category: "travel",
        },
    ]);

    const handleToggleSidebar = (todoId) => {
        if (activeTodoItemId === todoId) {
            setShowSidebar(false);
            setTimeout(() => {
                setActiveTodoItemId(null);
            }, 300);
        } else {
            setActiveTodoItemId(todoId);
            setShowSidebar(true);
        }
    };

    const handleDeleteTodoItem = (id) => {
        setTodoList((prevList) => {
            return prevList.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isDeleted: true };
                }
                return todo;
            });
        });
    };

    const handleRestoreTodoItem = (id) => {
        setTodoList((prevList) => {
            return prevList.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isDeleted: false };
                }
                return todo;
            });
        });
    };

    const handleTodoItemChange = (newTodo) => {
        setTodoList((prevList) => {
            return prevList.map((todo) => {
                if (todo.id === newTodo.id) {
                    return newTodo;
                }
                return todo;
            });
        });
    };

    const handleCompleteCheckbox = (id) => {
        setTodoList((prevList) => {
            return prevList.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                }
                return todo;
            });
        });
    };

    const closeSidebar = () => {
        setShowSidebar(false);
        setTimeout(() => {
            setActiveTodoItemId(null);
        }, 300);
    };

    return (
        <AppContext.Provider
            value={{
                selectedCategoryId,
                setSelectedCategoryId,
                todoList,
                setTodoList,
                selectedFilterId,
                setSelectedFilterId,
                searchText,
                setSearchText,
                activeTodoItemId,
                setActiveTodoItemId,
                showSidebar,
                setShowSidebar,
                handleToggleSidebar,
                handleTodoItemChange,
                handleCompleteCheckbox,
                closeSidebar,
                handleDeleteTodoItem,
                handleRestoreTodoItem,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

export const useAppContext = () => {
    return useContext(AppContext);
};
