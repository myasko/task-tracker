import { Provider } from "./components/Provider.jsx"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "./components/ui/toaster.jsx"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Toaster />
      <App />
    </Provider>
  </StrictMode>,
)