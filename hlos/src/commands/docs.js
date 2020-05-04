const {Command, flags} = require('@oclif/command')

class DocsCommand extends Command {
  async run() {
    const {flags} = this.parse(DocsCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/docs.js`)
  }
}

DocsCommand.description = `Describe the command here
...
Extra documentation goes here
`

DocsCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = DocsCommand
