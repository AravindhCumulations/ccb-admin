import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignInPage from './page/SignIn'
import DashboardPage from './page/DashboardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

export default App;