# 🏸 Badminton Skills Tracking App

A comprehensive web application for tracking badminton player skills, training plans, goals, and competition results. Built with React, Vite, and modern UI components.

## ✨ Features

- **Player Dashboard**: Overview of player stats and recent activities
- **Skill Assessment**: Interactive skill rating system with achievement unlocks
- **Training Plans**: Create and track personalized training programs
- **Goal Setting**: Set and monitor progress towards badminton goals
- **Competition Results**: Record and display tournament achievements with medal tracking
- **Practice Sessions**: Log training sessions and track improvement
- **Performance Analytics**: Visual charts and progress tracking
- **Dark Mode**: Toggle between light and dark themes

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript/JavaScript** - Programming language
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - UI component library
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **React Router** - Navigation
- **Recharts** - Data visualization

### Backend (Mock Data)
- Currently using mock data for demonstration
- Ready for backend integration

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
Navigate to `http://localhost:5173` to view the application.

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
 


