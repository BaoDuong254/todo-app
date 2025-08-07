import { useState, useEffect } from "react";
import { AppContext } from "./AppContext";

// Local storage keys
const STORAGE_KEYS = {
    TODO_LIST: "todoApp_todoList",
    SELECTED_CATEGORY_ID: "todoApp_selectedCategoryId",
    SELECTED_FILTER_ID: "todoApp_selectedFilterId",
    SEARCH_TEXT: "todoApp_searchText",
};

// Default todo list
const DEFAULT_TODO_LIST = [
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
];

// Helper functions for localStorage
const loadFromStorage = (key, defaultValue) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};

const AppProvider = ({ children }) => {
    // Load initial state from localStorage
    const [selectedCategoryId, setSelectedCategoryId] = useState(() =>
        loadFromStorage(STORAGE_KEYS.SELECTED_CATEGORY_ID, undefined)
    );

    const [selectedFilterId, setSelectedFilterId] = useState(() =>
        loadFromStorage(STORAGE_KEYS.SELECTED_FILTER_ID, "all")
    );

    const [searchText, setSearchText] = useState(() =>
        loadFromStorage(STORAGE_KEYS.SEARCH_TEXT, "")
    );

    const [activeTodoItemId, setActiveTodoItemId] = useState();

    const [showSidebar, setShowSidebar] = useState(false);

    const [todoList, setTodoList] = useState(() =>
        loadFromStorage(STORAGE_KEYS.TODO_LIST, DEFAULT_TODO_LIST)
    );

    // Effect to save todoList to localStorage whenever it changes
    useEffect(() => {
        saveToStorage(STORAGE_KEYS.TODO_LIST, todoList);
    }, [todoList]);

    // Effect to save selectedCategoryId to localStorage whenever it changes
    useEffect(() => {
        saveToStorage(STORAGE_KEYS.SELECTED_CATEGORY_ID, selectedCategoryId);
    }, [selectedCategoryId]);

    // Effect to save selectedFilterId to localStorage whenever it changes
    useEffect(() => {
        saveToStorage(STORAGE_KEYS.SELECTED_FILTER_ID, selectedFilterId);
    }, [selectedFilterId]);

    // Effect to save searchText to localStorage whenever it changes
    useEffect(() => {
        saveToStorage(STORAGE_KEYS.SEARCH_TEXT, searchText);
    }, [searchText]);

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

    // Helper function to generate unique ID for new todos
    const generateNewTodoId = () => {
        const maxId = todoList.reduce((max, todo) => Math.max(max, todo.id), 0);
        return maxId + 1;
    };

    // Function to add a new todo
    const handleAddTodo = (todoData) => {
        const newTodo = {
            id: generateNewTodoId(),
            name: todoData.name || "",
            isImportant: todoData.isImportant || false,
            isCompleted: todoData.isCompleted || false,
            isDeleted: false,
            category: todoData.category || "personal",
        };
        setTodoList((prevList) => [...prevList, newTodo]);
    };

    // Function to clear all persisted data (useful for debugging/reset)
    const clearPersistedData = () => {
        Object.values(STORAGE_KEYS).forEach((key) => {
            localStorage.removeItem(key);
        });
        // Reset to default values
        setTodoList(DEFAULT_TODO_LIST);
        setSelectedCategoryId(undefined);
        setSelectedFilterId("all");
        setSearchText("");
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
                handleAddTodo,
                clearPersistedData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
