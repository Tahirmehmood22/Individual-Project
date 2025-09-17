import { PlayerProfile } from "./PlayerProfile";
import { useSport } from "../context/SportContext";
import { calculateUserStatistics } from "@/utils/userDataUtils";
import { useEffect, useState } from "react";
import { SkillTracker } from "./SkillTracker";
import { PerformanceChart } from "./PerformanceChart";
import { PhysicalStrength } from "./PhysicalStrength";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Calendar, TrendingUp, Zap, Star, Award, Sparkles, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/badminton-hero-enhanced.jpg";
import { motion } from "framer-motion";

// Mock data for demonstration
const mockPlayer = {
	name: "Ram Charan Teja",
	age: 9,
	dateOfBirth: "2015-03-15",
	height: "130 cm",
	weight: "28 kg",
	location: "Stockholm, Sweden",
	level: "Rising Star",
	avatar: "https://content.tournamentsoftware.com/images/profile/3C3E88CA-FA0B-43B0-81E3-C5A8BC84F0EF/xlarge/9FB22704-6740-4049-A08B-D394C186C987.jpg?v=20250504153119"
};

const mockSkills = [
	{ name: "Forehand Clear", level: 7, maxLevel: 10, category: "technique", improvement: 3 },
	{ name: "Backhand Drop", level: 5, maxLevel: 10, category: "technique", improvement: 2 },
	{ name: "Lightning Footwork", level: 8, maxLevel: 10, category: "physical", improvement: 4 },
	{ name: "Strategic Mind", level: 4, maxLevel: 10, category: "mental", improvement: 2 },
	{ name: "Precision Serve", level: 6, maxLevel: 10, category: "technique", improvement: 1 },
	{ name: "Power Smash", level: 6, maxLevel: 10, category: "physical", improvement: 3 },
];

const mockPhysicalMetrics = [
	{ name: "Upper Body Strength", value: 72, maxValue: 100, category: "strength", lastAssessed: "2024-08-20", improvement: 12 },
	{ name: "Lower Body Power", value: 78, maxValue: 100, category: "strength", lastAssessed: "2024-08-20", improvement: 8 },
	{ name: "Court Agility", value: 65, maxValue: 100, category: "agility", lastAssessed: "2024-08-18", improvement: 15 },
	{ name: "Cardiovascular Endurance", value: 74, maxValue: 100, category: "endurance", lastAssessed: "2024-08-19", improvement: 6 },
	{ name: "Flexibility Range", value: 52, maxValue: 100, category: "flexibility", lastAssessed: "2024-08-17", improvement: 3 },
	{ name: "Core Stability", value: 68, maxValue: 100, category: "strength", lastAssessed: "2024-08-21", improvement: 10 },
];

const mockDailyData = [
	{ period: "Mon", skillLevel: 68, physicalFitness: 62, matchPerformance: 65 },
	{ period: "Tue", skillLevel: 72, physicalFitness: 66, matchPerformance: 70 },
	{ period: "Wed", skillLevel: 75, physicalFitness: 70, matchPerformance: 73 },
	{ period: "Thu", skillLevel: 78, physicalFitness: 74, matchPerformance: 76 },
	{ period: "Fri", skillLevel: 82, physicalFitness: 78, matchPerformance: 80 },
	{ period: "Sat", skillLevel: 85, physicalFitness: 82, matchPerformance: 83 },
	{ period: "Sun", skillLevel: 88, physicalFitness: 85, matchPerformance: 87 },
];

const mockWeeklyData = [
	{ period: "Week 1", skillLevel: 65, physicalFitness: 60, matchPerformance: 62 },
	{ period: "Week 2", skillLevel: 72, physicalFitness: 68, matchPerformance: 70 },
	{ period: "Week 3", skillLevel: 78, physicalFitness: 75, matchPerformance: 77 },
	{ period: "Week 4", skillLevel: 85, physicalFitness: 82, matchPerformance: 84 },
];

const mockMonthlyData = [
	{ period: "May", skillLevel: 55, physicalFitness: 50, matchPerformance: 52 },
	{ period: "Jun", skillLevel: 65, physicalFitness: 62, matchPerformance: 64 },
	{ period: "Jul", skillLevel: 75, physicalFitness: 72, matchPerformance: 74 },
	{ period: "Aug", skillLevel: 85, physicalFitness: 82, matchPerformance: 84 },
];

import { useTheme } from "next-themes";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [performanceData, setPerformanceData] = useState({ daily: [], weekly: [], monthly: [] });
  const [userStats, setUserStats] = useState({ achievementsCount: 0, skillAverage: 0, trainingDays: 0, monthlyImprovement: 0 });
  const { theme, setTheme } = useTheme();
  const { getSportConfig, currentSport, refreshSport } = useSport();
  
  // Get current sport configuration
  const sportConfig = getSportConfig();
  
  console.log('Dashboard - Current sport:', currentSport);
  console.log('Dashboard - Sport config:', sportConfig);
  
  // Function to generate user-specific performance data
  const getUserPerformanceData = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // For demo user, use mock data
    if (currentUser.username === 'player') {
      return {
        daily: mockDailyData,
        weekly: mockWeeklyData,
        monthly: mockMonthlyData
      };
    }
    
    // For new users, generate realistic starter data based on skill level
    const skillLevel = currentUser.skillLevel || 'beginner';
    const basePerformance = skillLevel === 'beginner' ? 30 : skillLevel === 'intermediate' ? 50 : skillLevel === 'advanced' ? 70 : 85;
    
    // Generate daily data for the last 7 days
    const dailyData = Array.from({ length: 7 }, (_, i) => ({
      day: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      performance: Math.max(0, basePerformance + (Math.random() - 0.5) * 20),
      practice: Math.floor(Math.random() * 3) // 0-2 hours
    }));
    
    // Generate weekly data for the last 4 weeks
    const weeklyData = Array.from({ length: 4 }, (_, i) => ({
      week: `Week ${i + 1}`,
      performance: Math.max(0, basePerformance + (Math.random() - 0.5) * 15),
      improvement: Math.floor(Math.random() * 10)
    }));
    
    // Generate monthly data
    const monthlyData = Array.from({ length: 3 }, (_, i) => ({
      month: new Date(Date.now() - (2 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
      performance: Math.max(0, basePerformance + (Math.random() - 0.5) * 10),
      growth: Math.floor(Math.random() * 15)
    }));
    
    return { daily: dailyData, weekly: weeklyData, monthly: monthlyData };
  };

  // Function to get user's physical metrics or generate reasonable defaults
  const getUserPhysicalMetrics = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // For demo user, use mock data
    if (currentUser.username === 'player') {
      return mockPhysicalMetrics;
    }
    
    // For new users, generate starter metrics based on skill level
    const skillLevel = currentUser.skillLevel || 'beginner';
    const baseValue = skillLevel === 'beginner' ? 25 : skillLevel === 'intermediate' ? 50 : skillLevel === 'advanced' ? 70 : 85;
    
    return [
      { name: "Upper Body Strength", value: baseValue + Math.floor(Math.random() * 20), maxValue: 100, category: "strength", lastAssessed: new Date().toISOString().split('T')[0], improvement: 0 },
      { name: "Lower Body Power", value: baseValue + Math.floor(Math.random() * 20), maxValue: 100, category: "strength", lastAssessed: new Date().toISOString().split('T')[0], improvement: 0 },
      { name: "Court Agility", value: baseValue + Math.floor(Math.random() * 20), maxValue: 100, category: "agility", lastAssessed: new Date().toISOString().split('T')[0], improvement: 0 },
      { name: "Cardiovascular Endurance", value: baseValue + Math.floor(Math.random() * 20), maxValue: 100, category: "endurance", lastAssessed: new Date().toISOString().split('T')[0], improvement: 0 },
      { name: "Flexibility Range", value: baseValue + Math.floor(Math.random() * 20), maxValue: 100, category: "flexibility", lastAssessed: new Date().toISOString().split('T')[0], improvement: 0 },
      { name: "Core Stability", value: baseValue + Math.floor(Math.random() * 20), maxValue: 100, category: "strength", lastAssessed: new Date().toISOString().split('T')[0], improvement: 0 },
    ];
  };

  // Function to get user's actual skills or fallback to mock data
  const getUserSkills = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('Dashboard - getUserSkills - Current user:', currentUser);
    console.log('Dashboard - getUserSkills - Sport config skills:', sportConfig?.skills);
    
    // For demo user (Ram Charan), use mock skills
    if (currentUser.username === 'player') {
      console.log('Dashboard - Using mock skills for demo user');
      return mockSkills.filter(skill => 
        sportConfig.skills.some(sportSkill => sportSkill.name === skill.name)
      );
    }
    
    // For regular users, use their saved skills
    if (currentUser.skills && sportConfig.skills) {
      console.log('Dashboard - Using user skills:', currentUser.skills);
      const userSkillsArray = sportConfig.skills.map(skill => ({
        name: skill.name,
        level: currentUser.skills[skill.name] || 0,
        maxLevel: 10,
        category: skill.category,
        improvement: 0 // Could track improvement over time
      }));
      console.log('Dashboard - Converted user skills:', userSkillsArray);
      return userSkillsArray;
    }
    
    // Fallback to zero skills if no user skills found
    console.log('Dashboard - No user skills found, using zero levels');
    return sportConfig.skills.map(skill => ({
      name: skill.name,
      level: 0,
      maxLevel: 10,
      category: skill.category,
      improvement: 0
    }));
  };

  // Add effect to re-render when currentSport changes
  useEffect(() => {
    console.log('Dashboard - Sport changed, current sport is now:', currentSport);
    // Update skills when sport changes
    const skills = getUserSkills();
    setUserSkills(skills);
    
    // Update performance data when sport changes
    setPerformanceData(getUserPerformanceData());
    
    // Update user statistics
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const stats = calculateUserStatistics(currentUser, skills);
    setUserStats(stats);
  }, [currentSport, sportConfig]);

  useEffect(() => {
    // Refresh sport context to ensure we have the latest sport
    refreshSport();
    
    // Initialize user skills
    const skills = getUserSkills();
    setUserSkills(skills);
    
    // Initialize performance data
    setPerformanceData(getUserPerformanceData());
    
    // Calculate and set user statistics
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const stats = calculateUserStatistics(currentUser, skills);
    setUserStats(stats);
    
    // DEBUG: Let's see what's in localStorage
    console.log('=== DASHBOARD DEBUG ===');
    console.log('currentUser:', localStorage.getItem("currentUser"));
    console.log('userData:', localStorage.getItem("userData"));
    console.log('profileCompleted:', localStorage.getItem("profileCompleted"));
    console.log('currentSport:', currentSport);
    console.log('sportConfig:', sportConfig);
    
    // Load current user profile data
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      try {
        const userData = JSON.parse(currentUserData);
        console.log('Dashboard - Loading user profile:', userData);
        
        // Calculate age from date of birth
        const calculateAge = (birthDate) => {
          if (!birthDate) return null;
          const today = new Date();
          const birth = new Date(birthDate);
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          return age;
        };
        
        // Convert user data to player format
        const playerData = {
          name: userData.firstName && userData.lastName 
            ? `${userData.firstName} ${userData.lastName}` 
            : userData.fullName || userData.username,
          age: userData.age || (userData.dateOfBirth ? calculateAge(userData.dateOfBirth) : null) || "Not specified",
          dateOfBirth: userData.dateOfBirth || "Not specified",
          height: userData.height || "Not specified",
          weight: userData.weight || "Not specified",
          location: userData.location || "Not specified",
          level: userData.skillLevel || userData.level || "Beginner",
          avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`
        };
        
        console.log('Dashboard - Converted player data:', playerData);
        setPlayer(playerData);
      } catch (error) {
        console.error('Dashboard - Error loading user data:', error);
        // Create a basic player from whatever data we have
        const basicPlayer = {
          name: "New Player",
          age: "Not specified",
          dateOfBirth: "Not specified",
          height: "Not specified",
          weight: "Not specified",
          location: "Not specified",
          level: "Beginner",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=newplayer"
        };
        setPlayer(basicPlayer);
      }
    } else {
      console.log('Dashboard - No user data found, creating basic player profile');
      const basicPlayer = {
        name: "New Player",
        age: "Not specified",
        dateOfBirth: "Not specified",
        height: "Not specified",
        weight: "Not specified",
        location: "Not specified",
        level: "Beginner",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=newplayer"
      };
      setPlayer(basicPlayer);
    }
    
    // Try to fetch from backend, fallback to stored data
    fetch("http://localhost:4000/api/player")
      .then((res) => res.json())
      .then((data) => setPlayer(data))
      .catch((err) => {
        console.log("Using stored user data - backend not available");
        // Keep the user data we already loaded
      });
  }, [refreshSport]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
			{/* Theme Toggle Icon Bottom Right */}
			<div className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-3">
				<span
					className="cursor-pointer p-3 rounded-full bg-white/80 dark:bg-black/80 shadow-lg border border-muted flex items-center justify-center hover:scale-110 transition-all"
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					aria-label="Toggle theme"
				>
					{theme === "dark" ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-blue-700" />}
				</span>
			</div>
			{/* Enhanced Hero Section */}
			<div className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-secondary gradient-shift"></div>
				<div className="absolute inset-0 bg-black/30"></div>
				<div 
					className="absolute inset-0 bg-cover bg-center opacity-20"
					style={{ backgroundImage: `url(${heroImage})` }}
				></div>
				{/* Aceternity-style background sparkles */}
				<div className="absolute inset-0 overflow-hidden">
					{[...Array(50)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
							}}
							initial={{ 
								opacity: 0,
								scale: 0,
								rotate: 0
							}}
							animate={{
								opacity: [0, 1, 0],
								scale: [0, 1, 0],
								rotate: [0, 180, 360],
								y: [0, -30, -60],
								x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
							}}
							transition={{
								duration: 4 + Math.random() * 3,
								repeat: Infinity,
								delay: Math.random() * 5,
								ease: "easeOut"
							}}
						>
							<div 
								className="w-1 h-1 bg-white rounded-full"
								style={{
									boxShadow: `0 0 ${2 + Math.random() * 4}px white, 0 0 ${4 + Math.random() * 8}px rgba(255,255,255,0.5)`
								}}
							/>
						</motion.div>
					))}
					{/* Larger sparkles */}
					{[...Array(20)].map((_, i) => (
						<motion.div
							key={`large-${i}`}
							className="absolute"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
							}}
							initial={{ 
								opacity: 0,
								scale: 0,
								rotate: 0
							}}
							animate={{
								opacity: [0, 0.8, 0],
								scale: [0, 1.5, 0],
								rotate: [0, 360],
								y: [0, -50, -100],
								x: [0, Math.random() * 30 - 15, Math.random() * 60 - 30]
							}}
							transition={{
								duration: 6 + Math.random() * 4,
								repeat: Infinity,
								delay: Math.random() * 8,
								ease: "easeOut"
							}}
						>
							<div 
								className="w-2 h-2 bg-white rounded-full"
								style={{
									boxShadow: `0 0 ${4 + Math.random() * 6}px white, 0 0 ${8 + Math.random() * 12}px rgba(255,255,255,0.6)`
								}}
							/>
						</motion.div>
					))}
					{/* Twinkling stars */}
					{[...Array(30)].map((_, i) => (
						<motion.div
							key={`star-${i}`}
							className="absolute text-white"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								fontSize: `${8 + Math.random() * 8}px`
							}}
							animate={{
								opacity: [0, 1, 0],
								scale: [0.5, 1.2, 0.5],
								rotate: [0, 180, 360]
							}}
							transition={{
								duration: 2 + Math.random() * 2,
								repeat: Infinity,
								delay: Math.random() * 3,
								ease: "easeInOut"
							}}
						>
							✨
						</motion.div>
					))}
				</div>

				<div className="relative container mx-auto px-6 py-10">
					<motion.div 
						className="text-center text-white"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className="mb-6">
							<Badge className="mb-4 bg-white/20 border-white/30 text-white hover:bg-white/30">
								<span className="text-lg mr-2">{sportConfig.icon}</span>
								Future {sportConfig.name} Champion in Training
							</Badge>
						</div>
						<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-accent-glow to-secondary-glow bg-clip-text text-transparent">
							{sportConfig.name} Skills Tracker
						</h1>
						<p className="text-xl md:text-3xl mb-10 text-white/90 max-w-3xl mx-auto">
							Unleash your potential and track your journey to becoming a {sportConfig.name.toLowerCase()} champion
						</p>
						<div className="flex flex-wrap justify-center gap-6">
							<Button variant="achievement" size="lg" className="achievement-glow" onClick={() => navigate('/achievements')}>
								<Trophy className="w-5 h-5 mr-2" />
								View Achievements
							</Button>
							<Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all" onClick={() => navigate('/goals')}>
								<Target className="w-5 h-5 mr-2" />
								Set New Goals
							</Button>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Enhanced Quick Stats */}
			<div className="container mx-auto px-6 py-8">
				<motion.div 
					className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 -mt-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<Card className="bg-gradient-to-br from-primary to-primary-light text-white shadow-xl border-0">
						<CardContent className="p-8 text-center relative">
							<div className="absolute inset-0 bg-white/10 rounded-lg"></div>
							<div className="relative z-10">
								<div className="w-12 h-12 mx-auto mb-4 relative">
									<Trophy className="w-8 h-8 absolute top-2 left-2 text-white" />
									<div className="absolute inset-0 bg-white/20 rounded-full"></div>
								</div>
								<h3 className="text-3xl font-bold">{userStats.achievementsCount}</h3>
								<p className="text-sm opacity-90">Achievements</p>
							</div>
						</CardContent>
					</Card>
					<Card className="bg-gradient-to-br from-secondary to-secondary-light text-white floating-card shadow-xl border-0" style={{animationDelay: '0.2s'}}>
						<CardContent className="p-8 text-center relative">
							<div className="absolute inset-0 bg-white/10 rounded-lg"></div>
							<div className="relative z-10">
								<div className="w-12 h-12 mx-auto mb-4 relative">
									<Target className="w-8 h-8 absolute top-2 left-2 text-white" />
									<div className="absolute inset-0 bg-white/20 rounded-full pulse-ring" style={{animationDelay: '0.5s'}}></div>
								</div>
								<h3 className="text-3xl font-bold">{userStats.skillAverage}</h3>
								<p className="text-sm opacity-90">Skill Average</p>
							</div>
						</CardContent>
					</Card>
					<Card className="bg-gradient-to-br from-accent to-warning text-white floating-card shadow-xl border-0" style={{animationDelay: '0.4s'}}>
						<CardContent className="p-8 text-center relative">
							<div className="absolute inset-0 bg-white/10 rounded-lg"></div>
							<div className="relative z-10">
								<div className="w-12 h-12 mx-auto mb-4 relative">
									<Calendar className="w-8 h-8 absolute top-2 left-2 text-white" />
									<div className="absolute inset-0 bg-white/20 rounded-full pulse-ring" style={{animationDelay: '1s'}}></div>
								</div>
								<h3 className="text-3xl font-bold">{userStats.trainingDays}</h3>
								<p className="text-sm opacity-90">Training Days</p>
							</div>
						</CardContent>
					</Card>
					<Card className="bg-gradient-to-br from-success to-primary-light text-white floating-card shadow-xl border-0" style={{animationDelay: '0.6s'}}>
						<CardContent className="p-8 text-center relative">
							<div className="absolute inset-0 bg-white/10 rounded-lg"></div>
							<div className="relative z-10">
								<div className="w-12 h-12 mx-auto mb-4 relative">
									<TrendingUp className="w-8 h-8 absolute top-2 left-2 text-white" />
									<div className="absolute inset-0 bg-white/20 rounded-full pulse-ring" style={{animationDelay: '1.5s'}}></div>
								</div>
								<h3 className="text-3xl font-bold">+{userStats.monthlyImprovement}%</h3>
								<p className="text-sm opacity-90">This Month</p>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Main Dashboard Grid */}
				<motion.div 
					className="grid grid-cols-1 xl:grid-cols-3 gap-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					{/* Left Column */}
					<div className="space-y-8">
						<PlayerProfile player={player} />
						<PhysicalStrength metrics={getUserPhysicalMetrics()} />
					</div>

					{/* Center Column */}
					<div className="space-y-8">
						<PerformanceChart 
							dailyData={performanceData.daily}
							weeklyData={performanceData.weekly}
							monthlyData={performanceData.monthly}
						/>
					</div>

					{/* Right Column */}
					<div className="space-y-8">
						<SkillTracker skills={userSkills} />
						{/* Enhanced Quick Actions */}
						<Card className="bg-gradient-to-br from-card to-muted/50 border-0 shadow-xl">
							<CardHeader className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg"></div>
								<div className="relative z-10">
									<CardTitle className="text-xl flex items-center gap-2">
										<Zap className="w-5 h-5 text-primary" />
										Quick Actions
									</CardTitle>
									<CardDescription>Manage your training and progress</CardDescription>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 relative">
								<Button variant="performance" className="w-full group neon-glow" onClick={() => navigate('/training')}>
									<Calendar className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
									Schedule Training
								</Button>
								<Button variant="skill" className="w-full group" onClick={() => navigate('/practice')}>
									<Target className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
									Record Practice Session
								</Button>
								<Button variant="secondary" className="w-full group" onClick={() => navigate('/skills/manage')}>
									<TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
									Manage My Skills
								</Button>
								<Button variant="outline" className="w-full group" onClick={() => navigate('/results')}>
									<Trophy className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
									Competition Results
								</Button>
								<Button variant="achievement" className="w-full group" onClick={() => navigate('/assessment')}>
									<Star className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
									Unlock New Achievement
								</Button>
							</CardContent>
						</Card>

						{/* Weekly Challenge Card */}
						<Card className="bg-gradient-to-br from-accent/20 to-secondary/20 border-2 border-accent/30">
							<CardHeader>
								<CardTitle className="text-lg flex items-center gap-2">
									<Award className="w-5 h-5 text-accent" />
									Weekly Challenge
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<p className="text-sm text-muted-foreground">Master 50 consecutive serves</p>
									<div className="w-full bg-muted rounded-full h-3">
										<div className="bg-gradient-to-r from-accent to-secondary h-3 rounded-full w-3/4 shimmer"></div>
									</div>
									<div className="flex justify-between text-sm">
										<span>Progress: 37/50</span>
										<span className="text-accent font-medium">74%</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Dashboard;
