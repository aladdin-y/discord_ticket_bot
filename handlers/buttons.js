const fs = require('fs');
const chalk = require('colors')
var AsciiTable = require('ascii-table')
const table = new AsciiTable("Aladdin love you").setHeading(' Buttons  ', ' Stats ').setBorder('∥', '⩶', "■", "■")

module.exports = (client) => {
    fs.readdirSync('./buttons/').filter((file) => file.endsWith('.js')).forEach((file) => {
        const button = require(`../buttons/${file}`)
        client.buttons.set(button.id, button)
		table.addRow(button.id, '✅')
    })
		console.log(chalk.cyan(table.toString()))
};
