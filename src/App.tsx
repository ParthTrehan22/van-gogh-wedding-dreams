import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Preloader from "./components/Preloader";
import { useAssetLoader } from "./hooks/useAssetLoader";

const TRACK_URL = "/Instagram Audio 53370.mp3";

function setupBackgroundAudio(lenis: Lenis) {
  const audio = new Audio(TRACK_URL);
  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = "auto";
  audio.muted = true;

  // Start muted autoplay — succeeds on desktop, blocked on iOS.
  // Sets audio.paused = false synchronously on desktop.
  audio.play().catch(() => {});

  let done = false;

  // Called from Lenis scroll — NOT a user gesture, so we must never
  // call audio.play() here (it would fail AND cancel the muted play).
  // We can only flip audio.muted which doesn't require a gesture.
  const onScroll = () => {
    if (done) return;
    if (!audio.paused) {
      // Muted autoplay is running → just unmute. This is a property
      // change on an already-playing element, no user gesture needed.
      audio.muted = false;
      done = true;
      cleanup();
    }
    // If audio.paused (iOS), scroll can't help — wait for a gesture.
  };

  // Called from click / touchstart / pointerdown / keydown — these ARE
  // user gestures that can start playback from scratch.
  const onGesture = () => {
    if (done) return;
    if (!audio.paused) {
      audio.muted = false;
      done = true;
      cleanup();
    } else {
      audio.muted = false;
      audio.play()
        .then(() => { done = true; cleanup(); })
        .catch(() => {});
    }
  };

  lenis.on("scroll", onScroll);

  const gestureEvents = ["click", "touchstart", "touchend", "pointerdown", "keydown"];
  gestureEvents.forEach((e) =>
    window.addEventListener(e, onGesture, true)
  );

  const cleanup = () => {
    lenis.off("scroll", onScroll);
    gestureEvents.forEach((e) =>
      window.removeEventListener(e, onGesture, true)
    );
  };

  return () => {
    cleanup();
    audio.pause();
    audio.src = "";
  };
}

const App = () => {
  const isLoading = useAssetLoader();

  useEffect(() => {
    if (isLoading) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.072,
      smoothWheel: true,
      anchors: true,
      wheelMultiplier: 0.9,
    });

    const teardownAudio = setupBackgroundAudio(lenis);

    return () => {
      teardownAudio();
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Preloader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;

