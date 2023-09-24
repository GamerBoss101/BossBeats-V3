
import mongoose from 'mongoose';

const reqString = {
    type: String,
    required: true,
}

const trackSchema = new mongoose.Schema({
    _id: reqString,
    name: reqString,
    songs: Array<Object>(),
});

export default class Trackdb {
    model: any
    upsert: { upsert: boolean; };
    constructor() {
        this.model = mongoose.model('tracks', trackSchema);
        this.upsert = { upsert: true };
    }

    makeId(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for(let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async create(name: string): Promise<TrackData> {
        let Id = this.makeId(5);
        await this.model.findByIdAndUpdate({ _id: Id }, { _id: Id, name, songs: [] }, this.upsert);
        return await this.get(Id);
    }

    async get(Id: string): Promise<TrackData> {
        return await this.model.findById(Id);
    }

    async update(Id: string, song: SongData): Promise<TrackData> {
        await this.model.findByIdAndUpdate({ _id: Id }, { $push: { songs: song } }, this.upsert);
        return await this.get(Id);
    }

    async deleteSong(Id: string, song: SongData): Promise<TrackData> {
        await this.model.findByIdAndUpdate({ _id: Id }, { $pull: { songs: song } }, this.upsert);
        return await this.get(Id);
    }

    async delete(Id: string): Promise<TrackData> {
        return await this.model.findByIdAndDelete(Id);
    }

}