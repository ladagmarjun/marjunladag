import React, { useEffect, useRef, useState } from 'react';

/**
 * A custom animated cursor: a small solid dot that tracks the pointer instantly,
 * plus a larger ring that trails behind with easing. The ring expands when
 * hovering interactive elements. Only rendered on fine-pointer devices (mouse),
 * so touch devices keep their native behaviour.
 */
export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        setEnabled(fine);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // Target (actual mouse) position and eased ring position.
        const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const ringPos = { ...target };
        let raf = 0;
        let visible = false;

        const onMove = (e: MouseEvent) => {
            target.x = e.clientX;
            target.y = e.clientY;
            dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            if (!visible) {
                visible = true;
                dot.style.opacity = '1';
                ring.style.opacity = '1';
            }
        };

        const onLeave = () => {
            visible = false;
            dot.style.opacity = '0';
            ring.style.opacity = '0';
        };

        const isInteractive = (el: Element | null) =>
            !!el?.closest('a, button, [role="button"], input, textarea, select, label, summary');

        const onOver = (e: MouseEvent) => {
            if (isInteractive(e.target as Element)) ring.dataset.hover = 'true';
            else delete ring.dataset.hover;
        };

        const render = () => {
            ringPos.x += (target.x - ringPos.x) * 0.18;
            ringPos.y += (target.y - ringPos.y) * 0.18;
            ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
            raf = requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseover', onOver);
        document.addEventListener('mouseleave', onLeave);
        raf = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseleave', onLeave);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            {/* Hide the native cursor everywhere while the custom one is active. */}
            <style>{`* { cursor: none !important; }`}</style>

            {/* Trailing ring */}
            <div
                ref={ringRef}
                className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-emerald-500/70 opacity-0 transition-[width,height,background-color,border-color] duration-200 ease-out"
                style={{ boxShadow: '0 0 12px rgba(16,185,129,0.5)' }}
            />

            {/* Instant dot */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-emerald-500 opacity-0"
                style={{ boxShadow: '0 0 8px rgba(16,185,129,0.9)' }}
            />

            <style>{`
                .cursor-ring[data-hover] {
                    width: 3rem;
                    height: 3rem;
                    background-color: rgba(16,185,129,0.12);
                    border-color: rgba(16,185,129,0.9);
                }
            `}</style>
        </>
    );
}
