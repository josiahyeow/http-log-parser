import Router from '@koa/router'
import Koa from 'koa'
import { countHttpRequestsByField } from './count-by-field'
import { countUniqueIpAddresses } from './count-unique-ip-addresses'
import { getTop3 } from './get-top-3'
import { readLogFile } from './read-log-file'

const app = new Koa()

const router = new Router()

router.get('/all-statistics', async (ctx) => {
  const { logFileUrl } = ctx.query

  if (!logFileUrl) {
    ctx.status = 400
    ctx.body = 'logFileUrl query parameter is required'
    return
  }

  const httpRequests = await readLogFile(logFileUrl as string)

  const uniqueIpAddressCount = countUniqueIpAddresses(httpRequests)

  const top3MostVisitedUrls = getTop3(
    countHttpRequestsByField(httpRequests, 'resource')
  )

  const top3MostActiveIpAddresses = getTop3(
    countHttpRequestsByField(httpRequests, 'ipAddress')
  )

  ctx.body = {
    unique_ip_address_count: uniqueIpAddressCount,
    top_3_most_visited_urls: top3MostVisitedUrls,
    top_3_most_active_ip_addresses: top3MostActiveIpAddresses,
  }
})

router.get('/unique-ips', async (ctx) => {
  const { logFileUrl } = ctx.query

  if (!logFileUrl) {
    ctx.status = 400
    ctx.body = 'logFileUrl query parameter is required'
    return
  }

  const httpRequests = await readLogFile(logFileUrl as string)

  const uniqueIpAddressCount = countUniqueIpAddresses(httpRequests)

  ctx.body = {
    unique_ip_address_count: uniqueIpAddressCount,
  }
})

router.get('/top-3-most-visited-urls', async (ctx) => {
  const { logFileUrl } = ctx.query

  if (!logFileUrl) {
    ctx.status = 400
    ctx.body = 'logFileUrl query parameter is required'
    return
  }

  const httpRequests = await readLogFile(logFileUrl as string)

  const top3MostVisitedUrls = getTop3(
    countHttpRequestsByField(httpRequests, 'resource')
  )

  ctx.body = {
    top_3_most_visited_urls: top3MostVisitedUrls,
  }
})

router.get('/top-3-most-active-ips', async (ctx) => {
  const { logFileUrl } = ctx.query

  if (!logFileUrl) {
    ctx.status = 400
    ctx.body = 'logFileUrl query parameter is required'
    return
  }

  const httpRequests = await readLogFile(logFileUrl as string)

  const top3MostActiveIpAddresses = getTop3(
    countHttpRequestsByField(httpRequests, 'ipAddress')
  )

  ctx.body = {
    top_3_most_active_ip_addresses: top3MostActiveIpAddresses,
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.use((ctx) => {
  ctx.body = 'OK'
})

app.listen(1234)
