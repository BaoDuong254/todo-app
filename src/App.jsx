import { useMemo, useRef } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import { useAppContext } from "./context/AppProvider";
import { CATEGORY_ITEMS } from "./constants";

function App() {
    const {
        selectedCategoryId,
        todoList,
        setTodoList,
        searchText,
        selectedFilterId,
        showSidebar,
        setShowSidebar,
        activeTodoItemId,
        handleToggleSidebar,
        handleTodoItemChange,
        handleCompleteCheckbox,
        closeSidebar,
    } = useAppContext();

    const activeTodoItem = todoList.find(
        (todo) => todo.id === activeTodoItemId
    );

    const filterTodos = useMemo(() => {
        return todoList.filter((todo) => {
            if (!todo.name.includes(searchText)) {
                return false;
            }

            if (selectedCategoryId && todo.category !== selectedCategoryId) {
                return false;
            }

            switch (selectedFilterId) {
                case "all":
                    return !todo.isDeleted;
                case "important":
                    return todo.isImportant && !todo.isDeleted;
                case "completed":
                    return todo.isCompleted && !todo.isDeleted;
                case "deleted":
                    return todo.isDeleted;
                default:
                    return true;
            }
        });
    }, [todoList, selectedFilterId, searchText, selectedCategoryId]);

    const inputRef = useRef();

    return (
        <div className="container">
            <FilterPanel />
            <div className="main-content">
                <p className="selected-content">
                    {selectedCategoryId
                        ? CATEGORY_ITEMS.find(
                              (item) => item.id === selectedCategoryId
                          )?.label
                        : {
                              all: "All",
                              important: "Important",
                              completed: "Completed",
                              deleted: "Deleted",
                          }[selectedFilterId]}
                </p>
                <div className="add-task-input">
                    <span className="plus-icon">+</span>
                    <input
                        ref={inputRef}
                        type="text"
                        name="add-new-task"
                        placeholder="Add new task"
                        className="task-input"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const value = e.target.value.trim();
                                setTodoList([
                                    ...todoList,
                                    {
                                        id: crypto.randomUUID(),
                                        name: value,
                                        isImportant: false,
                                        isCompleted: false,
                                        isDeleted: false,
                                        category: "personal",
                                    },
                                ]);
                                inputRef.current.value = "";
                            }
                        }}
                    />
                </div>
                <div>
                    {filterTodos.map((todo) => {
                        return (
                            <TodoItem
                                id={todo.id}
                                name={todo.name}
                                key={todo.id}
                                isImportant={todo.isImportant}
                                isCompleted={todo.isCompleted}
                                handleCompleteCheckbox={handleCompleteCheckbox}
                                handleToggleSidebar={handleToggleSidebar}
                                activeTodoItemId={activeTodoItemId}
                            />
                        );
                    })}
                </div>
                {(activeTodoItemId || showSidebar) && (
                    <Sidebar
                        key={activeTodoItemId}
                        todoItem={activeTodoItem}
                        handleTodoItemChange={handleTodoItemChange}
                        setShowSidebar={setShowSidebar}
                        closeSidebar={closeSidebar}
                        isVisible={showSidebar}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
