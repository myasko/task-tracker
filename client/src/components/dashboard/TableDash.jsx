import {
  ButtonGroup,
  Heading,
  IconButton,
  Pagination,
  Stack,
  Table,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export default function TableDash({ items = [], type = "projects", page = 1, limit = 5, count = 0, onPageChange }) {

  const tableConfig = {
    projects: {
      heading: "Projects",
      columns: [
        { header: "Name", key: "name" },
        { header: "Deadline", key: "deadline" },
        { header: "Priority", key: "priority", align: "end" }
      ]
    },
    tasks: {
      heading: "Tasks",
      columns: [
        { header: "Title", key: "title" },
        { header: "Status", key: "status" },
        { header: "Priority", key: "priority", align: "end" }
      ]
    }
  }

  const config = tableConfig[type] || tableConfig.projects;
  (items)
  return (
    <Stack  gap="5" p="2">
      <Heading  size="2xl">{config.heading}</Heading>
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            {config.columns.map((col, idx) => (
              <Table.ColumnHeader key={idx} textAlign={col.align}>
                {col.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              {config.columns.map((col, idx) => (
                <Table.Cell key={idx} textAlign={col.align}>
                  {item[col.key] ?? "—"}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination.Root
          count={count}
          pageSize={5}
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
    </Stack>
  )
}
