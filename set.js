const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUh2NXdodVBMcUNSTmsvbkxyQjFSdGFCU2dWRmVDeHUzTXBtR2N3UHpVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1VRR3JCZGRDZ09zeHVjektrT0hseURWRjVJMW16NUdRYlI5UTd2ejZtcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRUVtQy9PakMvdXl6N29nM1dJWHpoTHY5dDB4OCszcTk0NjI5RDNiK2tFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtR0lkbkloYWhIY3ZQU3FLN0tQR2cyVU1aRklVRlNqN0NZMUFyK2RnNlVrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdMUWVWQ2gzNmdHMGhoYkhuS1p2S0lhc0V5Qm9iQXh6OW45K1pTOWNmSG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRLQ0NoSE9zUXQrb2xDemdzV0xWSEtnQlhYMVJQK3JIZk1XMzhqbHBJRzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0dSOEN0bXRETjZUbFBUakxaSWZWZ0Eyb3plcVdFL0dFOVhMd1E1THdrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRzhwUEdFeGFQZUlOYW93L0t6ZCs4eXhKUGhHUEFGY3k1T1FjdlJ1aWgzND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5oLzlyZkVqS3YyQzdRV3lHMXovdjB6VVdETi9XZXMvaW1kV0ZLVmFLVFFYenRlUktRL0RxZlZIWEhWOE5iR1V2TUpsSFdOV3cxeUtqZFdPM2JTa0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUzLCJhZHZTZWNyZXRLZXkiOiJwUnJDUWU3RWhaZ2YxNTRaVEhycDhqVlZHNThCMnVZQW1JaEhzTnNiekhVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJoM3hUNkFVNVFBS0tfY2M2Y2VfOTdBIiwicGhvbmVJZCI6ImFkN2Y3MjBiLWYyYzItNGZkNS04ZTdjLTQ5OTExMzAzNDgwYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNRTRjMEV5ZlBmcTU1OS9hQmNjRjVTOHEvSVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ20xQlpKMmI3SWpLVFozRTJCVHlheVJlOWlJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNZV0NaSDhQIiwibWUiOnsiaWQiOiIxOTE3MzgyNTcxNToxMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLCqcqNyb4g4oSC8J2VqvCdlZPwnZWW8J2VoyDKjcmR1bLVtNOAINaFxpLGksOtz7LDrcmR04DimaDvuI8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xYWXZhWUVFSXVtbTdBR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlV6cTFUZDl2Y2RsMUoydWtSRDFDTm9QVXY0NTY0bHJndzd6TTF1UU5BamM9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImpmRFBacHpuRVBwZDJjcFJFSDIreXZ4RGc3UlpFV25vRjI2N2lVVUtReGloem1Cc2NabW8xU1lDK1U1RnhvTmR4RUVPU1dxUkVHUmFlcWhFN2l5ZUJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJiV1VlWnlkL1IybEJVaHpuNVZGeG1Vem0yajZtVjROOGIwamtRZGlKam55YjdjTTlMWHpmZWNvODNnWm5hOVp1cTdKY1VMdmFDeVdHOFlMRFZERU5EUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjE5MTczODI1NzE1OjExQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZNNnRVM2ZiM0haZFNkcnBFUTlRamFEMUwrT2V1SmE0TU84ek5ia0RRSTMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTE3MjMyODcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQkh6In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "©ʍɾ ℂ𝕪𝕓𝕖𝕣 ʍɑղմӀ օƒƒíϲíɑӀ♠️",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "94760069363",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Manu-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/2717975a4410096a24c0f.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
