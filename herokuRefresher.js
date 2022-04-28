import * as cheerio from 'cheerio';
import got from 'got';

async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
}

async function reload(refreshCounter) {
    const url = process.argv.slice(2)[0];

    got(url).then(response => {
        const $ = cheerio.load(response.body);
        console.log(`Loaded Site: ${$('head').find('title').text()} - ${new Date()}`)
      }).catch(err => {
        console.log(`Error: ${err}`);
    });

    await delay(2000);

    return;
}


let run = async ()=>{
    console.log('Running every 10 minutes')
    reload();
}

setInterval(run, 600000);


