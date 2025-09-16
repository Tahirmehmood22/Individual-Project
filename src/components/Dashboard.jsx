import { PlayerProfile } from "./PlayerProfile";
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
import { useSport } from "@/context/SportContext";

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
  const { theme, setTheme } = useTheme();
  const { getSportConfig, currentSport, refreshSport } = useSport();
  
  // Get current sport configuration
  const sportConfig = getSportConfig();
  
  console.log('Dashboard - Current sport:', currentSport);
  console.log('Dashboard - Sport config:', sportConfig);
  
  // Update skills based on selected sport
  const sportSkills = sportConfig.skills.map((skill, index) => ({
    name: skill.name,
    level: 5 + Math.floor(Math.random() * 4), // Random level 5-8
    maxLevel: 10,
    category: skill.category,
    improvement: 1 + Math.floor(Math.random() * 4) // Random improvement 1-4
  }));

  // Add effect to re-render when currentSport changes
  useEffect(() => {
    console.log('Dashboard - Sport changed, current sport is now:', currentSport);
  }, [currentSport]);

  useEffect(() => {
    // Refresh sport context to ensure we have the latest sport
    refreshSport();
    
    // Load current user profile data
    const currentUserData = localStorage.getItem("userData");
    if (currentUserData) {
      try {
        const userData = JSON.parse(currentUserData);
        console.log('Dashboard - Loading user profile:', userData);
        
        // Convert user data to player format
        const playerData = {
          name: userData.fullName || userData.username,
          age: userData.age || "Not specified",
          dateOfBirth: userData.dateOfBirth || "Not specified",
          height: userData.height || "Not specified",
          weight: userData.weight || "Not specified",
          location: userData.location || "Not specified",
          level: userData.level || "Beginner",
          avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`
        };
        
        setPlayer(playerData);
      } catch (error) {
        console.error('Dashboard - Error loading user data:', error);
        // Fallback to mock data if user data is corrupted
        setPlayer(mockPlayer);
      }
    } else {
      console.log('Dashboard - No user data found, using mock data');
      setPlayer(mockPlayer);
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
								<h3 className="text-3xl font-bold">15</h3>
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
								<h3 className="text-3xl font-bold">7.2</h3>
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
								<h3 className="text-3xl font-bold">52</h3>
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
								<h3 className="text-3xl font-bold">+24%</h3>
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
						<PhysicalStrength metrics={mockPhysicalMetrics} />
					</div>

					{/* Center Column */}
					<div className="space-y-8">
						<PerformanceChart 
							dailyData={mockDailyData}
							weeklyData={mockWeeklyData}
							monthlyData={mockMonthlyData}
						/>
					</div>

					{/* Right Column */}
					<div className="space-y-8">
						<SkillTracker skills={sportSkills} />
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
