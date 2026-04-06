import { React, useState, useMemo, useEffect, } from 'react'
import { AllCommunityModule } from "ag-grid-community"
import { Stack, StackSeparator, Box } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/toast"
import { AgGridProvider, AgGridReact } from "ag-grid-react"
import Table from '../components/table/Table'
import { fetchProjects, deleteProject, createProject, updateProject } from '../http/projectAPI'
import { fetchTasks, deleteTask, updateTask, createTask } from '../http/taskAPI'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallBack from '../components/ErrorFallback'
import showErrorToast from '../components/ui/ShowToast'

export default function Tables(){

    const [projectsRowData, setProjectsRowData] = useState([]);
    const [tasksRowData, setTasksRowData] = useState([]);

    const [loadingProjects, setLoadingProjects] = useState(true)
    const [loadingTasks, setLoadingTasks] = useState(true)

    const [projectsPage, setProjectsPage] = useState(1);
    const [tasksPage, setTasksPage] = useState(1);

    const [projectsLimit, setProjectsLimit] = useState(5);
    const [tasksLimit, setTasksLimit] = useState(5);

    const [projectsCount, setProjectsCount] = useState(0);
    const [tasksCount, setTasksCount] = useState(0);

    const [projectsRefresh, setProjectsRefresh] = useState(0);
    const [tasksRefresh, setTasksRefresh] = useState(0);

    const handleCreate = async (model, type) => {
       try {
            if(type === "project") {
                await createProject(model)
                setProjectsRefresh(prev => prev + 1)
            } else if (type === 'task') {
                await createTask(model)
                setTasksRefresh(prev => prev + 1)
            }
            
        } catch (error) {
           showErrorToast(error)
        } 
    }

    const handleDelete = async (type, id) => {
        try {
            if(type === "project") {
                await deleteProject(id)
                setProjectsRefresh(prev => prev + 1)
            } else if (type === 'task') {
                await deleteTask(id)
                setTasksRefresh(prev => prev + 1)
            }
            
        } catch (error) {
            showErrorToast(error)
        } 
    }

    const handleEdit = async (model, type) => {
        console.log(model)
        console.log(type)

       try {
            if(type === "project") {
                await updateProject(model)
                setProjectsRefresh(prev => prev + 1)
            } else if (type === 'task') {
                await updateTask(model)
                setTasksRefresh(prev => prev + 1)
            }
            
        } catch (error) {
            showErrorToast(error)
        } 
    }

    useEffect(() => {
        fetchProjects(projectsPage, projectsLimit).then( data => {
            setProjectsRowData(data.rows)
            setProjectsCount(data.count)
        }
        )
        .catch(showErrorToast)
        .finally(() => setLoadingProjects(false))

        fetchTasks(tasksPage, tasksLimit).then( data => {
            setTasksRowData(data.rows)
            setTasksCount(data.count)
        }
        )
        .catch(showErrorToast)
        .finally(() => setLoadingTasks(false))
    }, [])

    useEffect(()=> {
        setLoadingProjects(true)
        fetchProjects(projectsPage, projectsLimit).then( data => {
            setProjectsRowData(data.rows)
            setProjectsCount(data.count)
        }
        )
        .catch(showErrorToast)
        .finally(() => setLoadingProjects(false))

    },[projectsPage, projectsLimit, projectsRefresh])

    useEffect(()=> {
        setLoadingTasks(true)
        fetchTasks(tasksPage, tasksLimit).then( data => {
            setTasksRowData(data.rows)
            setTasksCount(data.count)
        }
        )
        .catch(showErrorToast)
        .finally(() => setLoadingTasks(false))

    },[tasksPage, tasksLimit, tasksRefresh])

    return (
        <Stack h="100%"  p="4">
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <AgGridProvider modules={[AllCommunityModule]}>
                <Box h="50%" minW="50%" maxW="100%">
                    <Table 
                    type="project" 
                    data={projectsRowData} 
                    count={projectsCount} 
                    limit={projectsLimit} 
                    page={projectsPage} 
                    onPageChange={setProjectsPage} 
                    onLimitChange={setProjectsLimit}
                    onDeleteItem={handleDelete}
                    onEditItem={handleEdit}
                    onCreateItem={handleCreate}
                    loading={loadingProjects}
                    />
                </Box>
                <Box h="50%" w="100%">
                    <Table 
                    type="task"
                    data={tasksRowData}
                    count={tasksCount}
                    limit={tasksLimit}
                    page={tasksPage} 
                    onPageChange={setTasksPage} 
                    onLimitChange={setTasksLimit}
                    onDeleteItem={handleDelete}
                    onEditItem={handleEdit}
                    onCreateItem={handleCreate}
                    loading={loadingTasks}
                    />
                </Box>
            </AgGridProvider>
        </ErrorBoundary>
        </Stack>
  );
}