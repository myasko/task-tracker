import {  statusCount } from '../http/taskAPI';

export default async function getStatusCount( project_id = null ) {
    const countTodo = await statusCount("todo", project_id)
    const countInp = await statusCount("in_progress", project_id)
    const countDone = await statusCount("done", project_id)
    

    return [
      { name: "todo",  value: Number(countTodo[0].count), color: "blue.solid" },
      { name: "in progress",  value: Number(countInp[0].count),  color: "yellow.solid" },
      { name: "done", value: Number(countDone[0].count), color: "green.solid" },
    ]
}