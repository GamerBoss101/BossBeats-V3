import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true,
}

const userSchema = new mongoose.Schema({
    _id: reqString,
    tracks: Array<string>(),
});

export default class Userdb {
    model: any
    upsert: { upsert: boolean; };
    constructor() {
        this.model = mongoose.model('users', userSchema);
        this.upsert = { upsert: true };
    }

    async create(Id: string): Promise<UserData> {
        await this.model.findByIdAndUpdate({ _id: Id }, { _id: Id, tracks: [] }, this.upsert);
        return await this.get(Id);
    }

    async get(Id: string): Promise<UserData> {
        return await this.model.findById(Id);
    }

    async update(Id: string, track: string): Promise<UserData> {
        if (!(await this.get(Id))) await this.create(Id);
        await this.model.findByIdAndUpdate({ _id: Id }, { $push: { tracks: track } }, this.upsert);
        return await this.get(Id);
    }

    async delete(Id: string, track: string): Promise<UserData> {
        await this.model.findByIdAndUpdate({ _id: Id }, { $pull: { tracks: track } }, this.upsert);
        return await this.get(Id);
    }

}