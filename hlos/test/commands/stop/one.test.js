const {expect, test} = require('@oclif/test')

describe('stop:one', () => {
  test
  .stdout()
  .command(['stop:one'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['stop:one', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
