import { expect } from 'chai'
import { handleRequest } from '../src/handler'


describe('handler returns device', () => {

  it("regDevice", async () => {
    const result = await handleRequest(new Request('/regDevice', { method: 'POST' }))
    const res = await result.json()
    expect(res.success).to.equal('true')
  })

})
