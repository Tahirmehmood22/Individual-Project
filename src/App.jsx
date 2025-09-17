import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CompleteProfile from "./pages/CompleteProfile";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./pages/static/Settings";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import { SportProvider } from "@/context/SportContext";
import { Suspense, lazy, useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AnalyticsDaily = lazy(() => import("./pages/analytics/Daily"));
const AnalyticsWeekly = lazy(() => import("./pages/analytics/Weekly"));
const AnalyticsMonthly = lazy(() => import("./pages/analytics/Monthly"));
const Achievements = lazy(() => import("./pages/static/Achievements"));
const Goals = lazy(() => import("./pages/static/Goals"));
const Training = lazy(() => import("./pages/static/Training"));
const TrainingPlan = lazy(() => import("./pages/static/TrainingPlan"));
const SetGoals = lazy(() => import("./pages/static/SetGoals"));
const Practice = lazy(() => import("./pages/static/Practice"));
const Results = lazy(() => import("./pages/static/Results"));
const Assessment = lazy(() => import("./pages/static/Assessment"));
const EditProfile = lazy(() => import("./pages/static/EditProfile"));
const SkillDetails = lazy(() => import("./pages/SkillDetails"));
const NewAssessment = lazy(() => import("./pages/static/NewAssessment"));
const ScheduleTraining = lazy(() => import("./pages/static/ScheduleTraining"));
const RecordPractice = lazy(() => import("./pages/static/RecordPractice"));
const CompetitionResults = lazy(() => import("./pages/static/CompetitionResults"));
const SkillManagement = lazy(() => import("./components/SkillManagement"));

const queryClient = new QueryClient();

// Check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

// Check if user profile is complete
const isProfileComplete = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const profileCompleted = localStorage.getItem("profileCompleted") === "true";
  const profileSkipped = localStorage.getItem("profileSkipped") === "true";
  
  // Check if user has completed profile or is demo user (Ram Charan)
  return profileCompleted || profileSkipped || currentUser.username === "player";
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [profileComplete, setProfileComplete] = useState(() => {
    return isProfileComplete();
  });

  // Listen for authentication changes
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isLoggedIn") === "true";
      const isProfileComp = isProfileComplete();
      setAuthenticated(isAuth);
      setProfileComplete(isProfileComp);
    };

    // Check authentication on mount
    checkAuth();

    // Listen for storage changes (for cross-tab synchronization)
    window.addEventListener('storage', checkAuth);
    
    // Listen for custom authentication events
    window.addEventListener('authChange', checkAuth);
    
    // Listen for profile completion events
    window.addEventListener('profileCompleted', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('profileCompleted', checkAuth);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SportProvider>
          <LanguageProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <TooltipProvider>
                <ErrorBoundary>
                  <Routes>
                    {/* If not authenticated, show login/signup pages */}
                    {!authenticated && (
                      <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="*" element={<Login />} /> {/* Redirect all other routes to login */}
                      </>
                    )}
                    
                    {/* If authenticated but profile incomplete, show complete profile page */}
                    {authenticated && !profileComplete && (
                      <>
                        <Route path="/complete-profile" element={<CompleteProfile />} />
                        <Route path="*" element={<CompleteProfile />} /> {/* Redirect to complete profile */}
                      </>
                    )}
                    
                    {/* If authenticated and profile complete, show protected app with sidebar */}
                    {authenticated && profileComplete && (
                      <Route path="*" element={
                        <div className="flex min-h-screen">
                          <Sidebar
                            isLoggedIn={true}
                            onLogout={() => {
                              localStorage.removeItem("isLoggedIn");
                              localStorage.removeItem("currentUser");
                              localStorage.removeItem("userData");
                              localStorage.removeItem("userSport");
                              localStorage.removeItem("profileCompleted");
                              localStorage.removeItem("profileSkipped");
                              setAuthenticated(false);
                              setProfileComplete(false);
                              // Trigger authentication change event
                              window.dispatchEvent(new Event('authChange'));
                              // Small delay to ensure state updates before navigation
                              setTimeout(() => {
                                window.location.href = '/login';
                              }, 100);
                            }}
                            skills={[]}
                          />
                          <main className="flex-1">
                            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                              <Routes>
                                <Route path="/" element={<Index />} />
                                <Route path="/achievements" element={<Achievements />} />
                                <Route path="/goals" element={<Goals />} />
                                <Route path="/training" element={<ScheduleTraining />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/practice" element={<RecordPractice />} />
                                <Route path="/results" element={<CompetitionResults />} />
                                <Route path="/assessment" element={<Assessment />} />
                                <Route path="/new-assessment" element={<NewAssessment />} />
                                <Route path="/profile/edit" element={<EditProfile />} />
                                <Route path="/schedule-training" element={<ScheduleTraining />} />
                                <Route path="/record-practice" element={<RecordPractice />} />
                                <Route path="/competition-results" element={<CompetitionResults />} />
                                <Route path="/training-plan" element={<TrainingPlan />} />
                                <Route path="/set-goals" element={<SetGoals />} />
                                <Route path="/analytics/daily" element={<AnalyticsDaily />} />
                                <Route path="/analytics/weekly" element={<AnalyticsWeekly />} />
                                <Route path="/analytics/monthly" element={<AnalyticsMonthly />} />
                                <Route path="/skills/details" element={<SkillDetails />} />
                                <Route path="/skills/manage" element={<SkillManagement />} />
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            </Suspense>
                          </main>
                        </div>
                      } />
                    )}
                  </Routes>
                </ErrorBoundary>
              </TooltipProvider>
            </ThemeProvider>
          </LanguageProvider>
        </SportProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;


