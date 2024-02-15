import Router from '@koa/router'
import Koa from 'koa'
import { ParsedUrlQuery } from 'querystring'
import { countHttpRequestsByField } from './count-by-field'
import { countUniqueIpAddresses } from './count-unique-ip-addresses'
import { getTop } from './get-top'
import { readLogFile } from './read-log-file'

const app = new Koa()

const router = new Router()

router.get('/all-statistics', async (ctx) => {
  const { logFileUrl, top } = parseQuery(ctx.query)

  if (!logFileUrl) {
    ctx.status = 400
    ctx.body = 'logFileUrl query parameter is required'
    return
  }

  const httpRequests = await readLogFile(logFileUrl as string)

  const uniqueIpAddressCount = countUniqueIpAddresses(httpRequests)

  const top3MostVisitedUrls = getTop(
    top,
    countHttpRequestsByField(httpRequests, 'resource')
  )

  const top3MostActiveIpAddresses = getTop(
    top,
    countHttpRequestsByField(httpRequests, 'ipAddress')
  )

  ctx.body = {
    unique_ip_address_count: uniqueIpAddressCount,
    most_visited_urls: top3MostVisitedUrls,
    most_active_ip_addresses: top3MostActiveIpAddresses,
  }
})

router.get('/unique-ips', async (ctx) => {
  const { logFileUrl } = parseQuery(ctx.query)

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

router.get('/most-visited-urls', async (ctx) => {
  const { logFileUrl, top } = parseQuery(ctx.query)

  if (!logFileUrl) {
    ctx.status = 400
    ctx.body = 'logFileUrl query parameter is required'
    return
  }

  const httpRequests = await readLogFile(logFileUrl as string)

  const top3MostVisitedUrls = getTop(
    top,
    countHttpRequestsByField(httpRequests, 'resource')
  )

  ctx.body = {
    most_visited_urls: top3MostVisitedUrls,
  }
})

router.get('/most-active-ips', async (ctx) => {
  const { logFileUrl, top } = parseQuery(ctx.query)

  if (!logFileUrl) {
    ctx.status = 400
    ctx.body = 'logFileUrl query parameter is required'
    return
  }

  const httpRequests = await readLogFile(logFileUrl as string)

  const top3MostActiveIpAddresses = getTop(
    top,
    countHttpRequestsByField(httpRequests, 'ipAddress')
  )

  ctx.body = {
    most_active_ip_addresses: top3MostActiveIpAddresses,
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.use((ctx) => {
  ctx.body = 'OK'
})

app.listen(1234)

function parseQuery(query: ParsedUrlQuery) {
  const logFileUrl = query.logFileUrl as string
  const top = query.top ? parseInt(query.top as string) : 3

  return {
    logFileUrl,
    top,
  }
}
