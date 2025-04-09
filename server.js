import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_FOLDER = path.join(__dirname, 'dist');

// MIME types pour différents types de fichiers
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url}`);
  
  // Gestion des routes SPA - rediriger vers index.html
  let filePath = req.url === '/' 
    ? path.join(DIST_FOLDER, 'index.html')
    : path.join(DIST_FOLDER, req.url);
  
  // Vérifier si le fichier existe
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      // Pour les SPA, renvoyer index.html si le fichier n'existe pas
      console.log(`File ${filePath} does not exist, serving index.html`);
      filePath = path.join(DIST_FOLDER, 'index.html');
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
        return;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    });
  });
});

console.log(`Server running at http://localhost:${PORT}/`);
server.listen(PORT); 