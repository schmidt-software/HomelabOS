const {expect, test} = require('@oclif/test')

describe('config:encrypt', () => {
  test
  .stdout()
  .command(['config:encrypt'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['config:encrypt', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
