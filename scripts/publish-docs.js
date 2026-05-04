const fs = require("fs");
const path = require("path");

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const e of entries) {
    const srcPath = path.join(src, e.name);
    const dstPath = path.join(dest, e.name);
    if (e.isDirectory()) {
      copyDirSync(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

function main() {
  const gh = path.resolve(__dirname, "..", "gh-pages");
  const docs = path.resolve(__dirname, "..", "docs");
  // Ensure docs dir exists
  if (!fs.existsSync(docs)) fs.mkdirSync(docs, { recursive: true });
  // Copy all from gh-pages to docs
  copyDirSync(gh, docs);
  console.log("Docs generated from gh-pages to docs directory.");
}

main();
