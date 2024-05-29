const fs = require('fs');
const chalk = require('colors')
var AsciiTable = require('ascii-table')
const table = new AsciiTable("Aladdin love you").setHeading(' Events  ', ' Stats ').setBorder('||', '=', "■", "■")

module.exports = (client) => {
    fs.readdirSync('./events/').filter((file) => file.endsWith('.js')).forEach((event) => {
      	require(`../events/${event}`);
	table.addRow(event.split('.js')[0], 'Start')
    })
	console.log(chalk.brightGreen(table.toString()))
};
