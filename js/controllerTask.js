import {createTask, cleanForm, modifyStatus, deleteTask} from "./viewTask.js";
import {Task} from "./modelTask.js";

( ()=>{
    const form = document.querySelector("[data-button-form]");
    const taskContainer = document.querySelector("[data-cont-task]");

    const createActions = (event) => {
        event.preventDefault();
        const inputFormText = document.querySelector("[data-form-inp]").value;
        let task = new Task(inputFormText.toString(), "pending");
        createTask(task);
        cleanForm();
    }

    const taskContainerActions = (event) => {
        modifyStatus(event.target, event.target.value);
        deleteTask(event.target);
    }
    form.addEventListener("submit", createActions);
    taskContainer.addEventListener("click", taskContainerActions)
    }
)()

