const execSync = require('child_process').execSync;

if(process.platform === 'win64' || process.platform === 'win32') {
    execSync("del /s /q dist");
    execSync("rmdir /s /q dist")
} else {
    execSync("rm -rf dist/");
}
