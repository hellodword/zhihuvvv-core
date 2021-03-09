import { Router } from './router'
import { regDevice } from './functions/zhihu'

const router = new Router()
router.get('/regDevice', regDevice)

export async function handleRequest(request: Request): Promise<Response> {
  return router.route(request)
}