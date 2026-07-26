// ============================================
// PHYSICS GAME - STICKMAN WITH NEWTON'S LAWS
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fill container
function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 600;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ============================================
// PHYSICS CONSTANTS & CONFIG
// ============================================

const PHYSICS = {
    gravity: 9.81,
    friction: 0.85,
    airResistance: 0.98,
    mass: 1.5, // kg
};

const GROUND_LEVEL = canvas.height - 100;

// ============================================
// STICKMAN CLASS - WITH PHYSICS
// ============================================

class Stickman {
    constructor(x, y) {
        // Position
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 60;

        // Velocity (Newton's 1st Law: velocity changes with force)
        this.vx = 0; // horizontal velocity
        this.vy = 0; // vertical velocity

        // Acceleration (Newton's 2nd Law: a = F/m)
        this.ax = 0;
        this.ay = 0;

        // Forces
        this.fx = 0; // horizontal force
        this.fy = 0; // vertical force

        // State
        this.isGrounded = false;
        this.canJump = true;
        this.isDashing = false;
        this.dashCooldown = 0;

        // Visuals
        this.angle = 0;
        this.limbAngle = 0;
        this.limbSpeed = 0.15;
    }

    // Apply forces (Newton's 2nd Law: F = ma => a = F/m)
    applyForce(fx, fy = 0) {
        this.fx += fx;
        this.fy += fy;
    }

    // Update physics
    update() {
        // Apply gravity (force = mass * gravity)
        const gravityForce = PHYSICS.mass * PHYSICS.gravity;
        this.applyForce(0, gravityForce);

        // Calculate accelerations (a = F/m)
        this.ax = this.fx / PHYSICS.mass;
        this.ay = this.fy / PHYSICS.mass;

        // Update velocities (Newton's 1st Law: v = v + a*dt)
        this.vx += this.ax;
        this.vy += this.ay;

        // Apply air resistance
        this.vx *= PHYSICS.airResistance;
        this.vy *= PHYSICS.airResistance;

        // Update position (kinematic: x = x + v*dt)
        this.x += this.vx;
        this.y += this.vy;

        // Ground collision detection
        if (this.y + this.height >= GROUND_LEVEL) {
            this.y = GROUND_LEVEL - this.height;
            this.vy *= -PHYSICS.friction; // Newton's 3rd Law: opposite reaction
            this.isGrounded = true;
            this.canJump = true;

            // Friction on ground (velocity parallel to surface)
            this.vx *= PHYSICS.friction;
        } else {
            this.isGrounded = false;
        }

        // Wall collision
        if (this.x < 0) {
            this.x = 0;
            this.vx *= -0.8; // Bounce with energy loss
        }
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
            this.vx *= -0.8;
        }

        // Dash cooldown
        if (this.dashCooldown > 0) {
            this.dashCooldown--;
        }

        // Reset forces for next frame
        this.fx = 0;
        this.fy = 0;

        // Update animation
        if (this.isGrounded && Math.abs(this.vx) > 0.5) {
            this.limbAngle += this.limbSpeed;
        } else {
            this.limbAngle *= 0.95;
        }
    }

    // Input: Jump (apply upward force)
    jump() {
        if (this.canJump && this.isGrounded) {
            const jumpForce = 18 * PHYSICS.mass; // F = m * a
            this.applyForce(0, -jumpForce);
            this.vy = -18;
            this.canJump = false;
        }
    }

    // Input: Dash (apply horizontal impulse)
    dash(direction) {
        if (this.dashCooldown === 0) {
            const dashForce = direction * 25 * PHYSICS.mass;
            this.vx = direction * 25;
            this.dashCooldown = 30;
            this.isDashing = true;
        }
    }

    // Input: Move (apply horizontal force)
    moveLeft() {
        const moveForce = -12 * PHYSICS.mass;
        this.applyForce(moveForce, 0);
    }

    moveRight() {
        const moveForce = 12 * PHYSICS.mass;
        this.applyForce(moveForce, 0);
    }

    // Draw stickman
    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        // Rotate body based on velocity (visual feedback)
        if (this.vx !== 0) {
            this.angle = this.vx * 0.02;
        } else {
            this.angle *= 0.9;
        }
        ctx.rotate(this.angle);

        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const headRadius = 8;
        const bodyLength = 15;
        const armLength = 12;
        const legLength = 18;

        // Head
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(0, -headRadius - bodyLength / 2, headRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Eyes
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(-4, -headRadius - bodyLength / 2 - 1, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.arc(4, -headRadius - bodyLength / 2 - 1, 2, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -bodyLength / 2);
        ctx.lineTo(0, bodyLength / 2);
        ctx.stroke();

        // Arms with animation
        const armAngle = Math.sin(this.limbAngle) * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(Math.cos(Math.PI + armAngle) * armLength, -2 + Math.sin(Math.PI + armAngle) * armLength);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(Math.cos(armAngle) * armLength, -2 + Math.sin(armAngle) * armLength);
        ctx.stroke();

        // Legs with animation
        const legAngle = Math.sin(this.limbAngle) * 0.8;
        ctx.beginPath();
        ctx.moveTo(-3, bodyLength / 2);
        ctx.lineTo(-3 + Math.sin(legAngle) * 8, bodyLength / 2 + legLength);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(3, bodyLength / 2);
        ctx.lineTo(3 - Math.sin(legAngle) * 8, bodyLength / 2 + legLength);
        ctx.stroke();

        // Velocity indicator
        if (Math.abs(this.vx) > 1) {
            ctx.strokeStyle = 'rgba(52, 152, 219, 0.6)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0 + this.width / 2, 10);
            ctx.lineTo(0 + this.width / 2 + this.vx * 2, 10);
            ctx.stroke();
        }

        ctx.restore();
    }

    // Get kinetic energy (E = 0.5 * m * v²)
    getKineticEnergy() {
        const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
        return 0.5 * PHYSICS.mass * speed ** 2;
    }

    // Get potential energy (E = m * g * h)
    getPotentialEnergy() {
        const height = Math.max(0, GROUND_LEVEL - this.y);
        return PHYSICS.mass * PHYSICS.gravity * height;
    }

    // Get total mechanical energy
    getTotalEnergy() {
        return this.getKineticEnergy() + this.getPotentialEnergy();
    }

    // Get current force magnitude
    getForce() {
        return Math.sqrt(this.fx ** 2 + this.fy ** 2);
    }
}

// ============================================
// INPUT HANDLING
// ============================================

const keys = {};
const stickman = new Stickman(canvas.width / 2, GROUND_LEVEL - 60);

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === ' ') {
        stickman.jump();
        e.preventDefault();
    }
    if (e.key === 'p' || e.key === 'P') {
        togglePause();
    }
    if (e.key === 'Shift') {
        e.preventDefault();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Button controls
document.getElementById('leftBtn').addEventListener('mousedown', () => keys['a'] = true);
document.getElementById('leftBtn').addEventListener('mouseup', () => keys['a'] = false);
document.getElementById('rightBtn').addEventListener('mousedown', () => keys['d'] = true);
document.getElementById('rightBtn').addEventListener('mouseup', () => keys['d'] = false);
document.getElementById('jumpBtn').addEventListener('click', () => stickman.jump());
document.getElementById('dashBtn').addEventListener('click', () => {
    if (keys['d'] || keys['arrowright']) stickman.dash(1);
    else if (keys['a'] || keys['arrowleft']) stickman.dash(-1);
    else stickman.dash(1);
});

document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);

// Shift key for dash
window.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
        if (keys['d'] || keys['arrowright']) stickman.dash(1);
        else if (keys['a'] || keys['arrowleft']) stickman.dash(-1);
    }
});

// ============================================
// PHYSICS SETTINGS
// ============================================

document.getElementById('gravitySlider').addEventListener('input', (e) => {
    PHYSICS.gravity = parseFloat(e.target.value);
    document.getElementById('gravityValue').textContent = PHYSICS.gravity.toFixed(2);
});

document.getElementById('frictionSlider').addEventListener('input', (e) => {
    PHYSICS.friction = parseFloat(e.target.value);
    document.getElementById('frictionValue').textContent = PHYSICS.friction.toFixed(2);
});

document.getElementById('airSlider').addEventListener('input', (e) => {
    PHYSICS.airResistance = parseFloat(e.target.value);
    document.getElementById('airValue').textContent = PHYSICS.airResistance.toFixed(2);
});

// ============================================
// GAME LOOP
// ============================================

let isRunning = true;
let frameCount = 0;

function togglePause() {
    isRunning = !isRunning;
    document.getElementById('pauseBtn').textContent = isRunning ? 'Pause (P)' : 'Resume (P)';
}

function resetGame() {
    stickman.x = canvas.width / 2;
    stickman.y = GROUND_LEVEL - 60;
    stickman.vx = 0;
    stickman.vy = 0;
    stickman.fx = 0;
    stickman.fy = 0;
    stickman.isGrounded = false;
    stickman.canJump = true;
}

function update() {
    if (!isRunning) return;

    // Process input
    if (keys['a'] || keys['arrowleft']) stickman.moveLeft();
    if (keys['d'] || keys['arrowright']) stickman.moveRight();

    // Update physics
    stickman.update();

    // Update dash visual
    if (stickman.dashCooldown > 0) {
        stickman.isDashing = true;
    } else {
        stickman.isDashing = false;
    }
}

function draw() {
    // Clear canvas with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87ceeb');
    gradient.addColorStop(0.5, '#e0f6ff');
    gradient.addColorStop(1, '#90ee90');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(0, GROUND_LEVEL, canvas.width, canvas.height - GROUND_LEVEL);

    // Draw grass
    ctx.strokeStyle = '#228b22';
    ctx.lineWidth = 2;
    for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, GROUND_LEVEL);
        ctx.lineTo(x + 10, GROUND_LEVEL - 5);
        ctx.stroke();
    }

    // Draw grid for reference
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Draw stickman
    stickman.draw();

    // Draw velocity vector
    if (Math.abs(stickman.vx) > 0.1 || Math.abs(stickman.vy) > 0.1) {
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const centerX = stickman.x + stickman.width / 2;
        const centerY = stickman.y + stickman.height / 2;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + stickman.vx * 3, centerY + stickman.vy * 3);
        ctx.stroke();

        // Arrow head
        const angle = Math.atan2(stickman.vy * 3, stickman.vx * 3);
        ctx.beginPath();
        ctx.moveTo(centerX + stickman.vx * 3, centerY + stickman.vy * 3);
        ctx.lineTo(
            centerX + stickman.vx * 3 - 6 * Math.cos(angle - Math.PI / 6),
            centerY + stickman.vy * 3 - 6 * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(centerX + stickman.vx * 3, centerY + stickman.vy * 3);
        ctx.lineTo(
            centerX + stickman.vx * 3 - 6 * Math.cos(angle + Math.PI / 6),
            centerY + stickman.vy * 3 - 6 * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
    }

    // Draw force indicator
    if (stickman.getForce() > 5) {
        ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
        ctx.beginPath();
        ctx.arc(stickman.x + stickman.width / 2, stickman.y + stickman.height / 2, stickman.getForce(), 0, Math.PI * 2);
        ctx.fill();
    }
}

function updateStats() {
    const velocity = Math.sqrt(stickman.vx ** 2 + stickman.vy ** 2);
    const force = stickman.getForce();
    const energy = stickman.getTotalEnergy();

    document.getElementById('velocity').textContent = velocity.toFixed(2);
    document.getElementById('force').textContent = force.toFixed(2);
    document.getElementById('gravity').textContent = PHYSICS.gravity.toFixed(2);
    document.getElementById('energy').textContent = energy.toFixed(2);
}

function gameLoop() {
    update();
    draw();
    updateStats();
    frameCount++;
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();

// Prevent accidental page scroll
document.addEventListener('wheel', (e) => {
    if (e.target === canvas) {
        e.preventDefault();
    }
}, { passive: false });
