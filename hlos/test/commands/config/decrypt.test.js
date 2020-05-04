const {expect, test} = require('@oclif/test')

describe('config:decrypt', () => {
  test
  .stdout()
  .command(['config:decrypt'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['config:decrypt', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
