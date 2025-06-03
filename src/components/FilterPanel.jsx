import React, { useMemo } from "react";
import "./FilterPanel.css";
import CategoryList from "./CategoryList";
import { useAppContext } from "../context/AppProvider";

const FILTER_ITEMS = [
    {
        id: "all",
        label: "All",
        iconPath: "/inbox.png",
    },
    {
        id: "important",
        label: "Important",
        iconPath: "/flag.png",
    },
    {
        id: "completed",
        label: "Completed",
        iconPath: "/check.png",
    },
    {
        id: "deleted",
        label: "Delete",
        iconPath: "/delete.png",
    },
];

const FilterPanel = () => {
    const {
        todoList,
        searchText,
        setSearchText,
        selectedFilterId,
        setSelectedFilterId,
    } = useAppContext();

    const countByFilterType = useMemo(() => {
        return todoList.reduce(
            (acc, todo) => {
                let newAcc = { ...acc };
                if (todo.isCompleted) {
                    newAcc = { ...newAcc, completed: newAcc.completed + 1 };
                }
                if (todo.isImportant) {
                    newAcc = { ...newAcc, important: newAcc.important + 1 };
                }
                if (todo.isDeleted) {
                    newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
                }
                return newAcc;
            },
            { all: todoList.length, important: 0, completed: 0, deleted: 0 }
        );
    }, [todoList]);

    return (
        <div className="filter-panel">
            <input
                type="text"
                placeholder="search"
                name="search-text"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
            />
            <div className="filter-container">
                {FILTER_ITEMS.map((item) => (
                    <div
                        className={`filter-item ${
                            item.id === selectedFilterId ? "selected" : ""
                        }`}
                        onClick={() => setSelectedFilterId(item.id)}
                        key={item.id}
                    >
                        <div className="filter-name">
                            <img
                                src={item.iconPath}
                                alt={`${item.label}.png`}
                            />
                            <p>{item.label}</p>
                        </div>
                        <p>{countByFilterType[item.id]}</p>
                    </div>
                ))}
            </div>
            <CategoryList />
        </div>
    );
};

export default FilterPanel;
