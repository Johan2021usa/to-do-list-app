const taskContainer = document.querySelector("[data-cont-task]");

const createTask = (task)=>{
    const taskUl = `
        <li class="task-container__description">${task.descrition}</li>
        <li>
            <select class="task-container__status _status--pending" data-type-status>
                <option class="task-container__option-pending" value="pending">pending</option>
                <option class="task-container__option-completed" value="completed">completed</option>
                <option class="task-container__option-ongoing" value="ongoing">ongoing</option>
            </select>
        </li>
        <li><button class="task-container__delete">delete</button></li>
    `;
    let ulContainer = document.createElement("ul");
    ulContainer.classList.add("task-container__u-list", "_u-list_pending");
    ulContainer.innerHTML = taskUl;
    taskContainer.appendChild(ulContainer);
};

const cleanForm = ()=>{
    //reset method only works on forms
    document.querySelector("[data-button-form]").reset();
}

const modifyStatus = (element, status)=>{
    const ulElement = (element.parentElement).parentNode;

    if(status === "pending" && ulElement.classList.contains("task-container__u-list")){
        ulElement.classList.remove("_u-list_completed", "_u-list_ongoing");
        element.classList.remove("_status--completed", "_status--ongoing");
        ulElement.classList.add("_u-list_pending");
        element.classList.add("_status--pending");
    }
    if(status === "completed" && ulElement.classList.contains("task-container__u-list")){
        ulElement.classList.remove("_u-list_pending", "_u-list_ongoing");
        element.classList.remove("_status--pending", "_status--ongoing");
        ulElement.classList.add("_u-list_completed");
        element.classList.add("_status--completed");
    }
    if(status === "ongoing" && ulElement.classList.contains("task-container__u-list")){
        ulElement.classList.remove("_u-list_pending", "_u-list_completed");
        element.classList.remove("_status--pending", "_status--completed");
        ulElement.classList.add("_u-list_ongoing");
        element.classList.add("_status--ongoing");
    }
}

const deleteTask = (element)=>{
    const ulElement = (element.parentElement).parentNode;
    if((ulElement.classList.contains("task-container__u-list") &&
        (element.classList.contains("task-container__delete")))){
        ulElement.remove();
    }
}



export {createTask, cleanForm, modifyStatus, deleteTask};