import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import { Box, HStack, StackSeparator } from '@chakra-ui/react'
import MainPanel from './components/MainPanel'
import { DarkMode, LightMode } from './components/ColorMode'
import Dashboard from './pages/Dashboard'
import Tables from './pages/Tables'


function App() {

  return (
    <BrowserRouter>
      <HStack 
      minH="100vh"
      width="100vw"
      spacing={0}
      align="stretch"
      separator={<StackSeparator />}
      >
        <Sidebar />
          <MainPanel flex={1}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tables" element={<Tables />} />
            </Routes>
          </MainPanel>
        </HStack>
    </BrowserRouter>
    
  )
}

export default App
