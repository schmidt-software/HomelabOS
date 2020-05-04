const {Command, flags} = require('@oclif/command')

class RestoreCommand extends Command {
  async run() {
    const {flags} = this.parse(RestoreCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/restore.js`)
  }
}

RestoreCommand.description = `Describe the command here
...
Extra documentation goes here
`

RestoreCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = RestoreCommand
