import React, { useMemo } from "react";
import "./CategoryList.css";
import { CATEGORY_ITEMS } from "../constants";
import { useAppContext } from "../context/AppProvider";

const CategoryList = () => {
    const { selectedCategoryId, setSelectedCategoryId, todoList } =
        useAppContext();

    const countByCategory = useMemo(() => {
        return todoList.reduce(
            (acc, todo) => {
                let newAcc = { ...acc };
                if (todo.category) {
                    newAcc[todo.category] = (newAcc[todo.category] || 0) + 1;
                }
                return newAcc;
            },
            {
                personal: 0,
                company: 0,
                travel: 0,
                idea: 0,
            }
        );
    }, [todoList]);

    return (
        <div>
            <p>Categories</p>
            <div>
                {CATEGORY_ITEMS.map((category) => {
                    return (
                        <div
                            key={category.id}
                            className={`category-item ${
                                category.id === selectedCategoryId
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => {
                                if (category.id === selectedCategoryId) {
                                    setSelectedCategoryId(null);
                                } else {
                                    setSelectedCategoryId(category.id);
                                }
                            }}
                        >
                            <div className="category-label-group">
                                <span>📁</span>
                                <p className="category-name">
                                    {category.label}
                                </p>
                            </div>
                            <p className="category-count">
                                {countByCategory[category.id]}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryList;
