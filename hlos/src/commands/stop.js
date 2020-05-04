const {Command, flags} = require('@oclif/command')

class StopCommand extends Command {
  async run() {
    const {flags} = this.parse(StopCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/stop.js`)
  }
}

StopCommand.description = `Describe the command here
...
Extra documentation goes here
`

StopCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = StopCommand
