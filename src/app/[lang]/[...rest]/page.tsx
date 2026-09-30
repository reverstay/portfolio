import { notFound } from "next/navigation";

// Qualquer rota inexistente dentro de /pt ou /en cai no not-found.tsx do idioma
export default function CatchAll() {
  notFound();
}
