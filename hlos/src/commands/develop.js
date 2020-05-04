const {Command, flags} = require('@oclif/command')

class DevelopCommand extends Command {
  async run() {
    const {flags} = this.parse(DevelopCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/develop.js`)
  }
}

DevelopCommand.description = `Describe the command here
...
Extra documentation goes here
`

DevelopCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = DevelopCommand
