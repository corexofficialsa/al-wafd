import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxSurfaceProps {
  image?: string;
  surfaceClassName?: string;
  height?: string;
  children?: ReactNode;
  overlay?: boolean;
}

/**
 * Full-bleed section whose background drifts slower than scroll (parallax).
 * `image` layers over the CSS surface gradient; if it 404s the gradient still
 * reads as an intentional atmospheric backdrop rather than a broken image.
 */
export default function ParallaxSurface({
  image,
  surfaceClassName = "surface-haram",
  height = "100svh",
  children,
  overlay = true,
}: ParallaxSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);

  return (
    <div ref={ref} style={{ height }} className="relative overflow-hidden">
      <motion.div
        style={{
          y,
          scale,
          backgroundImage: image
            ? `linear-gradient(165deg, rgba(18,0,10,0.82) 0%, rgba(74,0,41,0.6) 45%, rgba(18,0,10,0.78) 100%), url(${image})`
            : undefined,
          backgroundBlendMode: image ? "multiply" : undefined,
        }}
        className={`absolute inset-0 bg-cover bg-center ${surfaceClassName}`}
      />
      {image && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,0,6,0.55)_100%)]" />
      )}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-cream" />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
