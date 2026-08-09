# TaskFlow - Modern Todo App

A beautiful, modern todo application with liquid glass design, built with vanilla HTML/CSS/JavaScript. Works on desktop, mobile, and as a PWA (Progressive Web App).

## Features

✨ **Core Features**
- Add, edit, and delete tasks
- Mark tasks as complete
- Category filtering (Work, Personal, Health, Study, Other)
- Due date management with overdue warnings
- Task notes and descriptions
- Real-time task statistics

🔔 **Smart Reminders**
- Set alarm times for tasks
- Browser notifications when alarms trigger
- Automatic alarm scheduling

📱 **Multi-Platform**
- Works on desktop browsers
- Mobile-friendly responsive design
- PWA support (install as app)
- Offline-first functionality

🎨 **Design**
- Dark theme with liquid glass effect
- Smooth animations and transitions
- Gradient accents (Purple → Blue → Pink)
- Modern glassmorphism UI

## Files Included

```
taskflow/
├── index.html          # Main HTML file with all styles
├── app.js              # JavaScript logic and functionality
├── manifest.json       # PWA configuration
├── sw.js               # Service Worker for offline support
└── README.md           # This file
```

## Quick Start

### Option 1: Run Locally (Easiest)

1. **Create a folder** named `taskflow` on your computer
2. **Download all 5 files** into that folder:
   - `index.html`
   - `app.js`
   - `manifest.json`
   - `sw.js`
   - `README.md`

3. **Open `index.html`** in your browser
   - Double-click `index.html`, OR
   - Right-click → "Open with" → Choose your browser

**That's it!** The app is ready to use.

### Option 2: Local Server (For PWA Features)

If you want full PWA functionality (offline mode, install as app), run a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Deployment Options

### Free Hosting (Recommended)

#### **Netlify** (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Sign up (free with GitHub/Google)
3. Drag & drop the `taskflow` folder
4. Your app is live in seconds! Get a free `.netlify.app` URL

#### **Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project" → Import Git repo or drag folder
4. Deploy in one click

#### **GitHub Pages**
1. Create a GitHub account
2. Create a new repository named `username.github.io`
3. Upload all files to the `main` branch
4. Your site goes live at `https://username.github.io`

### Your Own Domain

If you have a domain, you can:
- Point it to Netlify/Vercel deployment
- Use shared hosting (GoDaddy, Bluehost, etc.)
- Self-host with your own server

## Features Explained

### Adding Tasks
1. Tap the **+** button
2. Fill in task details:
   - **Title** (required)
   - **Note** (optional description)
   - **Category** (Work, Personal, Health, Study, Other)
   - **Due Date**
   - **Alarm Time** (optional - sets a reminder)
3. Tap "Add Task"

### Managing Tasks
- **Mark Done**: Tap the circle checkbox
- **Delete**: Tap the X button
- **Filter**: Use tabs to filter by category or completion status

### Alarms & Reminders
- Enable "Reminder" when creating a task
- Set a specific time
- Browser will notify you when it's time
- Works even when you close the tab (if using PWA)

### Stats Dashboard
- **Total**: All tasks
- **Done**: Completed tasks
- **Pending**: Tasks not yet done
- **Alarms**: Tasks with active reminders

## Install as App (PWA)

### On iPhone
1. Open TaskFlow in Safari
2. Tap **Share** button (middle bottom)
3. Scroll down, tap **"Add to Home Screen"**
4. Confirm - icon appears on home screen

### On Android
1. Open TaskFlow in Chrome or Firefox
2. Tap **⋮ (menu)** → **"Install app"** OR
3. Tap **⋮** → **"Add to Home Screen"**
4. Icon appears on your home screen

### On Windows/Mac Desktop
1. Open TaskFlow in Chrome or Edge
2. Click the **Install icon** (top-right URL bar)
3. Confirm installation
4. App opens in its own window

## Data Storage

Your tasks are saved **locally** in your browser using LocalStorage:
- Desktop: Data saved on that computer
- Mobile: Data saved on that phone
- Each device stores separately (no auto-sync)

### Export/Backup
TaskFlow stores data in browser's LocalStorage. To backup:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run: `copy(JSON.stringify(tasks))`
4. Paste into a text file

### Import Backup
1. Open DevTools Console
2. Run: `localStorage.setItem('taskflow_tasks', '[paste_your_backup_here]')`
3. Refresh page

## Browser Support

✅ Works on:
- Chrome/Edge (all versions)
- Firefox (all versions)
- Safari (iOS 12+, macOS 11+)
- Opera, Brave, and other Chromium browsers

## Troubleshooting

### Tasks disappear on refresh
- Make sure JavaScript is enabled
- Clear browser cache and reload
- Check if LocalStorage is enabled

### Alarms not working
- Browser needs notification permission (grant it when prompted)
- Tab must be open or app installed as PWA
- Check system time is correct

### App won't install as PWA
- Must be on HTTPS (localhost works, but domains need SSL)
- Run on local server (see Option 2 above)

## Customization

### Change Colors
Edit the `:root` section in `index.html`:
```css
:root {
    --accent: #7c6fff;      /* Purple */
    --accent2: #a78bfa;     /* Light purple */
    --accent3: #60a5fa;     /* Blue */
    --pink: #f472b6;        /* Pink */
    --cyan: #22d3ee;        /* Cyan */
    /* ... etc */
}
```

### Change App Name
In `index.html`, find:
```html
<div class="app-title">✦ TaskFlow</div>
```

In `manifest.json`, update:
```json
"name": "Your App Name",
"short_name": "Short Name"
```

## Tips & Tricks

💡 **Pro Tips:**
- Use categories to organize tasks by context
- Set alarms for time-sensitive tasks
- Check "Alarms" tab to see all reminders
- Tasks auto-sort by date (oldest first)
- Swipe tabs horizontally on mobile

## License

Free to use and modify. No credit needed, but attribution is appreciated!

---

**Enjoy using TaskFlow!** 🚀

For questions or issues, refer to the code comments or reach out to the developer.
