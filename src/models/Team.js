import { db } from "./dbconnection.js";

export class teams {
    constructor(id, team_name) {
        this.id = id;
        this.team_name = team_name;        
    }

    static async findById(id) {
        const row = await db.getrow("SELECT * FROM teams WHERE id = ?", [id]);
        if (row) {
            return new teams(...Object.values(row));
        }
        return null;
    }

    static async findAll() {
        const row = await db.getall("SELECT * FROM teams");
        if (row) {
            return new teams(...Object.values(row));
        }
        return null;
    }

    static async findByTeamName(team_name) {
        const row = await db.getrow("SELECT * FROM teams WHERE team_name = ?", [team_name]);
        if (row) {
            return new teams(...Object.values(row));
        }
        return null;
    }

    async teamsave() {
        const result = await db.query("INSERT INTO teams (team_name) VALUES (?)", [this.team_name]);
        this.id = result.insertId;
    }

    async teamUpdate(){
        await db.update("UPDATE teams SET team_name = ? WHERE id = ?", [this.team_name, this.id]);
    }

    toJSON(){
        return {
            id: this.id,
            team_name: this.team_name
                }
            }

}