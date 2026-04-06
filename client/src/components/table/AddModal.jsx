import { Button, CloseButton, Dialog, Portal, Field, Fieldset, Stack, Input } from "@chakra-ui/react"
import { RiAddBoxFill } from "react-icons/ri"
import { ProjectFields, TaskFields } from "./FieldBody"

export default function AddModal({ onSave, type }) {

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const model = Object.fromEntries(formData.entries())

        if(type === "task") {
            model.project_id = Number(model.project_id)
            model.estimated_hours = Number(model.estimated_hours)
        }
        
        model.priority = Number(model.priority)
        console.log(model)
        onSave?.(model)
  }

  return (
    <Dialog.Root size={{ mdDown: "full", md: "lg" }} placement="center">
      <Dialog.Trigger asChild>
        <Button size="sm">
          <RiAddBoxFill/> Add {type}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{type === 'project' ? 'Add Project' : 'Add Task'}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <form id="edit-form" onSubmit={handleSubmit}>
                <Fieldset.Root size="lg" maxW="md">
                    {type === 'project' ? (
                        <ProjectFields  />
                    ) : (
                        <TaskFields  />
                    )}
                    <Dialog.ActionTrigger asChild>
                      <Button type="submit" form="edit-form">Save</Button>
                    </Dialog.ActionTrigger>
                </Fieldset.Root>
                </form>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}