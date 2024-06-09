const Database = require('better-sqlite3');
const db = new Database('./Utils/DataBase/database.db');

module.exports = () => {
    db.exec(`CREATE TABLE IF NOT EXISTS user (
        id TEXT DEFAULT NULL,
        coins TEXT DEFAULT '{ "coins": 0, "bank": 0, "rep": 0 }',
        minerais TEXT DEFAULT '{ "wagon": 0, "charbon": 0, "fer": 0, "or": 0, "diamant": 0 }',
        entrepot TEXT DEFAULT NULL
    )`);

    db.exec(`CREATE TABLE IF NOT EXISTS guild (
        id TEXT DEFAULT NULL,
        color TEXT DEFAULT '#f5d90a',
        gain TEXT DEFAULT '{ "dailyMin": "100", "dailyMax": "600", "cardsMin": "-400", "cardsMax": "400", "slutMin": "100", "slutMax": "600", "workMin": "10", "workMax": "250", "entrepriseMax": "16000" }',
        logs TEXT DEFAULT '{ "xp": null, "vocal": null, "impots": null, "cards": null, "war": null, "transaction": null }'
    )`);

    db.exec(`CREATE TABLE IF NOT EXISTS team (
        id TEXT DEFAULT NULL
    )`);

    db.exec(`CREATE TABLE IF NOT EXISTS entreprise (
        id TEXT DEFAULT NULL,
        author TEXT DEFAULT NULL,
        user TEXT DEFAULT '[]',
        salaire TEXT DEFAULT '20',
        argent TEXT DEFAULT '0',
        work TEXT DEFAULT '10',
        batiments TEXT DEFAULT '1'
    )`);
    return db;
}