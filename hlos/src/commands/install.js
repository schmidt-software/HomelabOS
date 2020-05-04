const {Command, flags} = require('@oclif/command')
const {spawn} = require('child_process')
const Utils = require('../utils')

class InstallCommand extends Command {
  async run() {
    const {flags} = this.parse(InstallCommand)
    var utils = new Utils()
    utils.printLogo()
    const deployCommand = spawn('../docker_helper.sh', ['--extra-vars="../settings/config.yml"', '--extra-vars="../settings/vault.yml"', '-i inventory ../playbook.homelabos.yml'], {stdio: 'inherit'})

    deployCommand.stdout.on('data', data => {
      this.log(`stdout: ${data}`)
    })

    deployCommand.stderr.on('data', data => {
      this.log(`stderr: ${data}`)
    })

    deployCommand.on('error', error => {
      this.log(`error: ${error.message}`)
    })

    deployCommand.on('close', code => {
      this.log(`child process exited with code ${code}`)
    })
  }
}

InstallCommand.description = `Describe the command here
...
Extra documentation goes here
`

InstallCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = InstallCommand
