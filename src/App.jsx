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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard"
            element={
              <ProtectedRoute>
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-post-job"
            element={
              <ProtectedRoute>
                <CompanyPostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-job-postings"
            element={
              <ProtectedRoute>
                <CompanyJobPostings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-applicants"
            element={
              <ProtectedRoute>
                <CompanyApplicants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-candidate-detail"
            element={
              <ProtectedRoute>
                <CompanyCandidateDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
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
