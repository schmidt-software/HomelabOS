const {Command, flags} = require('@oclif/command')

class SyncCommand extends Command {
  async run() {
    const {flags} = this.parse(SyncCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/config/sync.js`)
  }
}

SyncCommand.description = `Describe the command here
...
Extra documentation goes here
`

SyncCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = SyncCommand
