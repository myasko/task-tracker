import React from "react";
import { Portal, Select, Heading, Box } from "@chakra-ui/react"
import ProjectInfo from "./ProjectInfo";


export default function SelectProject({ projects, onValueChange, project, ...props }) {
    return (
        <Box>
            <Select.Root variant="outline" collection={projects} onValueChange={(e) => onValueChange(e.value[0])}
             size="sm" width="320px" marginTop="2" marginLeft="4">
                <Select.HiddenSelect />
                <Heading  size="2xl">Projects</Heading>
                <Select.Control >
                    <Select.Trigger >
                        <Select.ValueText placeholder="Select project"/>
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.ClearTrigger  onClick={() => onValueChange(null)}/>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {projects.items.map((project) => (
                            <Select.Item item={project} key={project.value}>
                                {project.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
            <ProjectInfo project={project}></ProjectInfo>
        </Box>     
  )
}