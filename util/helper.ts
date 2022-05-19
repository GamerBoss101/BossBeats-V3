// @ts-nocheck
const fs = require('fs');
const moment = require('moment');

exports.log = (content) => {
    fs.writeFile(`./logs/log-[${moment().format("MMM Do YY")}].txt`, `[${moment().format('lll')}] ` + content + "\n", { flag: 'a+' }, err => { if(err) console.log(err) });
    console.log(`[${moment().format('lll')}] ` + content);
}