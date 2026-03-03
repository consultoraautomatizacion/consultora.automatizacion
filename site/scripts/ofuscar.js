/**
 * Script para ofuscar/minificar el sitio estático.
 * Genera la carpeta dist/ con JS ofuscado, CSS y HTML minificados.
 * Uso: desde site/ ejecutar  npm run ofuscar
 */

const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");
const { minify: minifyHtml } = require("html-minifier-terser");
const CleanCSS = require("clean-css");

const SRC = path.join(__dirname, "..");
const DIST = path.join(__dirname, "..", "dist");

const HTML_MIN_OPTS = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: false,
  keepClosingSlash: true,
};

const OBFUSCATE_OPTS = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: "hexadecimal",
  renameGlobals: false,
  selfDefending: false,
  stringArray: true,
  stringArrayEncoding: ["base64"],
  stringArrayThreshold: 0.75,
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(src, dest, skipDirs = ["node_modules", "dist", ".git", "scripts"]) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) {
      if (skipDirs.includes(e.name)) continue;
      copyRecursive(s, d, skipDirs);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

function processJs(dirIn, dirOut) {
  ensureDir(dirOut);
  const files = fs.readdirSync(dirIn);
  for (const f of files) {
    if (!f.endsWith(".js")) continue;
    if (f.endsWith(".min.js")) {
      fs.copyFileSync(path.join(dirIn, f), path.join(dirOut, f));
      console.log("  (copiado min) " + f);
      continue;
    }
    const code = fs.readFileSync(path.join(dirIn, f), "utf8");
    try {
      const result = JavaScriptObfuscator.obfuscate(code, OBFUSCATE_OPTS);
      fs.writeFileSync(path.join(dirOut, f), result.getObfuscatedCode(), "utf8");
      console.log("  ofuscado: " + f);
    } catch (err) {
      console.warn("  error ofuscando " + f + ":", err.message);
      fs.copyFileSync(path.join(dirIn, f), path.join(dirOut, f));
    }
  }
}

function processCss(dirIn, dirOut) {
  ensureDir(dirOut);
  const files = fs.readdirSync(dirIn);
  const cc = new CleanCSS({ level: 2 });
  for (const f of files) {
    if (!f.endsWith(".css")) continue;
    const full = path.join(dirIn, f);
    if (!fs.statSync(full).isFile()) continue;
    try {
      const out = cc.minify(fs.readFileSync(full, "utf8"));
      if (out.errors.length) {
        fs.copyFileSync(full, path.join(dirOut, f));
        console.log("  (copiado) " + f);
      } else {
        fs.writeFileSync(path.join(dirOut, f), out.styles, "utf8");
        console.log("  minificado: " + f);
      }
    } catch (err) {
      fs.copyFileSync(full, path.join(dirOut, f));
      console.log("  (copiado) " + f);
    }
  }
}

async function processHtml(dir) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
  for (const f of files) {
    const filePath = path.join(dir, f);
    try {
      const html = fs.readFileSync(filePath, "utf8");
      const out = await minifyHtml(html, HTML_MIN_OPTS);
      fs.writeFileSync(filePath, out, "utf8");
      console.log("  minificado: " + f);
    } catch (err) {
      console.warn("  error " + f + ":", err.message);
    }
  }
}

async function main() {
  console.log("Ofuscando sitio en " + SRC + " -> " + DIST + "\n");

  if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true });
  }

  console.log("1. Copiando archivos...");
  copyRecursive(SRC, DIST);

  console.log("\n2. Ofuscando JS en dist/js/");
  processJs(path.join(DIST, "js"), path.join(DIST, "js"));

  console.log("\n3. Minificando CSS en dist/css/");
  const cssDir = path.join(DIST, "css");
  if (fs.existsSync(cssDir)) {
    processCss(cssDir, cssDir);
    const subdirs = fs.readdirSync(cssDir, { withFileTypes: true }).filter((e) => e.isDirectory());
    for (const d of subdirs) {
      const sub = path.join(cssDir, d.name);
      processCss(sub, sub);
    }
  }

  console.log("\n4. Minificando HTML en dist/");
  await processHtml(DIST);

  console.log("\nListo. Sitio ofuscado en: " + DIST);
  console.log("Puedes publicar la carpeta dist/ en lugar de site/.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
