const fs = require("fs");
const path = require("path");

const tasksFilePath = path.join(__dirname, "tasks.json");

// Function to read tasks from the JSON file
function readTask() {
    if (fs.existsSync(tasksFilePath)) {
        const data = fs.readFileSync(tasksFilePath, "utf8");
        return JSON.parse(data);
    }
    return [];
}

// Function to write tasks to the JSON file
function writeTask(tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
}

// Function to get next task Id
function getNextTaskId() {
    const tasks = readTask();

    if (tasks.length > 0) {
        const lastId = tasks[tasks.length - 1].id;
        
        if (lastId) {
            return parseInt(lastId) + 1;
        }
    }

    return 1;
}

// Function to add a new task
function addTask(taskDesc) {
    const tasks = readTask();
    const newTask = {
        id: getNextTaskId(),
        description: taskDesc,
        status: "todo",
        createdAt: getFormattedDate(),
        updatedAt: getFormattedDate()
    }
    tasks.push(newTask);
    writeTask(tasks);
    console.log(`Task added successfully! (ID: ${newTask.id})`);
}

// Function to update a task
function UpdateTask(taskId, taskDesc = null, taskStatus = null) {
    const tasks = readTask();
    const task = tasks.find(task => task.id === parseInt(taskId));

    if (!task) {
        console.log(`Task with ID: ${taskId} doesn't exists!`);
        process.exit();
    }
    if (taskDesc) {
        task.description = taskDesc;
        task.updatedAt = getFormattedDate();
        writeTask(tasks);
        console.log(`Task ID ${taskId} updated successfully!`);
    }
    
    if (taskStatus) {
        task.status = taskStatus;
        task.updatedAt = getFormattedDate();
        writeTask(tasks);
        console.log(`Task ID ${taskId} status updated successfully!`);
    }
    
}

// Function to delete a task
function deleteTask(taskId) {
    const tasks = readTask();
    const neweTask = tasks.filter(task => task.id !== parseInt(taskId));

    if (neweTask.length === tasks.length) {
        console.log(`Task with ID: ${taskId} doesn't exists!`);
        process.exit();
    }

    writeTask(neweTask);
    console.log(`Task ID ${taskId} deleted successfully!`);
}


function listTasks(status) {
    const tasks = readTask();
    let filteredTasks = tasks;

    if (status) {
        filteredTasks = tasks.filter(task => task.status === status);
    }

    if (filteredTasks.length === 0) {
        console.log(`No tasks found${status ? " of status " + status : ''}!`);
        process.exit();
    }

    console.log(`Listing all tasks${status ? " of status " + status : ''}:`);
    tasks.forEach(task => {
        console.log(`${task.id} ${task.description} ${task.createdAt} ${task.updatedAt} `);
    })
}

function getFormattedDate() {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace("T", " ");
}


// command line interface logic
const args = process.argv.slice(2);

if (!args[0]) {
    console.log(`Please provide a task!`);
    process.exit();
}
switch(args[0].toLowerCase()) {
    case "list":
        const status = args[1]; // "done", "to-do", "in-progress" (optional)
        listTasks(status);
        break;
    case "add":
        const taskDesc = args.slice(1).join(" ");
        if (!taskDesc) {
            console.log(`Please provide a task description!`);
        } else {
            addTask(taskDesc);
        }
        break;
    case "update":
        const taskIdToUpdate = args[1];
        if (parseInt(taskIdToUpdate) === NaN || taskIdToUpdate === undefined) {
            console.log(`Please provide a valid task id!`);
            process.exit();
        }

        const updateTaskDesc = args.slice(2).join(" ");
        if (!updateTaskDesc) {
            console.log(`Please provide a task description!`);
        } else {
            UpdateTask(taskIdToUpdate, updateTaskDesc);
        }
        break;
    case "delete":
        const taskIdToDelete = args[1];
        if (parseInt(taskIdToDelete) === NaN || taskIdToDelete === undefined) {
            console.log(`Please provide a valid task id!`);
            process.exit();
        }

        deleteTask(taskIdToDelete);
        break;
    case "mark-done":
    case "mark-in-progress":
        const taskIdToDone = args[1];
        if (parseInt(taskIdToDone) === NaN || taskIdToDone === undefined) {
            console.log(`Please provide a valid task id!`);
            process.exit();
        }

        const taskStatus = args[0].toLowerCase().replace("mark-", "");

        if(!taskStatus || !(taskStatus === "done" || taskStatus === "in-progress")) {
            console.log(`Please provide a valid task status!`);
            process.exit();
        }
        UpdateTask(taskIdToDone, null, taskStatus);
        break;
    case "default":
        console.log(`Please provide a command!`);
        break;
}