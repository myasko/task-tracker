import { Chart, useChart } from "@chakra-ui/charts"
import { Box, HStack, VStack, Heading, Separator, Text, For } from "@chakra-ui/react"
import { Pie, PieChart, Sector, Tooltip, Label  } from "recharts"

export default function DonutChart({ data = [] }) {

  const chart = useChart({data: data })

  return (
    <VStack gap="20" p={2}>
        <Chart.Root boxSize="200px" chart={chart} mx="auto">
          <PieChart responsive> // margin= left: 0, top: 70, right: 0, bottom: 0 
            <Tooltip
              cursor={false}
              animationDuration={100}
              content={<Chart.Tooltip hideLabel />}
            />
            <Pie
              innerRadius={80}
              outerRadius={100}
              isAnimationActive={true}
              data={chart.data}
              dataKey={chart.key("value")}
              nameKey="name"
              labelLine={{ strokeWidth: 1 }}
              label={{
                fill: chart.color("fg.muted"),
              }}
              shape={(props) => (
                <Sector
                  {...props}
                  strokeWidth={2}
                  fill={chart.color(props.color)}
                />
              )}
            />
            <Label
            content={({ viewBox }) => (
              <Chart.RadialText
                viewBox={viewBox}
                title={chart.getTotal("value").toLocaleString()}
                description="Tasks"
              />
            )}
          />
          </PieChart>
        </Chart.Root>
        <HStack gap="3">
            <For each={chart.data}>
                {(item) => (
                    <HStack key={item.name}>
                        <Text fontWeight="semibold">{item.name + ": "}</Text>
                        <Text fontWeight="semibold">{item.value}</Text>
                        <Separator orientation="vertical" height="6" /> 
                    </HStack>
                )}
            </For>
        </HStack>
    </VStack>
  )
}