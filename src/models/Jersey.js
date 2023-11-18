import db from "./dbconnection.js";

export class jerseys {
    constructor(id, img, team_name, team_kit, year, description, league_name, purchase_link) {
        this.id = id;
        this.img = img;
        this.team_name = team_name;
        this.team_kit = team_kit;
        this.year = year;
        this.description = description;
        this.league_name = league_name;
        this.purchase_link = purchase_link;
    }

    static async findById(id) {
        const row = await db.getrow("SELECT * FROM jerseys WHERE id = ?", [id]);
        if (row) {
            return new jerseys(...Object.values(row));
        }
        
        return null;
    }
    
    static async findAll() {
        const row = await db.getrow("SELECT * FROM jerseys");
        if (row) {
            return new jerseys(...Object.values(row));
        }
        return null;
    }

    static async findByTeamName(team_name) {
        const row = await db.getrow("SELECT * FROM jerseys WHERE team_name = ?", [team_name]);
        if (row) {
            return new teams(...Object.values(row));
        }
        return null;
    }

    async jerseysave() {
        const result = await db.query("INSERT INTO jerseys (img, team_name, team_kit, year, description, league_name, purchase_link) VALUES (?, ?, ?, ?, ?, ?, ?)", [this.img, this.team_name, this.team_kit, this.year, this.description, this.league_name, this.purchase_link]);
        this.id = result.insertId;
    }

    async jerseyUpdate(){
        await db.update("UPDATE jerseys SET img = ?, team_name = ?, team_kit = ?, year = ?, description = ?, league_name = ?, purchase_link = ? WHERE id = ?", [this.img, this.team_name, this.team_kit, this.year, this.description, this.league_name, this.purchase_link, this.id]);
    }

    toJSON(){
        return {
            id: this.id,
            img: this.img,
            team_name: this.team_name,
            team_kit: this.team_kit,
            year: this.year,
            description: this.description,
            league_name: this.league_name,
            purchase_link: this.purchase_link

                }
            }

}