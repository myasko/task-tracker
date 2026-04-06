import { Chart, useChart, } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis, LabelList } from "recharts"
import { VStack, Heading, Center } from "@chakra-ui/react"

export default function PriorityChart( { counts = [] }) {
  const chart = useChart({
    data: [
      { allocation: counts[5] ?? 0, type: "5", color: "red.solid" },
      { allocation: counts[4] ?? 0, type: "4", color: "orange.solid" },
      { allocation: counts[3] ?? 0, type: "3", color: "yellow.solid" },
      { allocation: counts[2] ?? 0, type: "2", color: "green.solid" },
      { allocation: counts[1] ?? 0, type: "1", color: "green.fg" },
    ],
  })

  return (
    <VStack gap="5" >
    <Heading size="2xl">Priority</Heading >
    <Chart.Root maxH="xs" chart={chart} maxW="2xl">
      <BarChart data={chart.data} responsive barSize={40} >
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis axisLine={false} tickLine={false} dataKey={chart.key("type")} />
        <YAxis
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          radius={10}
          isAnimationActive={true}
          dataKey={chart.key("allocation")}
          shape={(props) => (
            <Rectangle {...props} fill={chart.color(props.color)} />
          )}
        >
          <LabelList
            dataKey={chart.data.allocation}
            position="top"
            style={{ fontWeight: "600", fill: chart.color("fg") }}
          />
        </Bar>
      </BarChart>
    </Chart.Root>
    </VStack>
  )
}