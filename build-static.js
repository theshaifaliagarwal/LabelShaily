const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const adminSrc = path.join(__dirname, 'app', 'admin');
const adminTmp = path.join(__dirname, 'admin_tmp_backup');

const nextCache = path.join(__dirname, '.next');
if (fs.existsSync(nextCache)) {
  fs.rmSync(nextCache, { recursive: true, force: true });
}

if (fs.existsSync(adminSrc)) {
  fs.cpSync(adminSrc, adminTmp, { recursive: true });
  fs.rmSync(adminSrc, { recursive: true, force: true });
}

try {
  execSync('npx next build', {
    stdio: 'inherit',
    env: { ...process.env, NEXT_STATIC: '1' },
  });
} finally {
  if (fs.existsSync(adminTmp)) {
    fs.cpSync(adminTmp, adminSrc, { recursive: true });
    fs.rmSync(adminTmp, { recursive: true, force: true });
  }
}
