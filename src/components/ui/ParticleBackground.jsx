import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

export const ParticleBackground = () => {
  const canvasRef = useRef(null),
    { theme } = useTheme();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId,
      particles = [];
    const mouse = {
        x: -1e3,
        y: -1e3,
      },
      handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
      },
      createParticles = () => {
        particles = [];
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15e3);
        for (let i = 0; i < particleCount; i++)
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
          });
      },
      animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = theme === "dark" || document.documentElement.classList.contains("dark"),
          dotColor = isDark ? "rgba(6, 182, 212, 0.8)" : "rgba(34, 197, 94, 0.8)",
          lineColor = isDark ? "rgba(6, 182, 212, 0.6)" : "rgba(34, 197, 94, 0.6)";
        particles.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          (particle.x < 0 || particle.x > canvas.width) && (particle.vx *= -1);
          (particle.y < 0 || particle.y > canvas.height) && (particle.vy *= -1);
          const dx = mouse.x - particle.x,
            dy = mouse.y - particle.y,
            distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const angle = Math.atan2(dy, dx),
              force = (150 - distance) / 150;
            particle.vx -= Math.cos(angle) * force * 0.05;
            particle.vy -= Math.sin(angle) * force * 0.05;
          }
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
          for (let j = index + 1; j < particles.length; j++) {
            const other = particles[j],
              lineDx = particle.x - other.x,
              lineDy = particle.y - other.y,
              lineDistance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);
            lineDistance < 150 &&
              (ctx.beginPath(),
              ctx.moveTo(particle.x, particle.y),
              ctx.lineTo(other.x, other.y),
              (ctx.strokeStyle = lineColor),
              (ctx.lineWidth = 1 - lineDistance / 150),
              ctx.stroke());
          }
        });
        animationId = requestAnimationFrame(animate);
      },
      handleMouseMove = (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      };
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();
    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{
        opacity: 0.6,
      }}
    />
  );
};
