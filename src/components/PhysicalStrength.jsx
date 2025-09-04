import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Zap, Shield, Wind, Heart, Activity, Flame, Bolt } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PhysicalStrength = ({ metrics }) => {
  const navigate = useNavigate();
  const getMetricIcon = (category) => {
    switch (category) {
      case "strength": return <Dumbbell className="w-5 h-5" />;
      case "agility": return <Bolt className="w-5 h-5" />;
      case "endurance": return <Heart className="w-5 h-5" />;
      case "flexibility": return <Activity className="w-5 h-5" />;
      default: return <Dumbbell className="w-5 h-5" />;
    }
  };

  const getMetricGradient = (category) => {
    switch (category) {
      case "strength": return "from-primary to-primary-light";
      case "agility": return "from-secondary to-secondary-light";
      case "endurance": return "from-accent to-accent-glow";
      case "flexibility": return "from-success to-success-glow";
      default: return "from-primary to-primary-light";
    }
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 80) return "from-success to-success-glow";
    if (percentage >= 60) return "from-warning to-warning-glow";
    return "from-destructive to-destructive";
  };

  const getStatusText = (percentage) => {
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Good";
    if (percentage >= 40) return "Average";
    return "Needs Work";
  };

  return (
    <Card className="hover:shadow-2xl transition-all duration-500 performance-pulse border-0 bg-gradient-to-br from-card to-secondary/5">
      <CardHeader className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 rounded-t-lg"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-warning flex items-center justify-center">
                  <Flame className="w-4 h-4 text-white" />
                </div>
                Physical Strength
              </CardTitle>
              <CardDescription>Monitor your physical development</CardDescription>
            </div>
            <Button variant="performance" size="sm" className="neon-glow" onClick={() => navigate('/new-assessment')}>
              <Wind className="w-4 h-4 mr-2" />
              New Assessment
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative">
        {metrics.map((metric, index) => {
          const percentage = (metric.value / metric.maxValue) * 100;
          
          return (
            <div 
              key={index} 
              className="space-y-4 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/50 hover:from-muted/50 hover:to-muted/70 transition-all duration-300 performance-pulse border border-white/10"
              style={{animationDelay: `${index * 0.15}s`}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getMetricGradient(metric.category)} flex items-center justify-center shadow-lg`}>
                    <div className="text-white">
                      {getMetricIcon(metric.category)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{metric.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Last assessed: {metric.lastAssessed}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <Badge 
                      className={`text-sm bg-gradient-to-r ${getStatusColor(percentage)} text-white border-0 shadow-md`}
                    >
                      {Math.round(percentage)}%
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{getStatusText(percentage)}</p>
                  </div>
                  {metric.improvement !== 0 && (
                    <Badge 
                      className={`text-xs ${metric.improvement > 0 ? 'bg-gradient-to-r from-success/20 to-success-glow/20 text-success border-success/30' : 'bg-gradient-to-r from-destructive/20 to-destructive text-destructive border-destructive/30'} achievement-glow`}
                    >
                      {metric.improvement > 0 ? '+' : ''}{metric.improvement}%
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Level</span>
                  <span className="font-semibold text-foreground">
                    {metric.value}/{metric.maxValue}
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={percentage} 
                    className="h-4 bg-muted/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full shimmer"></div>
                </div>
                
                {/* Performance indicators */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${
                          i < Math.floor(percentage / 20) 
                            ? `bg-gradient-to-r ${getMetricGradient(metric.category)} pulse-ring` 
                            : 'bg-muted'
                        }`}
                        style={{animationDelay: `${i * 0.1}s`}}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground capitalize">
                    {metric.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <Button
            variant="outline"
            className="w-full group hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300"
            onClick={() => navigate('/training-plan')}
          >
            <Dumbbell className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Training Plan
          </Button>
          <Button
            variant="achievement"
            className="w-full group achievement-glow"
            onClick={() => navigate('/set-goals')}
          >
            <Shield className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Set Goals
          </Button>
        </div>
        
        {/* Overall fitness score */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 text-center">
          <h4 className="font-semibold text-foreground mb-2">Overall Fitness Score</h4>
          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent stats-counter">
            {Math.round(metrics.reduce((acc, m) => acc + (m.value / m.maxValue * 100), 0) / metrics.length)}
          </div>
          <p className="text-sm text-muted-foreground">Out of 100</p>
        </div>
      </CardContent>
    </Card>
  );
};