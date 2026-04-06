import { $host } from "./index";

export const fetchTasks = async (page = 1, limit = 5) => {
    const {data} = await $host.get('api/task', {params: {
         limit, page 
        }})
    return data
}

export const fetchAllTasks = async (page = 1, limit = 10000000) => {
    const {data} = await $host.get('api/task', {params: {
         limit, page 
        }})
    return data
}

export const fetchTasksByProject = async (project_id, page = 1, limit= 5) => {
    const {data} = await $host.get('api/task/' + project_id, {params: {
         limit, page 
        }})
    return data
}

export const statusCount = async (status, project_id = null ) => {
    const {data} = await $host.get('api/task/status', {params: {
        status, project_id  
        }})
    return data[0]
}

export const createTask = async (task) => {
    const {data} = await $host.post('api/task', task)
    return data
}

export const updateTask = async (task) => {
    const {data} = await $host.put('api/task', task)
    return data
}

export const deleteTask = async (id) => {
    const {data} = await $host.delete('api/task/' + id)
    return data
}
