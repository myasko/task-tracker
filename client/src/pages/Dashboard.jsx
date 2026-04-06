import React, { useState, useEffect, useMemo }from 'react'
import { SimpleGrid, Box, createListCollection, Skeleton, AbsoluteCenter } from "@chakra-ui/react"
import SelectProject from '../components/dashboard/SelectProject'
import DonutChart from '../components/dashboard/DonutChart'
import PriorityChart from '../components/dashboard/PriorityChart'
import TableDash from '../components/dashboard/TableDash'
import { fetchProjects, fetchAllProjects, getOneProject } from '../http/projectAPI'
import { fetchTasks, fetchTasksByProject  } from '../http/taskAPI'
import getStatusCount from '../utils/donutChartData'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallBack from '../components/ErrorFallback'
import showErrorToast from '../components/ui/ShowToast'


export default function Dashboard(){ // C TanStack Query было бы проще
    const [projectsRowData, setProjectsRowData] = useState([])
    const [tasksRowData, setTasksRowData] = useState([])
    const [countData, setCountData] = useState([])

    const [loadingProjects, setLoadingProjects] = useState(true)
    const [loadingTasks, setLoadingTasks] = useState(true)
    const [loadingCounts, setLoadingCounts] = useState(true)
    const [loadingTable, setLoadingTable] = useState(true)

    const [selectedProjectId, setSelectedProjectId] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)

    const[tableDashData, setTableDashData] = useState([])
    const[tableDashType, setTableDashType] = useState("projects")

    const [projectsPage, setProjectsPage] = useState(1);
    const [tasksPage, setTasksPage] = useState(1);

    const [projectsLimit, setProjectsLimit] = useState(5);
    const [tasksLimit, setTasksLimit] = useState(5);

    const [projectsCount, setProjectsCount] = useState(0);
    const [tasksCount, setTasksCount] = useState(0);

    useEffect(() => {
        fetchAllProjects().then( data => setProjectsRowData(data.rows)).catch(showErrorToast).finally(() => setLoadingProjects(false))
        fetchProjects(projectsPage, projectsLimit).then(data => {
            setTableDashData(data.rows)
            setProjectsCount(data.count)
            setTableDashType("projects")
        }).catch(showErrorToast)
        fetchTasks().then( data => setTasksRowData(data.rows)).catch(showErrorToast).finally(() => setLoadingTasks(false))
        getStatusCount().then(data => setCountData(data)).catch(showErrorToast).finally(() => setLoadingCounts(false))
    }, [selectedProjectId]);

    useEffect(() => {
        if (!selectedProjectId) return 
        setLoadingTasks(true)
        setLoadingCounts(true)

        fetchTasksByProject(selectedProjectId).then( data => {
            setTasksRowData(data.rows)
            setTableDashData(data.rows)
            setTasksCount(data.count)
            setTableDashType("tasks")
        })
        .catch(showErrorToast)
        .finally(() => {
            getOneProject(selectedProjectId).then(data => setSelectedProject(data))
            getStatusCount(selectedProjectId).then(data => setCountData(data)).finally(() => setLoadingCounts(false))
            setLoadingTasks(false)
        })
    }, [selectedProjectId])

    useEffect(()=> {
        setLoadingTable(true)
        fetchProjects(projectsPage, projectsLimit).then( data => {
            setTableDashData(data.rows)
            setProjectsCount(data.count)
        }
        )
        .catch(showErrorToast)
        .finally(() => setLoadingTable(false))

    },[projectsPage, projectsLimit])

    useEffect(()=> {
        if (!selectedProjectId) return;
        setLoadingTable(true)
        fetchTasksByProject(selectedProjectId, tasksPage, tasksLimit).then( data => {
            setTasksRowData(data.rows)
            setTasksCount(data.count)
        }
        )
        .catch(showErrorToast)
        .finally(() => setLoadingTable(false))

    },[tasksPage, tasksLimit])

    const projectsCollection = useMemo(() => 
        createListCollection({
            items: projectsRowData.map(p => ({ label: p.name , value: p.id }))
        }), 
        [projectsRowData])


    const counts = useMemo(() => {  
      const data = tableDashType === "projects" ? projectsRowData : tasksRowData;
  
      return data.reduce((acc, obj) => {
        const val = obj.priority 
        acc[val] = (acc[val] || 0) + 1
        return acc
      }, {})
    }, [tableDashType, projectsRowData, tasksRowData])

    
    const isProjects = tableDashType === "projects"
    const currentPage = isProjects ? projectsPage : tasksPage
    const currentCount = isProjects ? projectsCount : tasksCount

    const handlePageChange = (newPage) => {
      if (isProjects) setProjectsPage(newPage)
      else setTasksPage(newPage)
    }


    return (
        <SimpleGrid columns={2} columnGap="2" rowGap="2" h="100" w="100" p="4">
            <Skeleton asChild loading={loadingProjects}>
                <Box h="400px" w="100%" background="bg.muted" shadow="lg" borderRadius="md">
                    <SelectProject projects={projectsCollection} onValueChange={setSelectedProjectId} project={selectedProject}/>
                </Box>
            </Skeleton>
            <Skeleton asChild loading={loadingCounts}>
                <Box h="400px" w="100%" background="bg.muted" shadow="lg" borderRadius="md" > <DonutChart data={countData}/> </Box>
            </Skeleton>
            <Skeleton asChild loading={loadingProjects}>
                <Box h="400px" w="100%" background="bg.muted" shadow="lg" borderRadius="md" > <PriorityChart counts={counts}/></Box>
            </Skeleton>
            <Skeleton asChild loading={loadingTasks}>
                <Box h="400px" w="100%" background="bg.muted" shadow="lg" borderRadius="md">
                    <TableDash
                    items={tableDashData} 
                    type={tableDashType}
                    page={currentPage}
                    count={currentCount}
                    onPageChange={handlePageChange}
                    /> 
                </Box>
            </Skeleton>
        </SimpleGrid> 
    )
}

