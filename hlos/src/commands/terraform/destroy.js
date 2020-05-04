const {Command, flags} = require('@oclif/command')

class DestroyCommand extends Command {
  async run() {
    const {flags} = this.parse(DestroyCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/terraform/destroy.js`)
  }
}

DestroyCommand.description = `Describe the command here
...
Extra documentation goes here
`

DestroyCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = DestroyCommand
