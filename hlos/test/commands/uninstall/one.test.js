const {expect, test} = require('@oclif/test')

describe('uninstall:one', () => {
  test
  .stdout()
  .command(['uninstall:one'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['uninstall:one', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
