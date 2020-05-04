const {Command, flags} = require('@oclif/command')

class WebCommand extends Command {
  async run() {
    const {flags} = this.parse(WebCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/kpoorman/src/HomelabOS/hlos/src/commands/web.js`)
  }
}

WebCommand.description = `Describe the command here
...
Extra documentation goes here
`

WebCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = WebCommand
