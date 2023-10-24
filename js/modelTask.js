class Task{
    constructor(id, description,status) {
        this.id = id;
        this.description = description;
        this.status = status;
    }

    createStorage = (taskObj)=>{
        const strTaskObj = JSON.stringify(taskObj);
        localStorage.setItem(taskObj.id, strTaskObj);
    }

    getAllStorages = ()=>{
        let tasks = localStorage;
        return tasks;
    }

    getStorage = (id) => {
        return localStorage.getItem(id.toString());
    }

    removeAllStorage = ()=>{
        localStorage.clear();
    }

    removeStorageById = (id)=>{
        localStorage.removeItem(id);
    }
}

export {Task};










