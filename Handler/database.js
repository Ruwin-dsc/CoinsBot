const Database = require('better-sqlite3');
const db = new Database('./Utils/DataBase/database.db');

module.exports = () => {
    db.exec(`CREATE TABLE IF NOT EXISTS user (
        id TEXT DEFAULT NULL,
        coins TEXT DEFAULT '{ "coins": 0, "bank": 0, "rep": 0 }',
        minerais TEXT DEFAULT '{ "wagon": 0, "charbon": 0, "fer": 0, "or": 0, "diamant": 0 }',
        entrepot TEXT DEFAULT NULL,
        batiment TEXT DEFAULT '{ "count": 0, "batiments": [] }',
        antirob TEXT DEFAULT NULL,
        color TEXT DEFAULT NULL,
        metier TEXT DEFAULT NULL,
        capacite TEXT DEFAULT NULL,
        drugs TEXT DEFAULT '0'
    )`);

    db.exec(`CREATE TABLE IF NOT EXISTS guild (
        id TEXT DEFAULT NULL,
        color TEXT DEFAULT '#f5d90a',
        gain TEXT DEFAULT '{ "dailyMin": "100", "dailyMax": "600", "cardsMin": "-400", "cardsMax": "400", "slutMin": "100", "slutMax": "600", "workMin": "10", "workMax": "250", "entrepriseMax": "16000", "entrepotMax": "7000", "bar": { "price": "2000", "gain": "100" }, "garage": { "price": "3000", "gain": "200" }, "magasin": { "price": "4000", "gain": "300" }, "cinema": { "price": "5000", "gain": "400" }, "gare": { "price": "6500", "gain": "500" }, "mairie": { "price": "8000", "gain": "600" }, "wagon": "1500", "antirob": { "time": "7200000", "price": "1000" } }',
        logs TEXT DEFAULT '{ "xp": null, "vocal": null, "impots": null, "cards": null, "war": null, "transaction": null }',
        cshop TEXT DEFAULT '[]',
        prefix TEXT DEFAULT '&'
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