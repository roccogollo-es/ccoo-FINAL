const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

async function checkPdf() {
    const filePath = 'c:\\Users\\ROCCOVISION\\Desktop\\Convenio Saneamiento Urbano Alcobendas .pdf';

    if (!fs.existsSync(filePath)) {
        console.log('File not found:', filePath);
        return;
    }

    const dataBuffer = fs.readFileSync(filePath);
    try {
        const data = await pdf(dataBuffer);
        console.log('✅ PDF Read Success!');
        console.log('Info:', data.info);
        console.log('Pages:', data.numpages);
        console.log('Length:', data.text.length, 'chars');
        console.log('First 200 chars:', data.text.substring(0, 200));

        if (data.text.trim().length < 100) {
            console.log('⚠️ Warning: Text is suspiciously short. Possible scanned image.');
        }
    } catch (err) {
        console.error('Error reading PDF:', err);
    }
}

checkPdf();
