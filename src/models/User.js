import { db } from "./dbconnection.js";
import argon2 from "argon2";
import { v4 } from "uuid";


export class User {
    constructor(id, email, password, session_uuid) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.session_uuid = session_uuid;
    }

    static async findById(id) {
        const row = await db.getrow("SELECT * FROM users WHERE id = ?", [id]);
        if (row) {
            return new User(...Object.values(row));
        }
        return null;
    }

    static async findByEmail(email) {
        const row = await db.getrow("SELECT * FROM users WHERE email = ?", [email]);
        if (row) {
            return new User(...Object.values(row));
        }
        return null;
    }

    async save() {
        const result = await db.query("INSERT INTO users (email, password, session_uuid) VALUES (?,?, ?)", [this.email, this.password, this.session_uuid]);
        this.id = result.insertId;
    }

    async update(){
        await db.update("UPDATE users SET email = ?, password = ?, session_uuid = ? WHERE id = ?", [this.email, this.password, this.session_uuid, this.id]);
    }

    async logout(){
        await db.update("UPDATE users SET session_uuid = NULL WHERE session_uuid = ?  WHERE id = ?",  [v4(), this.id]);
    }
   
    async isPasswordCorrect(password) {
      return  await argon2.verify(this.password, password)
    }

    toJSON(){
        return {
            id: this.id,
            email: this.email 
                }
            }
}
