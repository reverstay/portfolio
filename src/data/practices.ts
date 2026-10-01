import { resolve, type Lang, type Localized, type Resolved } from "@/i18n/config";

type Text = string | Localized<string>;

// Cards da página /como-desenvolvo. `language` define ícone e cor (ver LANGUAGES no componente).
type RawPractice = {
  title: Text;
  language: "python" | "cpp" | "typescript" | "flutter" | "docker" | "yaml";
  description: Text;
  fileName: string;
  code: string;
};

export type Practice = Resolved<RawPractice>;

const raw: RawPractice[] = [
  {
    title: { pt: "Migração de dados resiliente", en: "Resilient data migration" },
    language: "python",
    description: {
      pt: "Importações em lote com logs e conferência de registros: se a contagem não bate, o lote é refeito em vez de passar despercebido.",
      en: "Batch imports with logging and record checks: if the counts don't match, the batch is retried instead of slipping through.",
    },
    fileName: "sync_legacy.py",
    code: `def sync_table(source, target, batch_size=500):
    total = source.count()
    for offset in range(0, total, batch_size):
        rows = source.fetch(offset, batch_size)
        target.bulk_upsert(rows)
        logger.info("lote %s: %s registros", offset, len(rows))

    if target.count() != total:
        raise SyncMismatch(total, target.count())`,
  },
  {
    title: { pt: "Firmware previsível", en: "Predictable firmware" },
    language: "cpp",
    description: {
      pt: "Leituras periódicas sem bloquear o loop principal, para que o módulo continue respondendo à comunicação.",
      en: "Periodic readings without blocking the main loop, so the module keeps responding to communication.",
    },
    fileName: "telemetry.ino",
    code: `const unsigned long INTERVAL_MS = 5000;
unsigned long lastRead = 0;

void loop() {
  modem.poll();

  if (millis() - lastRead >= INTERVAL_MS) {
    lastRead = millis();
    float temp = sensor.readTemperature();
    publish("temperature", temp);
  }
}`,
  },
  {
    title: { pt: "Interfaces tipadas", en: "Typed interfaces" },
    language: "typescript",
    description: {
      pt: "Componentes React pequenos e tipados, que tornam o estado de cada equipamento explícito na tela.",
      en: "Small, typed React components that make each device's state explicit on screen.",
    },
    fileName: "device_status.tsx",
    code: `type Status = "online" | "offline" | "fault";

export function DeviceStatus({ name, status }: { name: string; status: Status }) {
  return (
    <span className={\`status status-\${status}\`}>
      {name}
    </span>
  );
}`,
  },
  {
    title: { pt: "Apps multiplataforma", en: "Cross-platform apps" },
    language: "flutter",
    description: {
      pt: "Um único código para Android e iOS, com estado isolado da interface para que as telas fiquem simples de manter e testar.",
      en: "One codebase for Android and iOS, with state kept out of the UI so screens stay easy to maintain and test.",
    },
    fileName: "ride_status.dart",
    code: `class RideStatus extends StatelessWidget {
  const RideStatus({super.key, required this.ride});

  final Ride ride;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(ride.driverName),
      subtitle: Text(ride.statusLabel),
      trailing: Text('\${ride.etaMinutes} min'),
    );
  }
}`,
  },
  {
    title: { pt: "Ambientes reproduzíveis", en: "Reproducible environments" },
    language: "docker",
    description: {
      pt: "Cada aplicação roda igual em desenvolvimento e produção: imagem enxuta, sem root e com dependências fixadas.",
      en: "Every app runs the same in development and production: a lean, non-root image with pinned dependencies.",
    },
    fileName: "Dockerfile",
    code: `FROM python:3.12-slim AS base
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN python manage.py collectstatic --noinput

USER 1000
EXPOSE 8000
CMD ["gunicorn", "core.wsgi", "-b", "0.0.0.0:8000"]`,
  },
  {
    title: { pt: "Entrega contínua", en: "Continuous delivery" },
    language: "yaml",
    description: {
      pt: "Testes a cada push e deploy automatizado, como nos pipelines das aplicações internas em Ubuntu Server.",
      en: "Tests on every push and automated deploys, as in the pipelines of the internal apps on Ubuntu Server.",
    },
    fileName: "deploy.yml",
    code: `name: deploy
on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: python manage.py test
      - run: ./scripts/deploy.sh`,
  },
];

export function getPractices(lang: Lang): Practice[] {
  return resolve(raw, lang);
}
