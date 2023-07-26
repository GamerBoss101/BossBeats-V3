const fs = require('fs');
const Ascii = require("ascii-table");

module.exports = (client, Discord) =>{

    const Table = new Ascii("BossBeats EVENTS");

    const load_dir = (dirs) =>{
        const events_files = fs.readdirSync(`./events/bot/${dirs}`).filter(file => file.endsWith('.ts'));

        for(const file of events_files){
            const event = require(`../events/bot/${dirs}/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, Discord, client));
            Table.addRow(event_name, "✅ Succesfully loaded!");
        }
    }
    ['client', 'guild'].forEach(e => load_dir(e));

    const load_dis = () => {
        const events_files = fs.readdirSync(`./events/distube/`).filter(file => file.endsWith('.ts'));

        for(const file of events_files){
            const event = require(`../events/distube/${file}`);
            const event_name = file.split('.')[0];
            
            client.distube.on(event_name, event.bind(null, Discord, client));
            Table.addRow(event_name, "✅ Succesfully loaded!");
        }
    }
    load_dis()

    /*
    const load_custom = () => {
        const events_files = fs.readdirSync(`./events/custom/`).filter(file => file.endsWith('.ts'));

        for(const file of events_files){
            const event = require(`../events/custom/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, Discord, client));
            Table.addRow(event_name, "✅ Succesfully loaded!");
        }
    }
    load_custom()
    */

    console.log(Table.toString());
}