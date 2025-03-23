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
        break;
    case "delete":
        break;
    case "default":
        console.log(`Please provide a task!`);
        break;
}