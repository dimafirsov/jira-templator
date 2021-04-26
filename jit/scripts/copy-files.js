const fs = require('fs');

const filePathToCopy = [
    // "manifest.json"
    "src/test.ts"
];

filePathToCopy.forEach(path => {
    if (fs.existsSync(path)) {
        fs.copyFileSync(path, '/dist');
    }
});
if (filePathToCopy.length) {
}