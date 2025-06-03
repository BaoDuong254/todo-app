# ToDo App

A simple ToDo App built with React and Vite.

## Introduction

This is a lightweight React project created using Vite. It demonstrates basic CRUD-style functionality for managing a list of tasks. The goal is to keep the codebase minimal and easy to understand, making it a great starting point for beginners who want to learn how to build a React application with Vite.

## Installation & Running the Project

1. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

2. **Start the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

3. **Open in browser**
   By default, Vite will run on `http://localhost:5173`. Open this URL in your favorite browser to see the app in action.

## Features

- Add new tasks (todos)
- Mark tasks as completed or important
- Assign a category to each task
- Edit task details via a slide-in sidebar
- Delete and restore task

## Known Limitations & Future Improvements

Although this ToDo App covers the core task-management use cases, there are several features that are not yet implemented:

- **Data Persistence**
  All tasks are stored in local state. As a result, any added or edited tasks will be lost when the page is reloaded. In the future, I plan to integrate a backend database to persist data across sessions.

- **Authentication & Authorization**
  There is no user login or account system. Implementing authentication would allow each user to have their own task list stored on a server.

- **Responsiveness**
  The current layout is static and not fully responsive on smaller screens.

## Contributing

Contributions are welcome! If you’d like to help improve this project, feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit (`git commit -m "Add some feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please make sure to follow standard best practices:

- Write clear, concise commit messages.
- Name your branch descriptively (e.g., `feature/add-delete-task`, `fix/responsive-sidebar`).
- Update/add any relevant documentation or tests.
- Keep PRs focused on a single change or feature request.

Thank you for your interest in contributing! 🚀
