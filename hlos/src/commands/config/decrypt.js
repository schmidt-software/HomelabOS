const {Command, flags} = require('@oclif/command')

class DecryptCommand extends Command {
  async run() {
    const {flags} = this.parse(DecryptCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/config/decrypt.js`)
  }
}

DecryptCommand.description = `Describe the command here
...
Extra documentation goes here
`

DecryptCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = DecryptCommand
