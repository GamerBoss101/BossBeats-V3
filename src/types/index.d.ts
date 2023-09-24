

export global {

    type reqString = {
        type: String,
        required: true,
    }

    type UserData = {
        _id: string,
        tracks: Array<string>
    }

    type TrackData = {
        _id: string,
        name: string,
        songs: Array<SongData>
    }

    type SongData = {
        title: string,
        url: string,
    }
    
}
