const {expect, test} = require('@oclif/test')

describe('reset:one', () => {
  test
  .stdout()
  .command(['reset:one'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['reset:one', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
