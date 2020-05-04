const {expect, test} = require('@oclif/test')

describe('terraform:destroy', () => {
  test
  .stdout()
  .command(['terraform:destroy'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['terraform:destroy', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
