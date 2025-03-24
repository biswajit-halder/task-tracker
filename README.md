# Task Tracker CLI

This is a simple command-line interface (CLI) application for managing tasks. It allows users to add, list, update, delete, and mark tasks with different statuses.
Sample solution for the <a href="https://roadmap.sh/projects/task-tracker" rel="nofollow">task-tracker</a> challenge from <a href="https://roadmap.sh/" rel="nofollow">roadmap.sh</a>.

## Features
- Add new tasks with a unique ID and store them in JSON format.
- List tasks by their status: to-do, in-progress, or done.
- Update the description of an existing task.
- Delete tasks by their ID.
- Mark tasks as in-progress or done.

## Prerequisites
- Node.js installed on your system.

## Installation
### Clone the Repository
```sh
git clone --depth=1 https://github.com/biswajit-halder/task-tracker.git
```

### Navigate to the project directory
```sh
cd task-tracker
```

## Usage
### Add a Task
```sh
node index.js add "Drink a Coffee"
```

### List all Tasks
```sh
node index.js list
```

### List tasks by status
#### To list the tasks that are marked as to-do
```sh
node index.js list to-do
```

#### To list the tasks that are marked as in-progress
```sh
node index.js list in-progress
```

#### To list the tasks that are marked as done
```sh
node index.js list done
```

### Update a Task
```sh
node index.js update 1 "Drink a Coffee and Do Coding"
```

### Mark Task Status
#### Mark as `in-progress` with task ID 1
```sh
node index.js mark-in-progress 1
```

#### Mark as `done` with task ID 1
```sh
node index.js mark-done 1
```

### Delete a Task
#### Delete the task by ID 1
```sh
node index.js delete 1
```

## Sample JSON structure
```json
[
  {
    "id": 1,
    "description": "drink coffee and chill",
    "status": "done",
    "createdAt": "2025-03-23 18:37:35",
    "updatedAt": "2025-03-24 18:40:26"
  }
]
```

**Note:** Place the JSON file in the same directory as the task code.