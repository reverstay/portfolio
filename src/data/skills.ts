import { resolve, type Lang, type Localized, type Resolved } from "@/i18n/config";

// Diagrama da página /skills-tree (coordenadas no viewBox 620x490).
// `root` marca o nó principal de cada ramo; `parent` liga o nó ao seu pai.
type RawSkillNode = { id: string; label: string | Localized<string>; x: number; y: number; root?: boolean; parent?: string };

export type SkillNode = Resolved<RawSkillNode>;

const raw: RawSkillNode[] = [
  { id: "py", label: "Python", x: 20, y: 45, root: true },
  { id: "dj", label: "Django / DRF", x: 160, y: 20, parent: "py" },
  { id: "dj-ch", label: "Channels", x: 300, y: 20, parent: "dj" },
  { id: "fa", label: "FastAPI · Flask", x: 160, y: 45, parent: "py" },
  { id: "data", label: "pandas · NumPy", x: 160, y: 70, parent: "py" },
  { id: "bi", label: "Power BI", x: 310, y: 70, parent: "data" },

  { id: "emb", label: { pt: "Embarcados", en: "Embedded" }, x: 20, y: 140, root: true },
  { id: "esp", label: "ESP32 · STM32", x: 160, y: 115, parent: "emb" },
  { id: "rtos", label: "FreeRTOS", x: 310, y: 115, parent: "esp" },
  { id: "rpi", label: "Raspberry Pi", x: 160, y: 140, parent: "emb" },
  { id: "ros", label: "ROS · LiDAR 2D", x: 300, y: 140, parent: "rpi" },
  { id: "kvm", label: "KVM over IP · WebRTC", x: 300, y: 162, parent: "rpi" },
  { id: "pcb", label: "PCB · KiCad", x: 160, y: 165, parent: "emb" },
  { id: "cpp", label: "C / C++", x: 160, y: 190, parent: "emb" },

  { id: "web", label: "Web & Mobile", x: 20, y: 270, root: true },
  { id: "react", label: "React", x: 160, y: 215, parent: "web" },
  { id: "tw", label: "Tailwind CSS", x: 250, y: 203, parent: "react" },
  { id: "next", label: "Next.js · shadcn/ui", x: 250, y: 228, parent: "react" },
  { id: "ts", label: "TypeScript", x: 160, y: 253, parent: "web" },
  { id: "ng", label: "Angular", x: 160, y: 278, parent: "web" },
  { id: "flutter", label: "Flutter", x: 160, y: 303, parent: "web" },
  { id: "kt", label: "Java · Kotlin / Quarkus", x: 160, y: 328, parent: "web" },

  { id: "infra", label: { pt: "Infraestrutura", en: "Infrastructure" }, x: 20, y: 382, root: true },
  { id: "docker", label: "Docker / Compose", x: 160, y: 355, parent: "infra" },
  { id: "ubuntu", label: "Ubuntu Server", x: 160, y: 380, parent: "infra" },
  { id: "nginx", label: "Nginx · Certbot", x: 300, y: 380, parent: "ubuntu" },
  { id: "pg", label: "PostgreSQL", x: 160, y: 405, parent: "infra" },
  { id: "ci", label: "Git · GitHub Actions", x: 325, y: 355, parent: "docker" },

  { id: "mfg", label: { pt: "Fabricação", en: "Manufacturing" }, x: 20, y: 455, root: true },
  { id: "fusion", label: "Fusion 360 · Blender", x: 160, y: 442, parent: "mfg" },
  { id: "scan", label: { pt: "Escaneamento 3D", en: "3D scanning" }, x: 160, y: 468, parent: "mfg" },
  { id: "print", label: { pt: "Impressão 3D", en: "3D printing" }, x: 350, y: 442, parent: "fusion" },
];

export function getSkillNodes(lang: Lang): SkillNode[] {
  return resolve(raw, lang);
}
