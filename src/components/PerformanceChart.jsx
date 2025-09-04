import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, Calendar, BarChart3, Zap, Target } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { MovingTabs } from "./MovingTabs";

export const PerformanceChart = ({ dailyData, weeklyData, monthlyData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeTab = (location.pathname.match(/analytics\/(daily|weekly|monthly)/)?.[1]) || "daily";

  const tabs = [
    {
      value: "daily",
      label: "Daily",
      icon: Calendar,
    },
    {
      value: "weekly", 
      label: "Weekly",
      icon: BarChart3,
    },
    {
      value: "monthly",
      label: "Monthly", 
      icon: TrendingUp,
    }
  ];

  const handleTabChange = (value) => {
    navigate(`/analytics/${value}`);
  };
  const chartConfig = {
    skillLevel: {
      color: "hsl(var(--primary))",
      name: "Skill Level"
    },
    physicalFitness: {
      color: "hsl(var(--secondary))",
      name: "Physical Fitness"
    },
    matchPerformance: {
      color: "hsl(var(--accent))",
      name: "Match Performance"
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur border border-border rounded-lg p-4 shadow-2xl">
          <p className="font-semibold text-foreground mb-3 text-center">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{entry.name}:</span>
              </div>
              <span className="font-semibold" style={{ color: entry.color }}>
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = (data) => (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
          </linearGradient>
          <linearGradient id="fitnessGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.05}/>
          </linearGradient>
          <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.05}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis 
          dataKey="period" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="skillLevel"
          stroke="hsl(var(--primary))"
          fillOpacity={1}
          fill="url(#skillGradient)"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="physicalFitness"
          stroke="hsl(var(--secondary))"
          fillOpacity={1}
          fill="url(#fitnessGradient)"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(var(--secondary))", strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="matchPerformance"
          stroke="hsl(var(--accent))"
          fillOpacity={1}
          fill="url(#performanceGradient)"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(var(--accent))", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <Card className="hover:shadow-2xl transition-all duration-500 performance-pulse border-0 bg-gradient-to-br from-card to-accent/5">
      <CardHeader className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-t-lg"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                Performance Analytics
              </CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-success/20 to-success-glow/20 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4 text-success achievement-glow" />
              <span className="text-sm text-success font-semibold">+18% this week</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <MovingTabs
          tabs={tabs}
          activeTab={routeTab}
          setActiveTab={handleTabChange}
          className="w-full"
          activeTabClassName="bg-gradient-to-r from-primary/20 to-primary-light/20 border-primary/30"
        >
          {routeTab === "daily" && renderChart(dailyData)}
          {routeTab === "weekly" && renderChart(weeklyData)}
          {routeTab === "monthly" && renderChart(monthlyData)}
        </MovingTabs>
        
        {/* Enhanced Legend */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/50">
          <div className="text-center p-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary-light/10 hover:from-primary/20 hover:to-primary-light/20 transition-all duration-300">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-primary-light mx-auto mb-2 pulse-ring"></div>
            <p className="text-xs font-medium text-muted-foreground">Skill Level</p>
            <p className="text-sm font-bold text-primary">85%</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-r from-secondary/10 to-secondary-light/10 hover:from-secondary/20 hover:to-secondary-light/20 transition-all duration-300">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-secondary to-secondary-light mx-auto mb-2 pulse-ring" style={{animationDelay: '0.5s'}}></div>
            <p className="text-xs font-medium text-muted-foreground">Physical Fitness</p>
            <p className="text-sm font-bold text-secondary">82%</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-r from-accent/10 to-accent-glow/10 hover:from-accent/20 hover:to-accent-glow/20 transition-all duration-300">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-accent to-accent-glow mx-auto mb-2 pulse-ring" style={{animationDelay: '1s'}}></div>
            <p className="text-xs font-medium text-muted-foreground">Match Performance</p>
            <p className="text-sm font-bold text-accent">87%</p>
          </div>
        </div>

        {/* Performance insights */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-success/10 to-primary/10 border border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-success" />
            <h4 className="font-semibold text-success">Performance Insight</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Your match performance is improving faster than your skill level. Focus on technical practice to balance your development.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};