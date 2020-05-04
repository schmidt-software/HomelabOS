const {Command, flags} = require('@oclif/command')

class TerraformCommand extends Command {
  async run() {
    const {flags} = this.parse(TerraformCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/terraform.js`)
  }
}

TerraformCommand.description = `Describe the command here
...
Extra documentation goes here
`

TerraformCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = TerraformCommand
