const {Command, flags} = require('@oclif/command')

class LogoCommand extends Command {
  async run() {
    const {flags} = this.parse(LogoCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/logo.js`)
  }
}

LogoCommand.description = `Describe the command here
...
Extra documentation goes here
`

LogoCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = LogoCommand
