import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";

export type EventAtmosphereVariant = "haldi" | "sangeet" | "varmala" | "reception";

/** Pink-only petal fills (soft rose / blush / sakura) */
const PINK_PETAL_GRADIENTS = [
  "linear-gradient(145deg, #FFF0F5 0%, #FFB6C1 42%, #E8A0B4 100%)",
  "linear-gradient(160deg, #FFE4EC 0%, #FF9EBB 48%, #DB7093 100%)",
  "linear-gradient(130deg, #FCE4EC 0%, #F48FB1 45%, #C2185B 98%)",
  "linear-gradient(155deg, #FFF5F8 0%, #FFC0CB 50%, #E91E8C 100%)",
  "linear-gradient(140deg, #F8BBD0 0%, #F06292 55%, #AD1457 100%)",
  "linear-gradient(165deg, #FFECF2 0%, #FF80AB 40%, #C48B9F 100%)",
] as const;

function HaldiYellowBursts() {
  const rings = useMemo(
    () =>
      [
        { left: "45%", top: "42%", delay: "0s", size: "min(34vw, 220px)", tone: "haldi-ring-gold" as const },
        { left: "18%", top: "62%", delay: "0.7s", size: "min(30vw, 200px)", tone: "haldi-ring-pink" as const },
        { left: "72%", top: "28%", delay: "1.3s", size: "min(32vw, 210px)", tone: "haldi-ring-green" as const },
        { left: "52%", top: "78%", delay: "2s", size: "min(26vw, 180px)", tone: "haldi-ring-orange" as const },
        { left: "12%", top: "22%", delay: "2.5s", size: "min(28vw, 195px)", tone: "haldi-ring-magenta" as const },
      ] as const,
    []
  );

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Holi-style color waves — subtle; content stacks above */}
      <motion.div
        className="absolute inset-y-0 left-0 w-[58%] max-w-[520px] holi-splash holi-splash--left"
        initial={false}
        animate={{
          opacity: [0.22, 0.52, 0.32, 0.46, 0.24],
          x: ["-14%", "-2%", "-8%", "0%", "-5%"],
          scaleY: [0.92, 1.04, 0.97, 1.02, 0.95],
        }}
        transition={{ duration: 2.85, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-[58%] max-w-[520px] holi-splash holi-splash--right"
        initial={false}
        animate={{
          opacity: [0.2, 0.5, 0.3, 0.44, 0.22],
          x: ["14%", "2%", "8%", "0%", "5%"],
          scaleY: [0.95, 1.06, 0.98, 1.03, 0.96],
        }}
        transition={{ duration: 2.85, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-[42%] max-h-[320px] holi-splash holi-splash--top"
        initial={false}
        animate={{
          opacity: [0.16, 0.44, 0.26, 0.4, 0.18],
          y: ["-18%", "-4%", "-12%", "-2%", "-10%"],
        }}
        transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[38%] max-h-[280px] holi-splash holi-splash--bottom"
        initial={false}
        animate={{
          opacity: [0.15, 0.42, 0.24, 0.38, 0.16],
          y: ["18%", "4%", "12%", "2%", "10%"],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.35 }}
      />

      {rings.map((ring, i) => (
        <div
          key={i}
          className={`absolute haldi-burst-ring ${ring.tone}`}
          style={{
            left: ring.left,
            top: ring.top,
            animationDelay: ring.delay,
            width: ring.size,
            height: ring.size,
          }}
        />
      ))}
      <div className="absolute inset-0 haldi-holi-vignette pointer-events-none" />
    </div>
  );
}

function SangeetSkyCrackers({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const fire = confetti.create(canvas, { resize: true, useWorker: false });
    const burst = () => {
      const x = 0.1 + Math.random() * 0.8;
      const y = 0.04 + Math.random() * 0.24;
      fire({
        particleCount: isMobile ? 44 : 68,
        spread: isMobile ? 62 : 76,
        startVelocity: isMobile ? 28 : 36,
        ticks: isMobile ? 170 : 220,
        gravity: 0.84,
        scalar: isMobile ? 1.0 : 1.12,
        origin: { x, y },
        colors: ["#FFD700", "#FFF8DC", "#FF6B6B", "#87CEEB", "#E6E6FA", "#FFFFFF", "#FFA500"],
      });
      fire({
        particleCount: isMobile ? 22 : 32,
        angle: 60,
        spread: 54,
        origin: { x: Math.max(0.06, x - 0.08), y: Math.min(0.56, y + 0.08) },
        colors: ["#FFD700", "#FFA500", "#FFFFFF"],
      });
    };

    // Start after one frame so canvas dimensions are ready on all devices.
    const startId = window.requestAnimationFrame(() => burst());
    const intervalId = window.setInterval(burst, isMobile ? 560 : 460);
    const stopTimeout = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, isMobile ? 7500 : 9000);

    return () => {
      window.cancelAnimationFrame(startId);
      window.clearInterval(intervalId);
      window.clearTimeout(stopTimeout);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none" aria-hidden />;
}

function VarmalaFlowerShower() {
  const petals = useMemo(
    () =>
      Array.from({ length: 72 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + Math.sin(i) * 13) % 100}%`,
        delay: (i % 12) * 0.35 + Math.random() * 0.4,
        // Faster fall: shorter animation duration per petal
        duration: 6 + Math.random() * 5.5,
        drift: -28 + Math.random() * 56,
        scale: 0.72 + Math.random() * 0.58,
        gradient: PINK_PETAL_GRADIENTS[i % PINK_PETAL_GRADIENTS.length],
        // Slightly larger petals for a denser flower shower
        petalW: 9 + Math.random() * 7,
        petalH: 18 + Math.random() * 15,
        baseRotate: -40 + Math.random() * 80,
      })),
    []
  );

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none opacity-75 will-change-transform"
          style={{
            left: p.left,
            top: "-6%",
            width: p.petalW,
            height: p.petalH,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            background: p.gradient,
            boxShadow: "0 1px 4px rgba(232, 104, 142, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.45)",
          }}
          initial={{ opacity: 0, scale: p.scale }}
          animate={{
            y: ["0vh", "118vh"],
            x: [0, p.drift * 0.55],
            opacity: [0, 0.78, 0.72, 0.5, 0],
            rotate: [p.baseRotate, p.baseRotate + 48, p.baseRotate - 32, p.baseRotate + 24],
            scale: p.scale,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden
        />
      ))}
    </div>
  );
}

type PaparazziFlash = { id: number; left: string; top: string; size: number };

function ReceptionPaparazziFlashes() {
  const [flashes, setFlashes] = useState<PaparazziFlash[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const removeFlash = (id: number) => {
      if (cancelled) return;
      setFlashes((prev) => prev.filter((f) => f.id !== id));
    };

    const spawnFlash = () => {
      if (cancelled) return;
      const id = ++nextId.current;
      const left = `${6 + Math.random() * 88}%`;
      const top = `${6 + Math.random() * 88}%`;
      const size = 100 + Math.random() * 260;
      setFlashes((prev) => [...prev.slice(-18), { id, left, top, size }]);
      window.setTimeout(() => removeFlash(id), 160 + Math.random() * 120);
    };

    const paparazziBurst = () => {
      if (cancelled) return;
      spawnFlash();
      if (Math.random() < 0.45) {
        window.setTimeout(() => {
          if (!cancelled) spawnFlash();
        }, 35 + Math.random() * 90);
      }
      if (Math.random() < 0.3) {
        window.setTimeout(() => {
          if (!cancelled) spawnFlash();
        }, 90 + Math.random() * 110);
      }
    };

    const tick = () => {
      if (cancelled) return;
      if (Math.random() < 0.22) {
        paparazziBurst();
      } else {
        spawnFlash();
      }
      timeoutId = window.setTimeout(tick, 180 + Math.random() * 520);
    };

    paparazziBurst();
    timeoutId = window.setTimeout(tick, 280);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {flashes.map((f) => (
        <motion.div
          key={f.id}
          className="absolute reception-paparazzi-flash"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            marginLeft: -f.size / 2,
            marginTop: -f.size / 2,
          }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{
            opacity: [0, 1, 0.92, 0.55, 0],
            scale: [0.35, 1.15, 1.45, 1.05, 0.85],
          }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

interface EventAtmosphereProps {
  variant: EventAtmosphereVariant;
}

const EventAtmosphere = ({ variant }: EventAtmosphereProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Live visibility (used for Sangeet so crackers stop when leaving that card)
  const isInView = useInView(containerRef, {
    once: false,
    amount: variant === "sangeet" ? 0.25 : 0.12,
    margin: variant === "sangeet" ? "0px 0px -12% 0px" : "0px 0px -8% 0px",
  });
  // One-time gate (used by other sections that should keep playing once triggered)
  const hasEnteredRef = useRef(false);

  if (isInView) {
    hasEnteredRef.current = true;
  }

  const hasEntered = hasEnteredRef.current;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
      {variant === "haldi" && hasEntered && <HaldiYellowBursts />}
      {variant === "sangeet" && <SangeetSkyCrackers active={isInView} />}
      {variant === "varmala" && hasEntered && <VarmalaFlowerShower />}
      {variant === "reception" && hasEntered && <ReceptionPaparazziFlashes />}
    </div>
  );
};

export default EventAtmosphere;
