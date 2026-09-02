import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import RegisterChoice from './pages/RegisterChoice';
import RegisterJobSeeker from './pages/RegisterJobSeeker';
import RegisterCompany from './pages/RegisterCompany';
import Dashboard from './pages/Dashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import CompanyJobPostings from './pages/CompanyJobPostings';
import CompanyApplicants from './pages/CompanyApplicants';
import CompanyCandidateDetail from './pages/CompanyCandidateDetail';
import CompanyPostJob from './pages/CompanyPostJob';
import ChatList from './pages/ChatList';
import RoomChat from './pages/RoomChat';
import Profile from './pages/Profile';
import AboutPage from './pages/AboutPage';
import CompanyProfile from './pages/CompanyProfile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterChoice />} />
          <Route path="/register/pencari-kerja" element={<RegisterJobSeeker />} />
          <Route path="/register/perusahaan" element={<RegisterCompany />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRole="job_seeker">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard"
            element={
              <ProtectedRoute allowedRole="company">
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-post-job"
            element={
              <ProtectedRoute allowedRole="company">
                <CompanyPostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-job-postings"
            element={
              <ProtectedRoute allowedRole="company">
                <CompanyJobPostings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-applicants"
            element={
              <ProtectedRoute allowedRole="company">
                <CompanyApplicants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-candidate-detail"
            element={
              <ProtectedRoute allowedRole="company">
                <CompanyCandidateDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRole="job_seeker">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-profile"
            element={
              <ProtectedRoute allowedRole="company">
                <CompanyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute allowedRole="job_seeker">
                <ChatList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute allowedRole="job_seeker">
                <RoomChat />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
