const fs = require('fs');
const Ascii = require("ascii-table");

module.exports = (client, Discord) => {
    const Table = new Ascii("BossBeats COMMANDS");

    const Categories = ["music", "other"];
    Categories.forEach((Category) => {
        const comandFiles = fs.readdirSync(`./src/commands/${Category}`).filter(file => file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.mjs'));
        for(const file of comandFiles){
            const command = require(`../commands/${Category}/${file}`);

            if (!command.name) {
                Table.addRow(command.name, "❌ Failed to load");
            }else if(command.enabled == false) {
                Table.addRow(command.name, "❌ Command Disabled");
            } else {
                command.category = Category;
                client.commands.set(command.name, command)
                if(command.name) Table.addRow(command.name, "✅ Succesfully loaded!");
            }
        }
    });

    console.log(Table.toString());
}