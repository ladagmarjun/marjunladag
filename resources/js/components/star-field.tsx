import React, { useEffect, useRef } from 'react';

interface StarFieldProps {
    isDark: boolean;
}

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    radius: number;
    color: string;
    opacity: number;
    life: number;
    maxLife: number;
}

interface EnergyStream {
    points: { x: number; y: number }[];
    color: string;
    width: number;
    speed: number;
    phase: number;
    freq: number;
    amp: number;
}

interface Star {
    x: number; y: number;
    r: number; opacity: number;
    twinkle: number; phase: number;
}

interface NebulaBlob {
    x: number; y: number;
    rx: number; ry: number;
    color: string;
    drift: number; phase: number;
}

// MCU Infinity Stone palette
const STONE_COLORS = [
    '147,51,234',   // Space stone – purple
    '59,130,246',   // Mind stone – blue
    '16,185,129',   // Time stone – green
    '239,68,68',    // Reality stone – red
    '251,191,36',   // Soul stone – gold
    '236,72,153',   // Power stone – pink
];

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export default function StarField({ isDark }: StarFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef   = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // ── Stars ──
        const stars: Star[] = Array.from({ length: 220 }, () => ({
            x:       Math.random() * window.innerWidth,
            y:       Math.random() * window.innerHeight,
            r:       rand(0.2, 1.4),
            opacity: rand(0.15, 0.7),
            twinkle: rand(0.005, 0.025),
            phase:   rand(0, Math.PI * 2),
        }));

        // ── Nebula blobs ──
        const nebulas: NebulaBlob[] = [
            { x: 0.15, y: 0.20, rx: 0.35, ry: 0.25, color: '147,51,234',  drift: 0.0003, phase: 0 },
            { x: 0.80, y: 0.15, rx: 0.30, ry: 0.20, color: '59,130,246',  drift: 0.0004, phase: 1.2 },
            { x: 0.50, y: 0.60, rx: 0.40, ry: 0.22, color: '16,185,129',  drift: 0.0002, phase: 2.5 },
            { x: 0.85, y: 0.70, rx: 0.28, ry: 0.18, color: '251,191,36',  drift: 0.0005, phase: 3.8 },
            { x: 0.10, y: 0.75, rx: 0.32, ry: 0.20, color: '236,72,153',  drift: 0.0003, phase: 5.0 },
        ];

        // ── Energy streams (like the Tesseract / Time stone beams) ──
        const streams: EnergyStream[] = STONE_COLORS.map((color, i) => ({
            points: [],
            color,
            width: rand(1.2, 2.5),
            speed: rand(0.0003, 0.0008),
            phase: (i / STONE_COLORS.length) * Math.PI * 2,
            freq:  rand(0.004, 0.009),
            amp:   rand(60, 140),
        }));

        // ── Particles (floating energy sparks) ──
        const particles: Particle[] = [];
        const spawnParticle = (W: number, H: number) => {
            const color = STONE_COLORS[Math.floor(Math.random() * STONE_COLORS.length)];
            particles.push({
                x:       rand(0, W),
                y:       rand(0, H),
                vx:      rand(-0.3, 0.3),
                vy:      rand(-0.6, -0.1),
                radius:  rand(1, 3),
                color,
                opacity: rand(0.4, 0.9),
                life:    0,
                maxLife: rand(120, 300),
            });
        };

        let t = 0;

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            t += 1;

            // ── Deep space gradient background ──
            const bg = ctx.createLinearGradient(0, 0, W, H);
            if (isDark) {
                bg.addColorStop(0,   '#020409');
                bg.addColorStop(0.4, '#050510');
                bg.addColorStop(1,   '#02080f');
            } else {
                bg.addColorStop(0,   '#f0f4ff');
                bg.addColorStop(1,   '#e8f0fe');
            }
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // ── Nebula blobs ──
            nebulas.forEach(nb => {
                const cx = W * nb.x + Math.sin(t * nb.drift + nb.phase) * 40;
                const cy = H * nb.y + Math.cos(t * nb.drift * 0.7 + nb.phase) * 25;
                const rx = W * nb.rx;
                const ry = H * nb.ry;

                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
                const alpha = isDark ? 0.07 : 0.04;
                grad.addColorStop(0,   `rgba(${nb.color},${alpha})`);
                grad.addColorStop(0.5, `rgba(${nb.color},${alpha * 0.5})`);
                grad.addColorStop(1,   `rgba(${nb.color},0)`);

                ctx.save();
                ctx.scale(1, ry / rx);
                ctx.beginPath();
                ctx.arc(cx, cy * (rx / ry), rx, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.restore();
            });

            if (isDark) {
                // ── Stars ──
                stars.forEach(s => {
                    const tw = Math.sin(t * s.twinkle + s.phase) * 0.4 + 0.6;
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255,255,255,${s.opacity * tw})`;
                    ctx.fill();
                });

                // ── Energy streams ──
                streams.forEach(stream => {
                    ctx.beginPath();
                    let started = false;
                    for (let x = 0; x <= W; x += 6) {
                        const y = H * 0.5
                            + Math.sin(x * stream.freq + t * stream.speed + stream.phase) * stream.amp
                            + Math.sin(x * stream.freq * 2.3 + t * stream.speed * 1.5 + stream.phase) * (stream.amp * 0.3);
                        if (!started) { ctx.moveTo(x, y); started = true; }
                        else ctx.lineTo(x, y);
                    }
                    ctx.strokeStyle = `rgba(${stream.color},0.18)`;
                    ctx.lineWidth   = stream.width;
                    ctx.shadowColor = `rgba(${stream.color},0.5)`;
                    ctx.shadowBlur  = 12;
                    ctx.stroke();
                    ctx.shadowBlur  = 0;
                });

                // ── Spawn & draw particles ──
                if (t % 4 === 0 && particles.length < 120) spawnParticle(W, H);

                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.life++;
                    if (p.life > p.maxLife) { particles.splice(i, 1); continue; }

                    const progress = p.life / p.maxLife;
                    const fade     = progress < 0.2
                        ? progress / 0.2
                        : progress > 0.8
                            ? (1 - progress) / 0.2
                            : 1;

                    p.x += p.vx;
                    p.y += p.vy;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle   = `rgba(${p.color},${p.opacity * fade})`;
                    ctx.shadowColor = `rgba(${p.color},0.8)`;
                    ctx.shadowBlur  = 8;
                    ctx.fill();
                    ctx.shadowBlur  = 0;
                }

                // ── Infinity ring glow at center top ──
                const ringX = W * 0.5;
                const ringY = H * 0.08;
                const ringR = Math.min(W, H) * 0.18 + Math.sin(t * 0.005) * 8;
                STONE_COLORS.forEach((color, i) => {
                    const angle = (i / STONE_COLORS.length) * Math.PI * 2 + t * 0.003;
                    const px = ringX + Math.cos(angle) * ringR;
                    const py = ringY + Math.sin(angle) * ringR * 0.35;

                    const glow = ctx.createRadialGradient(px, py, 0, px, py, 18);
                    glow.addColorStop(0,   `rgba(${color},0.5)`);
                    glow.addColorStop(0.4, `rgba(${color},0.15)`);
                    glow.addColorStop(1,   `rgba(${color},0)`);
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(px, py, 18, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
}
