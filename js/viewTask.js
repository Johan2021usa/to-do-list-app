const taskContainer = document.querySelector("[data-cont-task]");
const dialog = document.querySelector("[data-dialog-instructions]");

const showTask = (task)=>{
    const taskContainer = document.querySelector("[data-cont-task]");
    const taskUl = `
        <li class="task-container__description">${task.description.toString()}</li>
        <li>
            <select class="task-container__status _status--pending" data-type-status>
                <option name="pending" class="task-container__option-pending" value="pending">pending</option>
                <option name="completed" class="task-container__option-completed" value="completed">completed</option>
                <option name="ongoing" class="task-container__option-ongoing" value="ongoing">ongoing</option>
            </select>
        </li>
        <li><button class="task-container__delete" data-type-delete>delete</button></li>
    `;
    // when we use the method create element, this will exist so that we can modified using dom.
    let ulContainer = document.createElement("ul");
    ulContainer.setAttribute('id', task.id.toString());
    ulContainer.classList.add("task-container__u-list", "_u-list_pending");
    // we can add an element created using back bricks to a element created by using dom methods
    ulContainer.innerHTML = taskUl;

    // we select all options elements that are included in this ul
    const options = ulContainer.getElementsByTagName("option");
    // we iterate all options elements and assign the selected property to the element that has the same value and status.
    for(const option of options){
        (option.value===task.status) ? (option.setAttribute("selected", "selected")) : (stop());
    }
    taskContainer.appendChild(ulContainer);
};

const modifyVisual = (ulElement, select, statusSet, statusVal)=>{

    if(!statusSet===false){
        for (const status of statusSet) {
            if(status.getAttribute("selected")){
                statusVal = status.value;
            }
        }
    }
    if(statusVal === "pending" && ulElement.classList.contains("task-container__u-list")){
        ulElement.classList.remove("_u-list_completed", "_u-list_ongoing");
        select.classList.remove("_status--completed", "_status--ongoing");
        ulElement.classList.add("_u-list_pending");
        select.classList.add("_status--pending");
    }
    if(statusVal === "completed" && ulElement.classList.contains("task-container__u-list")){
        ulElement.classList.remove("_u-list_pending", "_u-list_ongoing");
        select.classList.remove("_status--pending", "_status--ongoing");
        ulElement.classList.add("_u-list_completed");
        select.classList.add("_status--completed");
    }
    if(statusVal === "ongoing" && ulElement.classList.contains("task-container__u-list")){
        ulElement.classList.remove("_u-list_pending", "_u-list_completed");
        select.classList.remove("_status--pending", "_status--completed");
        ulElement.classList.add("_u-list_ongoing");
        select.classList.add("_status--ongoing");
    }
    /**
     * Don't nest if statements
     * This method could be optimized using toggle method (search it)
     * */
}

const showDialog = ()=>{
    dialog.showModal();
    const dialogCloseButton = document.querySelector("[data-button-dialog]");
    return dialogCloseButton;
}
const closeDialog = ()=>{
    dialog.close();
}

const resetForm = ()=>{
    //reset method only works on forms
    document.querySelector("[data-button-form]").reset();
}

const resetTaskContainer = ()=>{
    // this method could be improved using DOM methods
    taskContainer.innerHTML = "";
}

export {showTask, resetForm, modifyVisual, resetTaskContainer, showDialog, closeDialog};