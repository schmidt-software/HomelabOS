const {Command, flags} = require('@oclif/command')

class UpdateCommand extends Command {
  async run() {
    const {flags} = this.parse(UpdateCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/update.js`)
  }
}

UpdateCommand.description = `Describe the command here
...
Extra documentation goes here
`

UpdateCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = UpdateCommand
