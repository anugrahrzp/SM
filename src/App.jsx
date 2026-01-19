import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Onboarding from './components/onboarding/Onboarding'
import Dashboard from './components/dashboard/Dashboard'
import DashboardV2 from './components/dashboard/DashboardV2'
import AISearchResults from './components/AISearchResults'
import Members from './components/members/Members'
import MemberProfile from './components/members/MemberProfile'
import BusinessProfile from './components/members/BusinessProfile'
import MyProfile from './components/profile/MyProfile'
import { OnboardingProvider } from './context/OnboardingContext'
import './styles/App.css'

// Wrapper component for onboarding with provider
function OnboardingWrapper() {
  return (
    <OnboardingProvider>
      <Onboarding />
    </OnboardingProvider>
  )
}

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <div className="mobile-frame">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<OnboardingWrapper />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-v2" element={<DashboardV2 />} />
            <Route path="/ai-search" element={<AISearchResults />} />
            <Route path="/members" element={<Members />} />
            <Route path="/member/:id" element={<MemberProfile />} />
            <Route path="/business/:id" element={<BusinessProfile />} />
            <Route path="/profile" element={<MyProfile />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}

export default App
