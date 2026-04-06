import { Field, Fieldset, Input, NativeSelect, For, NumberInput  } from "@chakra-ui/react"
import { MyDatePicker } from "./MyDatePicker"
import { defaultProject, defaultTask } from "../../utils/FormDefault"
// <Input name="start_date" defaultValue={data.start_date} />
export const ProjectFields = ({ data = defaultProject }) => (
  <Fieldset.Content>
    <Field.Root>
    <Field.Root>
        <Input name="id" defaultValue={data.id} hidden={true}/>
    </Field.Root>
      <Field.Label>Name</Field.Label>
      <Input name="name" defaultValue={data.name} />
    </Field.Root>
    <Field.Root>
      <Field.Label>Description</Field.Label>
      <Input name="description" defaultValue={data.description} />
    </Field.Root>
    <Field.Root>
      <Field.Label>Start date</Field.Label>
      <MyDatePicker date={data.start_date} name="start_date"/>
    </Field.Root>
    <Field.Root>
      <Field.Label>Deadline</Field.Label>
      <MyDatePicker date={data.deadline} name="deadline"/>
    </Field.Root>
    <Field.Root>
      <Field.Label>Priority</Field.Label>
        <NumberInput.Root width="200px" defaultValue={data.priority} min={1} max={5}>
        <NumberInput.Control />
        <NumberInput.Input name="priority"/>
        </NumberInput.Root>
    </Field.Root>
    <Field.Root>
      <Field.Label>Status</Field.Label>
      <NativeSelect.Root variant="subtle">
            <NativeSelect.Field name="status" defaultValue={data.status}>
              <For each={["active", "completed"]}>
                {(item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )}
              </For>
            </NativeSelect.Field>
        <NativeSelect.Indicator />
        </NativeSelect.Root>
    </Field.Root>
  </Fieldset.Content>
)

export const TaskFields = ({ data = defaultTask }) => (
  <Fieldset.Content>
    <Field.Root>
        <Input name="id" defaultValue={data.id} hidden={true}/>
    </Field.Root>
    <Field.Root>
      <Input name="project_id" defaultValue={data.project_id}/>
    </Field.Root>
    <Field.Root>
      <Field.Label>Title</Field.Label>
      <Input name="title" defaultValue={data.title} />
    </Field.Root>
    <Field.Root>
      <Field.Label>Created date</Field.Label>
      <MyDatePicker date={data.created_date} name="created_date"/>
    </Field.Root>
    <Field.Root>
      <Field.Label>Deadline</Field.Label>
      <MyDatePicker date={data.deadline} name="deadline"/>
    </Field.Root>
        <Field.Root>
      <Field.Label>Estimated hours</Field.Label>
      <Input name="estimated_hours" defaultValue={data.estimated_hours} />
    </Field.Root>
    <Field.Root>
      <Field.Label>Priority</Field.Label>
        <NumberInput.Root width="200px" defaultValue={data.priority} min={1} max={5}>
        <NumberInput.Control />
        <NumberInput.Input name="priority"/>
        </NumberInput.Root>
    </Field.Root>
    <Field.Root>
      <Field.Label>Status</Field.Label>
      <NativeSelect.Root variant="subtle">
            <NativeSelect.Field name="status">
              <For each={["todo", "in_progress", "done"]}>
                {(item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )}
              </For>
            </NativeSelect.Field>
        <NativeSelect.Indicator />
        </NativeSelect.Root>
    </Field.Root>
  </Fieldset.Content>
)