import { db } from "../../index.js";

export class leagues {
    constructor(id, league_name) {
        this.id = id;
        this.league_name = league_name;        
    }

    static async findById(id) {
        const row = await db.getrow("SELECT * FROM leagues WHERE id = ?", [id]);
        if (row) {
            return new leagues(...Object.values(row));
        }
        return null;
    }

    static async findAll() {
        const row = await db.getall("SELECT * FROM leagues");
        if (row) {
            return new leagues(...Object.values(row));
        }
        return null;
    }

    static async findByLeagueName(league_name) {
        const row = await db.getrow("SELECT * FROM leagues WHERE league_name = ?", [league_name]);
        if (row) {
            return new leagues(...Object.values(row));
        }
        return null;
    }

    async leaguesave() {
        const result = await db.query("INSERT INTO leagues (league_name) VALUES (?)", [this.league_name]);
        this.id = result.insertId;
    }

    async leagueUpdate(){
        await db.update("UPDATE leagues SET league_name = ? WHERE id = ?", [this.league_name, this.id]);
    }

    toJSON(){
        return {
            id: this.id,
            league_name: this.league_name
                }
            }

}