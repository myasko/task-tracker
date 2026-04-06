import { DatePicker, Portal, parseDate, Button  } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

const format = (date) => {
  const day = date.day.toString().padStart(2, "0")
  const month = date.month.toString().padStart(2, "0")
  const year = (date.year).toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const MyDatePicker = ({date = "2024-12-31", name}) => (
    <DatePicker.Root maxWidth="20rem" defaultValue={[parseDate(date)]} name={name} format={format}>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
              <DatePicker.Context>
                {(api) => (
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => api.selectToday()}
                  >
                    Today
                  </Button>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
)