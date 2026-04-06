import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider , DarkMode } from "./ColorMode"

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}