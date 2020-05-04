const {Command, flags} = require('@oclif/command')

class UninstallCommand extends Command {
  async run() {
    const {flags} = this.parse(UninstallCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/uninstall.js`)
  }
}

UninstallCommand.description = `Describe the command here
...
Extra documentation goes here
`

UninstallCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = UninstallCommand
