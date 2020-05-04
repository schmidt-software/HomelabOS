const {Command, flags} = require('@oclif/command')

class EncryptCommand extends Command {
  async run() {
    const {flags} = this.parse(EncryptCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/config/encrypt.js`)
  }
}

EncryptCommand.description = `Describe the command here
...
Extra documentation goes here
`

EncryptCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = EncryptCommand
