import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, MapPin, Calendar, Ruler, Weight, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSport } from "../context/SportContext";

export const PlayerProfile = ({ player }) => {
  const navigate = useNavigate();
  const { currentSport, getSportConfig } = useSport();
  const sportConfig = getSportConfig(currentSport);

  // Show loading state if player data is not available yet
  if (!player) {
    return (
      <Card className="hover:shadow-2xl transition-all duration-500 performance-pulse border-0 bg-gradient-to-br from-card to-primary/5">
        <CardContent className="text-center p-8">
          <div className="animate-pulse space-y-4">
            <div className="w-20 h-20 bg-muted rounded-full mx-auto"></div>
            <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-3 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
          <p className="text-muted-foreground mt-4">Loading profile...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-2xl transition-all duration-500 performance-pulse border-0 bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-t-lg"></div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Avatar className="w-28 h-28 border-4 border-primary/30 shadow-lg">
                <AvatarImage 
                  src={player.avatar}
                  alt={player.name}
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                  {player.name ? player.name.split(' ').map(n => n[0]).join('') : player.username ? player.username.substring(0, 2).toUpperCase() : '??'}
                </AvatarFallback>
              </Avatar>
              
              {/* Floating status indicator */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-success to-success-glow rounded-full flex items-center justify-center border-2 border-white shadow-lg pulse-ring">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <CardTitle className="text-2xl text-foreground mb-2">
            {player.name || `${player.firstName || ''} ${player.lastName || ''}`.trim() || player.username || 'Player'}
          </CardTitle>
          <CardDescription className="text-muted-foreground mb-4">
            {sportConfig.icon} {sportConfig.name} Athlete • {player.level || player.skillLevel || 'Beginner'}
          </CardDescription>
          
          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="bg-gradient-to-r from-primary to-primary-light text-white border-0 shadow-md">
              <Sparkles className="w-3 h-3 mr-1" />
              {player.level || player.skillLevel || 'Beginner'} Player
            </Badge>
            <Badge className="bg-gradient-to-r from-accent to-warning text-white border-0 shadow-md">
              Level {Math.floor(Math.random() * 3) + 7}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 skill-bounce">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center shadow-md">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Age</p>
              <p className="text-lg font-bold text-primary">{player.age || 'N/A'} years</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 transition-all duration-300 skill-bounce" style={{animationDelay: '0.1s'}}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-secondary-light flex items-center justify-center shadow-md">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Location</p>
              <p className="text-lg font-bold text-secondary">{player.location || 'Not specified'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-accent/10 hover:from-accent/10 hover:to-accent/20 transition-all duration-300 skill-bounce" style={{animationDelay: '0.2s'}}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-accent-glow flex items-center justify-center shadow-md">
              <Ruler className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Height</p>
              <p className="text-lg font-bold text-accent">{player.height || 'Not specified'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-success/10 hover:from-success/10 hover:to-success/20 transition-all duration-300 skill-bounce" style={{animationDelay: '0.3s'}}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-success to-success-glow flex items-center justify-center shadow-md">
              <Weight className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Weight</p>
              <p className="text-lg font-bold text-success">{player.weight || 'Not specified'}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-border/50">
          <Button onClick={() => navigate('/profile/edit')} variant="outline" className="w-full group hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:border-primary/30 transition-all duration-300">
            <Edit className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Edit Profile
          </Button>
        </div>
        
        {/* Achievement indicators */}
        <div className="flex justify-center space-x-2 pt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-secondary achievement-glow" style={{animationDelay: `${i * 0.5}s`}}></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};