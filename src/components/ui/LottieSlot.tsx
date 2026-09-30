"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.Lottie), { ssr: false });

type Props = {
  // Caminho de um JSON Lottie em /public (ex.: "/lottie/hero.json")
  src: string;
  // Renderizado enquanto o arquivo não existe ou não carregou
  fallback: React.ReactNode;
  loop?: boolean;
  className?: string;
};

// Coloque animações de https://lottiefiles.com em public/lottie/ para substituir os fallbacks.
export function LottieSlot({ src, fallback, loop = true, className }: Props) {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    let active = true;
    fetch(src)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => active && setData(json))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [src]);

  if (!data) return <>{fallback}</>;
  return <Lottie src={data} autoplay loop={loop} className={className} />;
}
