import { Router } from './router'
import { regDevice, regToken } from './functions/zhihu'

const router = new Router()
router.get('/regDevice', async (req: Request) => {
  return new Response(JSON.stringify(await regDevice()), {
    headers: { 'Content-Type': 'application/json' },
  })
})

router.get('/regToken', async (req: Request) => {
  return new Response(JSON.stringify(await regToken(await regDevice())), {
    headers: { 'Content-Type': 'application/json' },
  })
})

export async function handleRequest(request: Request): Promise<Response> {
  return router.route(request)
}