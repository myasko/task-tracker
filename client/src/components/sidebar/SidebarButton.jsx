import {
  Button,
} from "@chakra-ui/react"
import * as React from "react"
import {RiHome2Fill} from "react-icons/ri"

export default function SideButton() {
  return(
      <Button
       variant="surface"
       onClick= {() => ("clicked")}
       >
        <RiHome2Fill/>
        hdsfbshdfsdfs
      </Button>
  )

}