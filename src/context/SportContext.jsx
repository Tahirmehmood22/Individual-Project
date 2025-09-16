import { createContext, useContext, useState, useEffect } from 'react';

const SportContext = createContext();

export const useSport = () => {
  const context = useContext(SportContext);
  if (!context) {
    throw new Error('useSport must be used within a SportProvider');
  }
  return context;
};

// Sport configurations with their specific data
export const sportConfigs = {
  badminton: {
    id: 'badminton',
    name: 'Badminton',
    icon: '🏸',
    color: 'from-blue-500 to-purple-600',
    description: 'Fast-paced racket sport',
    skills: [
      { name: 'Forehand Clear', category: 'technique' },
      { name: 'Backhand Drop', category: 'technique' },
      { name: 'Lightning Footwork', category: 'physical' },
      { name: 'Strategic Mind', category: 'mental' },
      { name: 'Precision Serve', category: 'technique' },
      { name: 'Power Smash', category: 'physical' },
    ],
    equipment: ['Racket', 'Shuttlecock', 'Court', 'Net'],
    courtType: 'Indoor court with net',
  },
  tennis: {
    id: 'tennis',
    name: 'Tennis',
    icon: '🎾',
    color: 'from-green-500 to-blue-600',
    description: 'Classic court sport',
    skills: [
      { name: 'Forehand Drive', category: 'technique' },
      { name: 'Backhand Slice', category: 'technique' },
      { name: 'Court Coverage', category: 'physical' },
      { name: 'Match Strategy', category: 'mental' },
      { name: 'Power Serve', category: 'technique' },
      { name: 'Net Play', category: 'technique' },
    ],
    equipment: ['Racket', 'Tennis Ball', 'Court', 'Net'],
    courtType: 'Outdoor/Indoor court with net',
  },
  'table-tennis': {
    id: 'table-tennis',
    name: 'Table Tennis',
    icon: '🏓',
    color: 'from-orange-500 to-red-600',
    description: 'Quick indoor sport',
    skills: [
      { name: 'Forehand Topspin', category: 'technique' },
      { name: 'Backhand Loop', category: 'technique' },
      { name: 'Quick Reflexes', category: 'physical' },
      { name: 'Tactical Thinking', category: 'mental' },
      { name: 'Service Variation', category: 'technique' },
      { name: 'Spin Control', category: 'technique' },
    ],
    equipment: ['Paddle', 'Ping Pong Ball', 'Table', 'Net'],
    courtType: 'Indoor table with net',
  },
  squash: {
    id: 'squash',
    name: 'Squash',
    icon: '🎯',
    color: 'from-purple-500 to-pink-600',
    description: 'High-intensity wall sport',
    skills: [
      { name: 'Straight Drive', category: 'technique' },
      { name: 'Cross Court', category: 'technique' },
      { name: 'Court Movement', category: 'physical' },
      { name: 'Game Awareness', category: 'mental' },
      { name: 'Power Shot', category: 'technique' },
      { name: 'Wall Reading', category: 'mental' },
    ],
    equipment: ['Racket', 'Squash Ball', 'Court', 'Walls'],
    courtType: 'Enclosed court with 4 walls',
  },
  padel: {
    id: 'padel',
    name: 'Padel',
    icon: '🎪',
    color: 'from-teal-500 to-cyan-600',
    description: 'Social racket sport',
    skills: [
      { name: 'Wall Play', category: 'technique' },
      { name: 'Lob Shot', category: 'technique' },
      { name: 'Team Coordination', category: 'mental' },
      { name: 'Court Positioning', category: 'physical' },
      { name: 'Smash Technique', category: 'technique' },
      { name: 'Communication', category: 'mental' },
    ],
    equipment: ['Padel Racket', 'Padel Ball', 'Court', 'Glass Walls'],
    courtType: 'Enclosed court with glass walls',
  }
};

export const SportProvider = ({ children }) => {
  // Initialize with localStorage value if available, otherwise default to badminton
  const getInitialSport = () => {
    const savedSport = localStorage.getItem('userSport');
    console.log('SportProvider - Initial sport from localStorage:', savedSport);
    return (savedSport && sportConfigs[savedSport]) ? savedSport : 'badminton';
  };
  
  const [currentSport, setCurrentSport] = useState(getInitialSport);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user sport preference from localStorage
    const savedSport = localStorage.getItem('userSport');
    const savedUserData = localStorage.getItem('userData');
    
    console.log('SportContext - Loading from localStorage:', { savedSport, savedUserData });
    
    if (savedSport && sportConfigs[savedSport]) {
      console.log('SportContext - Setting current sport to:', savedSport);
      setCurrentSport(savedSport);
    }
    
    if (savedUserData) {
      try {
        const parsedUserData = JSON.parse(savedUserData);
        console.log('SportContext - Setting user data:', parsedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Additional effect to listen for storage changes (when user logs in)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedSport = localStorage.getItem('userSport');
      if (savedSport && sportConfigs[savedSport] && savedSport !== currentSport) {
        console.log('SportContext - Storage changed, updating sport to:', savedSport);
        setCurrentSport(savedSport);
      }
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    
    // Also check immediately in case the storage was changed in the same tab
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentSport]);

  const changeSport = (sportId) => {
    if (sportConfigs[sportId]) {
      console.log('SportContext - Changing sport to:', sportId);
      setCurrentSport(sportId);
      localStorage.setItem('userSport', sportId);
    }
  };

  const refreshSport = () => {
    const savedSport = localStorage.getItem('userSport');
    console.log('SportContext - Refreshing sport, found:', savedSport);
    if (savedSport && sportConfigs[savedSport]) {
      setCurrentSport(savedSport);
    }
  };

  const updateUserData = (data) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const getSportConfig = (sportId = currentSport) => {
    return sportConfigs[sportId] || sportConfigs.badminton;
  };

  const value = {
    currentSport,
    changeSport,
    refreshSport,
    getSportConfig,
    userData,
    updateUserData,
    allSports: Object.values(sportConfigs)
  };

  return (
    <SportContext.Provider value={value}>
      {children}
    </SportContext.Provider>
  );
};

export default SportProvider;