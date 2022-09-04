 pdf.pipe(fs.createWriteStream("play.pdf"))
        pdf.text(JSON.stringify(finalList));
        pdf.end();