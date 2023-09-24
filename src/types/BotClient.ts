import { Client, Collection, EmbedBuilder } from "discord.js";

import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { YtDlpPlugin } from "@distube/yt-dlp";

import BotCommand from "./BotCommand";
import Logger from "../libs/Logger";
import Util from "../libs/Util";
import Formatter from "../libs/Formatter";

interface botUtil {
    wait(time: number): any;
    buildEmbed(obj: any): EmbedBuilder
}

export default class BotClient extends Client {
    commands: Collection<string, BotCommand>;
    logger: Logger;
    util: botUtil;
    distube: DisTube;
    formatter: Formatter;
    constructor(props: any) {
        super(props);
        this.logger = new Logger();
        this.formatter = new Formatter();
        this.util = Util;
        this.commands = new Collection();

        this.distube = new DisTube(this, {
            searchSongs: 0,
            searchCooldown: 30,
            leaveOnEmpty: false,
            emptyCooldown: 0,
            leaveOnFinish: false,
            leaveOnStop: false,
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: true,
            emitAddListWhenCreatingQueue: false,
            plugins: [
                new SpotifyPlugin({ 
                    parallel: true, 
                    emitEventsAfterFetching: true,
                    api: { clientId: process.env.spotID, clientSecret: process.env.spotKey }
                }),
                new SoundCloudPlugin(),
                new YtDlpPlugin()
            ]
        });

    }
}