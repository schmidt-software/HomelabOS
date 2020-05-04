const {Command, flags} = require('@oclif/command')

class GetCommand extends Command {
  async run() {
    const {flags} = this.parse(GetCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/config/get.js`)
  }
}

GetCommand.description = `Describe the command here
...
Extra documentation goes here
`

GetCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = GetCommand
