// Realce de sintaxe mínimo no estilo VS Code Dark+, suficiente para trechos curtos.
const KEYWORDS = new Set([
  "class", "final", "const", "return", "async", "await", "Future", "public", "interface", "private", "readonly",
  "static", "void", "new", "import", "export", "function", "type", "if", "else", "try", "catch", "throw", "this",
  "extends", "implements", "on", "uses", "run", "true", "false", "null", "let", "var",
]);

const TOKEN_RE =
  /(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)*\b)|(^\s*[\w-]+(?=:))|(\b[A-Za-z_]\w*\b)(?=\s*\()|(\b[A-Z]\w*\b)|(\b[a-z_]\w*\b)/gm;

function highlight(code: string, yaml: boolean) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of code.matchAll(TOKEN_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(code.slice(last, idx));
    const [text, comment, str, num, yamlKey, fn, type, word] = m;
    let color: string | undefined;
    if (comment && (yaml ? comment.startsWith("#") : comment.startsWith("//"))) color = "#6A9955";
    else if (str) color = "#CE9178";
    else if (num) color = "#B5CEA8";
    else if (yamlKey && yaml) color = "#4FC1FF";
    else if (fn && !KEYWORDS.has(fn)) color = "#DCDCAA";
    else if (type && !KEYWORDS.has(type)) color = "#4EC9B0";
    else if ((word || fn || type) && KEYWORDS.has(text.trim())) color = "#569CD6";
    out.push(
      color ? (
        <span key={key++} style={{ color }}>
          {text}
        </span>
      ) : (
        text
      ),
    );
    last = idx + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function CodeBlock({ code, yaml = false }: { code: string; yaml?: boolean }) {
  return (
    <pre className="text-xs sm:text-sm text-[#d4d4d4] leading-relaxed font-mono whitespace-pre overflow-x-auto py-2">
      <code>{highlight(code, yaml)}</code>
    </pre>
  );
}
