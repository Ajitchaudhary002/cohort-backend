import AppRoutes from "./AppRoutes"
import './style.scss'
import { AuthProvider } from "./features/auth.context.jsx"

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
