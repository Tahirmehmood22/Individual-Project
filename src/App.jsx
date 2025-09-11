import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./pages/static/Settings";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import { Suspense, lazy } from "react";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <ErrorBoundary>
              <div className="flex min-h-screen">
                <Sidebar
                  isLoggedIn={true}
                  onLogout={() => {}}
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
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
              </div>
            </ErrorBoundary>
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;


