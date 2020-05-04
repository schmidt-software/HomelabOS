const {Command, flags} = require('@oclif/command')

class SetCommand extends Command {
  async run() {
    const {flags} = this.parse(SetCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/config/set.js`)
  }
}

SetCommand.description = `Describe the command here
...
Extra documentation goes here
`

SetCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = SetCommand
