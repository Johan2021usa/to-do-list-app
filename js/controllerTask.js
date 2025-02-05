import {showTask, resetForm, modifyVisual, resetTaskContainer,showDialog, closeDialog} from "./viewTask.js";
import {Task} from "./modelTask.js";

(
    ()=>{
        const form = document.querySelector("[data-button-form]");
        let taskContainer = document.querySelector("[data-cont-task]");
        const instruActivateButton = document.querySelector("[data-li-instructions]");

        const changeStyles = ()=>{
            let statusSet;
            // Checking if the container has children elements
            if (taskContainer.children.length > 0 ) {
                // Iterating each task "ul" that is in the container, forOf avoids the problem of working with keys that could be removed (objects),
                for (const ulElement of taskContainer.children) {
                    // saving the select element inside a variable
                    const select = ulElement.getElementsByTagName("select").item(0);
                    // saving three options inside an object
                    statusSet = select.getElementsByTagName("option");
                    //sending a task container, a select element and a list of options that contain the status,
                        // Status will be iterated in the modify visual method
                    modifyVisual(ulElement, select, statusSet);
                }
            }else{
                console.log("no children");
            }
        }

        const refreshTasks = ()=>{
            const allTasks = new Task();
            const allObjTasks = allTasks.getAllStorages();
            // We use Object constructor to retrieve keys and values from objects,
                // it's an easy way to loop them
                // In this case we use to get the nested object
            const valuesTasks = Object.values(allObjTasks);
            // Iterating each task "ul" that is in the container, forOf avoids the problem of working with keys that could be removed (objects),
            /***
             * check the next example: object = { "1" : {name: johan} .... "8": {name: alex}  } ===> length = 6
             * if we try to get the id 8, it will be out of range weather we use the for basic,
             * since it increases the id one by one ... and the length is 6 = solution => for of
             * */
            for (const valuesTask of valuesTasks) {
                const finalObject = JSON.parse(valuesTask);
                showTask(finalObject);
            }
        }
        //This methods are activated when the html is loaded; root methods
        refreshTasks();
        changeStyles();

        const createTask = (event) => {
            console.log("cerate task");
            event.preventDefault();
            //controller takes a string from the input
            const inputFormText = document.querySelector("[data-form-inp]").value;
            // controller creates an object from the input information: id, description, status
            const idLocalEst = crypto.randomUUID();
            const taskObj = new Task(idLocalEst, inputFormText.toString(), "pending");
            // controller saves the object in local storage through the model
            taskObj.createStorage(taskObj);
            // controller checks the local storage (db)
                // if controller finds objects in the db, the controller shows them through the view
            resetTaskContainer(); // this removes all children elements from the task container (div that contains tasks)
            refreshTasks(); // this method displays all tasks in the task container
            changeStyles();
            resetForm(); // This method clears the form input
            /**
             * functional methods pattern: reset - refresh - update styles / additional
             *
             * If we don't empty the container before refreshing it, the method refresh will add the same tasks,
             * additionally, each time we refresh the container, we must have to use the change style method,
             * in order to load the styles of each task.
             * */
        }

        const deleteTask = (element)=>{
            console.log("changing status");
            // We instantiate the class Task in order to create a object that is going to server to obtain all class methods
            const allTasks2 = new Task();
            let parent = element.target.offsetParent; // use offsetParent to get the parent container
            if(element.target.classList.contains("task-container__delete") &&
                parent.classList.contains("task-container__u-list")){
                // We remove an object from local storage using the object to get the removing method.
                allTasks2.removeStorageById(parent.id.toString());
                // functional methods pattern: reset - refresh - update styles
                resetTaskContainer();
                refreshTasks();
                changeStyles();
            }
        }

        const changeStatus = (event) => {
            console.log("changing status");
            // declarations to manage the model
            const allTasks3 = new Task();
            const taskCont = event.target.offsetParent;
            // before to update, i need to get the element
            const taskValues = allTasks3.getStorage(taskCont.id.toString());
            const taskObj = JSON.parse(taskValues);

            // Declarations to manage the view
            const select = event.target;
            const statusSet = false;
            const status = event.target.value;

            // filtering container and verifying that value to be updated already exists
            if((taskCont.classList.contains("task-container__u-list")) && !(taskValues===null) ){
                // create a new object using the model
                const updatedTask = new Task(taskCont.id,taskObj.description,event.target.value);
                // by using the created object we get the createStorage method to store it in the local storage
                updatedTask.createStorage(updatedTask);
            }
            /* This method is to update styles individually, since, is not possible update the taskContainer value by calling the method
            *  Therefore, we need to modify the dom and this is synchronized with change styles method that updates all styles when the page is reloaded.
            * */
            modifyVisual(taskCont,select,statusSet,status);
        }

        const activateInstructions = (event)=>{
            event.preventDefault();
            showDialog();
            showDialog().addEventListener("click", deactivateInstructions);
        }
        const deactivateInstructions = ()=>{
            closeDialog();
        }

        // Listeners that are ready to activate a method according to our actions
        form.addEventListener("submit", createTask); // create task
        taskContainer.addEventListener("click", changeStatus); // change status
        taskContainer.addEventListener("click", deleteTask); // delete tasks
        instruActivateButton.addEventListener("click", activateInstructions);
    }
)();

