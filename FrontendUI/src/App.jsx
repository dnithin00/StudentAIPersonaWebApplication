import { Route, Routes } from 'react-router-dom'
import StudentKiosk from './components/StudentKiosk'
import TeacherDashboard from './components/TeacherDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentKiosk />} />
      <Route path="/dashboard" element={<TeacherDashboard />} />
    </Routes>
  )
}

export default App
