import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { countHttpRequestsByField } from './count-by-field'
import { countUniqueIpAddresses } from './count-unique-ip-addresses'
import { getTop3 } from './get-top-3'
import { readLogFile } from './read-log-file'

export function run(filePath?: string | null) {
  if (!filePath) {
    console.error('Please provide a path to a log file using the --file flag')
    return
  }

  const httpRequests = readLogFile(filePath)

  const uniqueIpAddressCount = countUniqueIpAddresses(httpRequests)

  const top3MostVisitedUrls = getTop3(
    countHttpRequestsByField(httpRequests, 'resource')
  )

  const top3MostActiveIpAddresses = getTop3(
    countHttpRequestsByField(httpRequests, 'ipAddress')
  )

  const result = {
    unique_ip_address_count: uniqueIpAddressCount,
    top_3_most_visited_urls: top3MostVisitedUrls,
    top_3_most_active_ip_addresses: top3MostActiveIpAddresses,
  }

  console.log(result)
}

const argsv = yargs(hideBin(process.argv)).argv
run(argsv['file'])
