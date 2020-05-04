const {Command, flags} = require('@oclif/command')

class OneCommand extends Command {
  async run() {
    const {flags} = this.parse(OneCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/reset/one.js`)
  }
}

OneCommand.description = `Describe the command here
...
Extra documentation goes here
`

OneCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = OneCommand
