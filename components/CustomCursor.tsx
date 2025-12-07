
import React, { useState, useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null); // The ring
  const dotRef = useRef<HTMLDivElement>(null);    // The dot
  
  // Position State
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const isFirstMove = useRef(true); // Track first movement to prevent entry animation
  
  // Idle Animation State
  const lastMoveTime = useRef(Date.now());
  const bounceStartTime = useRef<number | null>(null);
  const lastIdleLevel = useRef(0);
  const targetBounceCount = useRef(0);
  
  // Interaction State
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false); 
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Controls initial render visibility

  // Ripple State
  const [ripples, setRipples] = useState<{id: number, x: number, y: number}[]>([]);

  useEffect(() => {
    // --- Global Click/Touch Tracking for Ripples ---
    const handlePointerDown = (e: PointerEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      lastMoveTime.current = Date.now(); // Reset idle timer
      
      // Cleanup ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener('pointerdown', handlePointerDown);

    // --- Shared Logic for updating cursor state ---
    const updateCursorState = (clientX: number, clientY: number, eventTarget: EventTarget | null) => {
      lastMoveTime.current = Date.now(); // Reset idle timer

      // Update target position for the lerping animation
      target.current = { x: clientX, y: clientY };
      
      // Update the dot's position instantly for responsiveness (only if not currently animating idle bounce)
      if (dotRef.current && !bounceStartTime.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }

      // Check the element under the cursor to update hover/hidden states
      const t = eventTarget as HTMLElement;
      if (!t) return;
      
      const isInput = t.matches('input, textarea, [contenteditable="true"]');
      setIsHidden(isInput);
      
      const isClickable = t.closest('a, button, .cursor-pointer, select, [role="button"]');
      setIsHovering(!!isClickable && !isInput);
    };

    // --- Event Handlers ---
    const onMouseMove = (e: MouseEvent) => {
      if (isFirstMove.current) {
        isFirstMove.current = false;
        // Snap immediately to position on first move to avoid "flying in"
        pos.current = { x: e.clientX, y: e.clientY };
        target.current = { x: e.clientX, y: e.clientY };
        setIsVisible(true);
      }
      updateCursorState(e.clientX, e.clientY, e.target);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        if (isFirstMove.current) {
            isFirstMove.current = false;
            setIsVisible(true);
        }
        const touch = e.touches[0];
        // For touch, we find the element at the touch point coordinates
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        updateCursorState(touch.clientX, touch.clientY, targetElement);
      }
    };

    const onDown = () => { setIsClicked(true); lastMoveTime.current = Date.now(); };
    const onUp = () => { setIsClicked(false); lastMoveTime.current = Date.now(); };
    
    // --- Add Listeners ---
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onDown);
    window.addEventListener('touchend', onUp);

    // --- Animation Loop for the ring ---
    let animationFrameId: number;
    const loop = () => {
      const now = Date.now();
      const timeSinceMove = now - lastMoveTime.current;
      
      // Calculate current "idle level" (every 30 seconds is a level)
      // Level 1 = 30s-59s, Level 2 = 60s-89s, Level 3 = 90s+
      const currentIdleLevel = Math.floor(timeSinceMove / 30000);

      // 1. Idle Logic
      if (currentIdleLevel < lastIdleLevel.current) {
          // User moved (idle level dropped to 0), reset state
          lastIdleLevel.current = currentIdleLevel;
          bounceStartTime.current = null; // Stop any active bounce
      } else if (currentIdleLevel > lastIdleLevel.current && currentIdleLevel > 0) {
          // New threshold reached (30s, 60s, 90s...)
          lastIdleLevel.current = currentIdleLevel;
          
          // Determine bounce count based on level
          let bounces = 3; // Default 30s
          if (currentIdleLevel === 2) bounces = 5; // 60s
          if (currentIdleLevel >= 3) bounces = 6; // 90s+ (capped at 6)
          
          targetBounceCount.current = bounces;
          bounceStartTime.current = now;
      }

      let bounceOffsetY = 0;
      if (bounceStartTime.current) {
          const elapsed = now - bounceStartTime.current;
          const count = targetBounceCount.current;
          // Duration scales with bounces: approx 500ms per bounce
          const duration = count * 500; 
          
          if (elapsed < duration) {
              // Map elapsed time (0 -> duration) to (0 -> count * PI) for sine wave humps
              const t = (elapsed / duration) * count * Math.PI;
              // Negative Y is up. Abs(sin) creates bouncing humps. Amplitude 20px.
              bounceOffsetY = -Math.abs(Math.sin(t)) * 20;
          } else {
              bounceStartTime.current = null; // Animation finished
          }
      }

      // 2. Physics & Position
      // Smoother ease factor (0.15) creates a "gliding" feel. 
      const ease = 0.15; 
      
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;

      pos.current.x += dx * ease;
      pos.current.y += dy * ease;

      // Velocity calculation for dynamic scaling (Squash & Stretch effect)
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const scale = Math.min(1.15, 1 + velocity / 800); // Cap max scale at 1.15x

      if (cursorRef.current) {
        // Apply position AND dynamic scale + Bounce
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y + bounceOffsetY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      
      // If bouncing, we must manually update the dot's position to include the bounce
      // because the mouse event listeners aren't firing to update it.
      if (bounceStartTime.current && dotRef.current) {
         dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y + bounceOffsetY}px, 0) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchend', onUp);

      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Hide cursor if it hasn't moved yet or if hovering an input
  const opacityClass = (isHidden || !isVisible) ? 'opacity-0' : 'opacity-100';

  return (
    <>
      {/* THE RING */}
      <div 
        ref={cursorRef}
        className={`fixed pointer-events-none z-[10000] rounded-full border border-brand-orange ${opacityClass}`}
        style={{
          width: isHovering ? '60px' : '30px', 
          height: isHovering ? '60px' : '30px',
          backgroundColor: isHovering ? 'rgba(234, 141, 53, 0.05)' : 'transparent',
          borderColor: isClicked ? 'transparent' : '#ea8d35',
          borderWidth: isHovering ? '1px' : '1.5px',
          // Bouncy bezier curve for "Alive" feel
          transition: 'width 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28), height 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28), background-color 0.3s ease, border-color 0.1s ease', 
          willChange: 'transform, width, height'
        }}
      />
      
      {/* THE DOT */}
      <div 
        ref={dotRef}
        className={`fixed pointer-events-none z-[10001] ${opacityClass} transition-opacity duration-200`}
        style={{
          width: '8px',
          height: '8px',
          willChange: 'transform'
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-brand-orange transition-transform duration-100 shadow-[0_0_10px_rgba(234,141,53,0.6)]"
          style={{
            transform: `scale(${isClicked ? 0.5 : 1})`
          }}
        />
      </div>

      {/* RIPPLES (Visual feedback for touch/click) */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9999] rounded-full bg-brand-orange/40 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '40px',
            height: '40px',
            marginLeft: '-20px',
            marginTop: '-20px',
          }}
        />
      ))}
    </>
  );
};
