const execSync = require('child_process').execSync;
const fs = require('fs');

if(process.platform === 'win64' || process.platform === 'win32') {
    if (fs.existsSync("dist")) {
        execSync("del /s /q dist");
        execSync("rmdir /s /q dist")
    }
} else {
    execSync("rm -rf dist/");
}
