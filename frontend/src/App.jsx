import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { PrivateRoute } from './routes/PrivateRoute'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'

import AdminDashboard from './pages/admin/Dashboard'
import AdminTeachers from './pages/admin/Teachers'
import AdminReports from './pages/admin/Reports'

import TeacherDashboard from './pages/teacher/Dashboard'
import TeacherClassrooms from './pages/teacher/Classrooms'
import TeacherActivities from './pages/teacher/Activities'
import TeacherStudents from './pages/teacher/Students'

import StudentDashboard from './pages/student/Dashboard'
import StudentActivities from './pages/student/Activities'
import StudentShop from './pages/student/Shop'
import StudentProgress from './pages/student/Progress'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing page e login */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin */}
          <Route path="/admin" element={<PrivateRoute allowedRoles={['ADMIN']}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/teachers" element={<PrivateRoute allowedRoles={['ADMIN']}><AdminTeachers /></PrivateRoute>} />
          <Route path="/admin/reports" element={<PrivateRoute allowedRoles={['ADMIN']}><AdminReports /></PrivateRoute>} />

          {/* Teacher */}
          <Route path="/teacher" element={<PrivateRoute allowedRoles={['TEACHER']}><TeacherDashboard /></PrivateRoute>} />
          <Route path="/teacher/classrooms" element={<PrivateRoute allowedRoles={['TEACHER']}><TeacherClassrooms /></PrivateRoute>} />
          <Route path="/teacher/activities" element={<PrivateRoute allowedRoles={['TEACHER']}><TeacherActivities /></PrivateRoute>} />
          <Route path="/teacher/students" element={<PrivateRoute allowedRoles={['TEACHER']}><TeacherStudents /></PrivateRoute>} />

          {/* Student */}
          <Route path="/student" element={<PrivateRoute allowedRoles={['STUDENT']}><StudentDashboard /></PrivateRoute>} />
          <Route path="/student/activities" element={<PrivateRoute allowedRoles={['STUDENT']}><StudentActivities /></PrivateRoute>} />
          <Route path="/student/shop" element={<PrivateRoute allowedRoles={['STUDENT']}><StudentShop /></PrivateRoute>} />
          <Route path="/student/progress" element={<PrivateRoute allowedRoles={['STUDENT']}><StudentProgress /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
