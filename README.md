# 🏸 Multi-Sport Skills Tracker

Hey there! Welcome to my sports tracking application that I built to help athletes track their progress across multiple racquet sports. This isn't just another generic fitness app - it's specifically designed for badminton, tennis, table tennis, squash, and padel players who want to seriously improve their game.

## What This App Does

I created this app because I noticed there wasn't a good way to track specific skills for racquet sports. You can sign up, choose your sport, and get a personalized dashboard that tracks everything from your forehand technique to your mental game. The cool part? Each sport has its own unique skills and training approaches.

## 🎯 Main Features

### Multi-Sport Support
Choose from 5 different sports when you sign up:
- 🏸 **Badminton** - Track smashes, drops, clears, and footwork
- 🎾 **Tennis** - Monitor serves, forehands, backhands, and court coverage  
- 🏓 **Table Tennis** - Focus on spins, loops, and quick reflexes
- 🎯 **Squash** - Work on drives, drops, and tactical thinking
- 🔥 **Padel** - Master bandejas, viboras, and positioning

### User Authentication & Profiles
- Create your own account with personalized profile
- Complete a guided 4-step profile setup with skill assessment
- Each user gets their sport-specific dashboard with personalized data
- Profile data persists between sessions using localStorage
- Secure signup system with form validation

### Skills Tracking System
Every sport has three categories of skills, and you can rate yourself from 0-10 on each:
- **Technique Skills** - Sport-specific shots and movements
- **Physical Skills** - Fitness, agility, and strength  
- **Mental Skills** - Strategy, focus, and game awareness

The app tracks your progress over time and shows you personalized achievements based on your actual skill levels.

### Performance Analytics
- Visual progress charts showing your improvement over time
- Daily, weekly, and monthly performance tracking
- Achievement system with unlockable badges
- Physical fitness metrics and assessments

### Training & Goal Management
- Set personal goals and track progress
- Create custom training plans
- Log practice sessions with detailed notes
- Competition results tracking with medal system

### Modern UI/UX
- Beautiful dark/light theme toggle
- Smooth animations and transitions
- Mobile-responsive design
- Professional gradient styling

## 🚀 Getting Started

### Creating Your Own Account
1. Click "Get Started" on the homepage
2. Fill in your details (name, email, age, location) 
3. Choose your sport from the 5 available options
4. Complete the 4-step profile wizard:
   - Personal information
   - Sport selection and experience level
   - Skill assessment (rate yourself 0-10 on each skill)
   - Goals and training preferences
5. Start tracking your progress with your personalized dashboard!

### Installation & Setup

First, make sure you have Node.js installed on your computer. Then:

```bash
# Clone this repository
git clone https://github.com/Tahirmehmood22/Individual-Project.git

# Navigate to the project folder
cd Individual-Project

# Install all the dependencies
npm install

# Start the development server
npm run dev
```

The app will open in your browser at `http://localhost:5173` (or `http://localhost:5174` if 5173 is busy)

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── SkillTracker.jsx # Skills monitoring
│   └── PlayerProfile.jsx # User profile display
├── pages/              # Different app pages
│   ├── Index.jsx       # Homepage
│   ├── CompleteProfile.jsx # Profile setup wizard
│   ├── analytics/      # Performance charts
│   └── static/         # Training, goals, achievements, etc.
├── context/            # Global state management
│   ├── SportContext.jsx # Multi-sport logic
│   └── LanguageContext.jsx # Internationalization
└── lib/                # Utility functions
```

## 🔧 Technical Details

### Built With
- **React 18** - Because it's reliable and has great community support
- **Vite** - Super fast development server, much better than Create React App
- **Tailwind CSS** - Makes styling actually enjoyable
- **shadcn/ui** - Beautiful, accessible components out of the box
- **Framer Motion** - Smooth animations that make the app feel premium
- **React Router** - Client-side routing for seamless navigation
- **Recharts** - Easy-to-use charts for performance visualization

### Data Storage
Currently using localStorage for simplicity, which means your data stays on your device. The app remembers:
- Your personal profile and sport preference
- Skill levels and progress tracking
- Achievements and goals you've unlocked
- Training preferences and assessment results

The architecture is designed to easily migrate to a backend database when needed.

### Responsive Design
The app works great on:
- Desktop computers (primary target)
- Tablets (fully responsive)
- Mobile phones (optimized layouts)

## 🎮 How to Use the App

### First Time Setup
1. **Sign Up** - Create your account and pick your sport
2. **Complete Profile** - Go through the 4-step guided setup
3. **Rate Your Skills** - Be honest about your current level (0-10 scale)
4. **Explore Dashboard** - Check out your personalized layout with real data
5. **Set Goals** - The app suggests goals based on your skill levels

### Daily Usage
- **Check Progress** - See your personalized performance data
- **Review Achievements** - View badges you've earned based on your skills
- **Update Skills** - Bump up your ratings as you improve
- **Set New Goals** - Keep challenging yourself with realistic targets

### Features Deep Dive
- **Analytics Page** - Switch between daily, weekly, monthly views
- **Personalized Dashboard** - Shows stats based on YOUR actual skill levels
- **Achievement System** - Unlock badges based on your real progress
- **Smart Goals** - App suggests realistic goals based on your current abilities
- **Multi-Sport Support** - Switch between sports with your data intact

## 🐛 Known Issues & Future Plans

### Current Features
- User profile creation with guided setup
- 0-10 skill rating system for all sports
- Personalized dashboard with real user data
- Achievement system based on actual skill levels
- Smart goal suggestions
- Dark/light theme toggle
- Fully responsive design

### Planned Features
- Training session logging and tracking
- Progress charts showing improvement over time  
- Coach/trainer accounts and sharing
- Training video integration
- Social features and community
- Mobile app version
- Cloud sync for multi-device access

## 🤝 Contributing

This is my personal project, but I'm open to suggestions! If you find bugs or have ideas for improvements, feel free to:
- Open an issue on GitHub
- Submit a pull request
- Reach out to me directly

## 📝 License

This project is open source and available under the MIT License. Feel free to use it as inspiration for your own projects!

## 👨‍💻 About the Developer

I built this app as a way to combine my passion for sports with web development. As someone who plays racquet sports myself, I wanted a tool that actually understood the nuances of different sports rather than generic fitness tracking.

Hope you enjoy using it as much as I enjoyed building it! 🚀

---

**Last Updated:** September 2025  
**Version:** 2.1.0 (User-Personalized Edition)
- Complete profile setup wizard
- Personalized achievements and goals
- 0-10 skill rating system
- Real user data throughout the app

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Frontend Setup

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd smash-skill-track
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Start the frontend development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` (or `http://localhost:5174` if port 5173 is busy) to view the application.

### Backend Setup

Your project includes a mock backend server for API endpoints:

1. **Start the basic server**
```bash
# Using Node.js directly
node server/index.js
```

2. **Start the persistent server (recommended)**
```bash
# Using Node.js directly
node server/persistent-server.js
```

3. **Verify backend is running**
Visit `http://localhost:4000/api/player` in your browser.

You should see player data in JSON format.

### Running Both Frontend and Backend

**Option 1: Separate Terminals**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
node server/persistent-server.js
```

**Option 2: Using PowerShell (Windows)**
```powershell
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
node server/persistent-server.js
```

**Option 3: Add scripts to package.json (Optional)**
Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "server": "node server/persistent-server.js",
    "dev:full": "concurrently \"npm run dev\" \"npm run server\""
  }
}
```

Then run: `npm run dev:full`

## 📁 Project Structure

```
smash-skill-track/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── PlayerProfile.jsx
│   │   ├── SkillTracker.jsx
│   │   ├── PerformanceChart.jsx
│   │   └── MovingTabs.jsx
│   ├── pages/              # Page components
│   │   ├── static/        # Static pages with mock data
│   │   └── analytics/     # Analytics pages
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── assets/            # Images and static files
├── server/                # Backend API server
│   ├── index.js           # Basic Express server
│   ├── persistent-server.js # Persistent data server
│   └── playerData.json    # Player data storage
├── public/                # Public assets
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎯 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🔧 Backend Integration

### Current Status
Your project includes a fully functional Express.js backend server with the following features:

- **Player Data API** (`/api/player`) - GET, PUT, POST, DELETE operations
- **Persistent Data Storage** - Data saved to `playerData.json`
- **CORS Enabled** - Ready for frontend integration
- **Mock Data** - Realistic player data for testing

### Available API Endpoints

- `GET /api/player` - Retrieve player data
- `PUT /api/player` - Update player information
- `POST /api/player` - Create new player profile
- `DELETE /api/player` - Delete player data

### Backend Files

- `server/index.js` - Basic Express server with in-memory data
- `server/persistent-server.js` - Server with file-based persistence
- `server/playerData.json` - JSON file for data storage

### Frontend Integration
The frontend is already configured to work with the backend. The Dashboard component attempts to fetch player data from `http://localhost:4000/api/player` and falls back to mock data if the backend is not running.

## 🎨 UI Components

The application uses shadcn/ui components for a consistent and modern design:

- **Cards** - Content containers
- **Buttons** - Interactive elements
- **Forms** - Input components
- **Tabs** - Navigation components
- **Progress Bars** - Progress indicators
- **Badges** - Status indicators
- **Icons** - Lucide React icons

## 🌙 Dark Mode

The application supports both light and dark themes. Users can toggle between themes using the theme toggle button in the header.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

### Other Platforms
The application can be deployed to any static hosting service that supports React applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Contact the development team

---

**Happy Badminton Training! 🏸**
 


