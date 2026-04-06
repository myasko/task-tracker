
import { DataList, Stack } from "@chakra-ui/react"

export default function ProjectInfo( { project = {},  } ) {
    let isHide = true
    if(project) isHide = false 
    else return
    (project)
    return (
    <Stack gap="8" marginTop="5" hidden={isHide}>
        <DataList.Root variant="subtle" key="bold" divideY="1px" marginRight="5">
          <DataList.Item key={1} marginLeft="5">
            <DataList.ItemLabel >Project name</DataList.ItemLabel>
            <DataList.ItemValue>{project.name}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item key={2} marginLeft="5">
            <DataList.ItemLabel >Start date</DataList.ItemLabel>
            <DataList.ItemValue>{project.start_date}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item key={3} marginLeft="5">
            <DataList.ItemLabel >Deadline</DataList.ItemLabel>
            <DataList.ItemValue>{project.deadline}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item key={4} marginLeft="5">
            <DataList.ItemLabel >Status</DataList.ItemLabel>
            <DataList.ItemValue>{project.status}</DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
    </Stack>
  )
}

const stats = [
  { id: 1, name: "New Users", status: "234", diff: -12, helpText: "Till date" },
  { id: 2, name: "Sales", status: "£12,340", diff: 12, helpText: "Last 30 days" },
  { id: 3, name: "Revenue", status: "3,450", diff: 4.5, helpText: "Last 30 days" },
]