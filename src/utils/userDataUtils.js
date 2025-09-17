// User data utilities
export const generateUserAchievements = (currentUser, userSkills) => {
  if (!currentUser) return [];
  
  // For demo user, use mock achievements
  if (currentUser.username === 'player') {
    return [
      { name: "First Tournament", description: "Participated in your first tournament.", type: "milestone" },
      { name: "Best Serve 2025", description: "Awarded for best serve in 2025 season.", type: "award" },
      { name: "Junior League Finalist", description: "Reached finals in Junior League.", type: "milestone" },
      { name: "Regional Champion", description: "Won the regional championship.", type: "champion" }
    ];
  }
  
  const achievements = [];
  const skillLevel = currentUser.skillLevel || 'beginner';
  const profileCompleted = currentUser.profileCompleted;
  const sport = currentUser.sport || 'badminton';
  
  // Basic achievements for new users
  if (profileCompleted) {
    achievements.push({
      name: "Profile Complete",
      description: "Successfully completed your player profile.",
      type: "milestone"
    });
  }
  
  achievements.push({
    name: "Journey Begins",
    description: `Started your ${sport} training journey.`,
    type: "milestone"
  });
  
  // Skill-based achievements
  if (userSkills && userSkills.length > 0) {
    const averageSkill = userSkills.reduce((sum, skill) => sum + skill.level, 0) / userSkills.length;
    
    if (averageSkill >= 3) {
      achievements.push({
        name: "Skill Builder",
        description: "Achieved an average skill level of 3 or higher.",
        type: "milestone"
      });
    }
    
    if (averageSkill >= 5) {
      achievements.push({
        name: "Rising Talent",
        description: "Achieved an average skill level of 5 or higher.",
        type: "award"
      });
    }
    
    if (averageSkill >= 7) {
      achievements.push({
        name: "Advanced Player",
        description: "Achieved an average skill level of 7 or higher.",
        type: "champion"
      });
    }
    
    // Check for high individual skills
    userSkills.forEach(skill => {
      if (skill.level >= 8) {
        achievements.push({
          name: `${skill.name} Expert`,
          description: `Mastered ${skill.name} with a skill level of ${skill.level}.`,
          type: "award"
        });
      }
    });
  }
  
  // Experience-based achievements
  const experienceYears = currentUser.experienceYears || 0;
  if (experienceYears >= 1) {
    achievements.push({
      name: "One Year Strong",
      description: "Celebrated one year of training experience.",
      type: "milestone"
    });
  }
  
  if (experienceYears >= 5) {
    achievements.push({
      name: "Veteran Player",
      description: "Achieved 5+ years of training experience.",
      type: "award"
    });
  }
  
  return achievements;
};

export const generateUserGoals = (currentUser, userSkills) => {
  if (!currentUser) return [];
  
  // For demo user, use mock goals
  if (currentUser.username === 'player') {
    return [
      { goal: "Win a regional tournament", progress: "In progress" },
      { goal: "Improve smash technique", progress: "Completed" },
      { goal: "Practice footwork daily", progress: "In progress" }
    ];
  }
  
  const goals = [];
  const skillLevel = currentUser.skillLevel || 'beginner';
  const sport = currentUser.sport || 'badminton';
  
  // Skill-based goals
  if (userSkills && userSkills.length > 0) {
    userSkills.forEach(skill => {
      if (skill.level < 5) {
        goals.push({
          goal: `Improve ${skill.name} to level 5`,
          progress: "In progress"
        });
      } else if (skill.level < 8) {
        goals.push({
          goal: `Master ${skill.name} (reach level 8)`,
          progress: "In progress"
        });
      }
    });
  }
  
  // General goals based on skill level
  if (skillLevel === 'beginner') {
    goals.push(
      { goal: "Complete 20 practice sessions", progress: "Not started" },
      { goal: "Learn basic techniques", progress: "In progress" },
      { goal: "Reach intermediate level", progress: "Not started" }
    );
  } else if (skillLevel === 'intermediate') {
    goals.push(
      { goal: "Participate in first tournament", progress: "Not started" },
      { goal: "Achieve 70% accuracy in serves", progress: "In progress" },
      { goal: "Reach advanced level", progress: "Not started" }
    );
  } else if (skillLevel === 'advanced') {
    goals.push(
      { goal: "Win a local tournament", progress: "In progress" },
      { goal: "Mentor a beginner player", progress: "Not started" },
      { goal: "Perfect all techniques", progress: "In progress" }
    );
  }
  
  return goals.slice(0, 5); // Limit to 5 goals
};

export const calculateUserStatistics = (currentUser, userSkills) => {
  if (!currentUser) {
    return {
      achievementsCount: 0,
      skillAverage: 0,
      trainingDays: 0,
      monthlyImprovement: 0
    };
  }
  
  // For demo user, use mock stats
  if (currentUser.username === 'player') {
    return {
      achievementsCount: 15,
      skillAverage: 7.2,
      trainingDays: 52,
      monthlyImprovement: 24
    };
  }
  
  // Calculate real statistics for new users
  const achievements = generateUserAchievements(currentUser, userSkills);
  const skillAverage = userSkills && userSkills.length > 0 
    ? (userSkills.reduce((sum, skill) => sum + skill.level, 0) / userSkills.length).toFixed(1)
    : 0;
  
  // Calculate training days based on experience and profile completion date
  const experienceYears = currentUser.experienceYears || 0;
  const profileCompletedDate = currentUser.profileCompletedAt 
    ? new Date(currentUser.profileCompletedAt) 
    : new Date();
  const daysSinceProfileCompletion = Math.floor((new Date() - profileCompletedDate) / (1000 * 60 * 60 * 24));
  const trainingDays = Math.min(experienceYears * 50 + daysSinceProfileCompletion, 365); // Cap at 365 days
  
  // Calculate monthly improvement based on skill level
  const skillLevel = currentUser.skillLevel || 'beginner';
  const monthlyImprovement = skillLevel === 'beginner' ? 15 
    : skillLevel === 'intermediate' ? 10 
    : skillLevel === 'advanced' ? 8 
    : 5;
  
  return {
    achievementsCount: achievements.length,
    skillAverage: parseFloat(skillAverage),
    trainingDays,
    monthlyImprovement
  };
};