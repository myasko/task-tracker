import { $host } from "./index";

export const fetchAllProjects = async () => {
    const {data} = await $host.get('api/project?limit=1000000')
    return data
}

export const fetchProjects = async (page = 1, limit = 5) => {
    const {data} = await $host.get('api/project', {params: {
         limit, page 
        }})
    return data
}

export const getOneProject = async (id) => {
    const {data} = await $host.get('api/project/' + id )
    return data
}

export const createProject = async (project) => {
    const {data} = await $host.post('api/project', project)
    return data
}

export const updateProject = async (project) => {
    const {data} = await $host.put('api/project', project)
    return data
}

export const deleteProject = async (id) => {
    const {data} = await $host.delete('api/project/' + id)
    return data
}