import { React, useState, useMemo, } from 'react';
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { AddButton, DeleteButton, EditButton } from "./TableButtons"


import {
  ButtonGroup,
  IconButton,
  Pagination,
  Box,
  VStack,
  Button,
  HStack
} from "@chakra-ui/react"
import { LuChevronRight, LuChevronLeft  } from "react-icons/lu"


export default function Table({ type, data, count, page, limit, onPageChange, loading, onDeleteItem, onEditItem, onCreateItem }) {

    const projectColumns =  useMemo(() =>[
        { field: "name" }, //name, description, start_date, deadline, priority
        { field: "description"},
        { field: "start_date", editable: true, headerName: "Start date" },
        { field: "deadline" },
        { field: "priority" },
        { field: "status" },
        { 
            headerName: "", 
            cellRenderer: DeleteButton,
            cellRendererParams: {
                onDelete: (id) => {
                    console.log("УДАЛИЛ " + id)
                    onDeleteItem?.('project', id)
                }
            },
            width: 70
        },
        { 
            headerName: "", 
            cellRenderer: (params) => (
                <EditButton
                    type="project"
                    data={params.data} 
                    onUpdate={(model) => onEditItem?.(model, "project")}
                 />
            ),
            width: 70 
        }
    ])

    const taskColumns =  useMemo(() =>[
        // { field: "project_id", headerName: "Project id"},
        { field: "title", }, 
        { field: "created_date", headerName: "Created date"},
        { field: "deadline", editable: true },
        { field: "estimated_hours", headerName: "Estimated hours " },
        { field: "priority", },
        { field: "status", },
        { 
            headerName: "", 
            cellRenderer: DeleteButton,
            cellRendererParams: {
                onDelete: (id) => onDeleteItem?.('task', id)
            },
            width: 70
        },
        { 
            headerName: "", 
            cellRenderer: (params) => (
                <EditButton
                    type="task"
                    data={params.data} 
                    onUpdate={(model) => onEditItem?.(model, "task")}
                 />
            ),
            width: 70 
        }
    ])
    const colDefs = type === "task" ? taskColumns : projectColumns;
    return(
        <>
        <div style={{ width: '80%', height: '80%' }}>
            <AgGridReact
            rowData={data || []}
            columnDefs={colDefs}
            loading={loading}
        />
        </div>
        <HStack>
        <Pagination.Root
            count={count}
            pageSize={limit}
            page={page}
            onPageChange={(e) => onPageChange(e.page)}
            h="20"
        >
          <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>
            <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                  {page.value}
                </IconButton>
              )}
            />
            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
        <AddButton type={type} onCreate={(model) => onCreateItem?.(model, type)}></AddButton>
        </HStack>
        </>
    )
}

