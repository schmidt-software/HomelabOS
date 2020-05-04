const {Command, flags} = require('@oclif/command')

class RestartCommand extends Command {
  async run() {
    const {flags} = this.parse(RestartCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/restart.js`)
  }
}

RestartCommand.description = `Describe the command here
...
Extra documentation goes here
`

RestartCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = RestartCommand
