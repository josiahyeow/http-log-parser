/*
HTTP request logs are in Apache Combined Log Format. More info at:
 - https://en.wikipedia.org/wiki/Common_Log_Format
 - https://httpd.apache.org/docs/2.4/logs.html

*/

export type HttpRequest = {
  ipAddress?: string
  identity?: string
  userId?: string
  date?: Date
  method?: string
  resource?: string
  protocol?: string
  status?: number
  bytesSent?: number
  referrer?: string
  userAgent?: string
}
