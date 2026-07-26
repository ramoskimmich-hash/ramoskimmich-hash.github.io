# Portfolio | ramoskimmich-hash 🚀

Welcome to my GitHub Pages portfolio! This repository features multiple interactive web applications showcasing different technologies and skills.

---

## 📱 Projects

### 1. **Advanced Calculator** 🧮
A modern, feature-rich calculator with advanced functions and real-time calculations.

**Features:**
- Basic arithmetic operations (+, −, ×, ÷)
- Advanced functions (√, x², 1/x, %, +/−, π)
- Memory operations (MC, MR, M+, M−)
- Dark theme with smooth animations

**Access:** [https://ramoskimmich-hash.github.io](https://ramoskimmich-hash.github.io)

---

### 2. **Stickman Physics Game** ⚛️ *NEW*
A high-end physics game featuring realistic stickman simulation with Newton's Laws of Motion.

**Features:**
- ✅ **Realistic Physics Engine** - All three Newton's Laws implemented
  - 1st Law: Stickman maintains velocity until forces act
  - 2nd Law: F = ma (acceleration from forces)
  - 3rd Law: Action-reaction forces with bouncing & friction
- ✅ **Interactive Gameplay**
  - Move left/right (A/D or Arrow Keys)
  - Jump (Space bar)
  - Dash for speed boost (Shift key)
  - Pause/Resume (P key)
- ✅ **Adjustable Physics Settings**
  - Gravity slider (0-20 m/s²)
  - Friction control
  - Air resistance adjustment
- ✅ **Real-Time Statistics**
  - Velocity display (m/s)
  - Applied force (Newtons)
  - Mechanical energy calculation (Joules)
  - Kinetic & potential energy tracking
- ✅ **Professional Visuals**
  - Animated stickman with limbs
  - Velocity vectors with directional arrows
  - Force indicator aura
  - Beautiful sky-to-grass gradient environment
  - Reference grid background

**Access:** [https://ramoskimmich-hash.github.io/physics-game.html](https://ramoskimmich-hash.github.io/physics-game.html)

**Game Controls:**
| Control | Action |
|---------|--------|
| A / ← | Move Left |
| D / → | Move Right |
| Space | Jump |
| Shift | Dash |
| P | Pause/Resume |
| Button Controls | GUI buttons available |

---

## 🛠️ Technologies Used

### Overall
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: GitHub Pages
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)

### Calculator
- Vanilla JavaScript for logic
- CSS Grid for responsive layout
- Advanced CSS animations

### Physics Game
- Canvas 2D API for rendering
- Custom physics engine implementation
- Real-time collision detection
- Energy calculations (E = ½mv² + mgh)
- Velocity and force vector visualization

---

## 📁 File Structure

```
ramoskimmich-hash.github.io/
├── index.html              # Calculator (default home)
├── styles.css              # Calculator styles
├── script.js               # Calculator logic
├── physics-game.html       # Physics game interface
├── physics-game.css        # Physics game styling
├── physics-game.js         # Physics engine
└── README.md              # This file
```

---

## 🎮 Physics Game Details

### Physics Implementation
The physics game is built with a complete physics engine that simulates:

**Forces:**
- Gravity: F = m × g (9.81 m/s² default)
- Friction: Applied on ground contact
- Air resistance: Velocity damping mid-air
- Applied forces: Player input forces

**Kinematic Equations:**
- Position: x = x + v·dt
- Velocity: v = v + a·dt
- Acceleration: a = F/m (Newton's 2nd Law)

**Collision Detection:**
- Ground collision with bounce
- Wall collision with energy loss
- Jump detection (grounded state)

**Energy:**
- Kinetic Energy: E = ½mv²
- Potential Energy: E = mgh
- Total Mechanical Energy: E_total = E_kinetic + E_potential

---

## 🚀 Getting Started

### Online
Simply visit the links above to play/use the applications instantly!

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/ramoskimmich-hash/ramoskimmich-hash.github.io.git
cd ramoskimmich-hash.github.io
```

2. **Start a local server:**
```bash
# Python 3
python -m http.server 8000

# Or using Node.js
npx http-server

# Or using Python 2
python -m SimpleHTTPServer 8000
```

3. **Open in browser:**
- Calculator: `http://localhost:8000`
- Physics Game: `http://localhost:8000/physics-game.html`

---

## 📊 Physics Game Statistics

The game displays real-time physics data:
- **Velocity**: Magnitude of stickman's movement (m/s)
- **Force**: Current net force applied (Newtons)
- **Gravity**: Current gravity acceleration (m/s²)
- **Energy**: Total mechanical energy of the system (Joules)

These values update in real-time and respond to:
- Player input (movement, jumping, dashing)
- Adjustable physics sliders
- Collision events
- Gravity changes

---

## 🎨 Design Features

### Calculator
- Modern dark theme
- Vibrant gradient accents
- Smooth button animations
- Color-coded button types
- Responsive mobile design

### Physics Game
- Purple-to-blue gradient header
- Sky-to-grass canvas gradient
- Smooth control animations
- Responsive grid layout
- Professional typography

---

## 🔄 Future Enhancements

**Calculator:**
- Keyboard input support
- Scientific calculation mode
- Dark/Light theme toggle
- Calculation history

**Physics Game:**
- Multiple stickman physics modes
- Obstacle courses
- Multiplayer support
- Advanced particles/effects
- Sound effects
- Level progression

---

## 📝 License

This project is open source and available under the **MIT License**.

---

## 🤝 Contributing

Found a bug? Have a feature suggestion? Feel free to:
- Open an issue
- Submit a pull request
- Provide feedback

---

## 👨‍💻 About

**Created by:** ramoskimmich-hash  
**GitHub:** [ramoskimmich-hash](https://github.com/ramoskimmich-hash)  
**Portfolio:** [ramoskimmich-hash.github.io](https://ramoskimmich-hash.github.io)

---

**Made with ❤️ and ⚛️ Physics**
