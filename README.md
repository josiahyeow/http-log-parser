# HTTP Log Parser

This program reads in HTTP request logs and returns the following information:

- The number of unique IP addresses
- The top 3 most visited URLs
- The top 3 most active IP addresses

## Prerequisites

- npm

## Setup

Install dependencies by running

```
  npm install
```

## Usage

```
  npm run parse-logs -- --file <path to log file>
```

## Running tests

```
  npm run test
```

## Assumptions

- HTTP request logs are in the Apache Combined Log Format.
- The timestamp in the HTTP request logs are always in the format `01/Jan/2000:00:00:00 +0000`
- Invalid logs are to be ignored.
- If multiple logs rank the same for most visited URLs or most active IP address, it doesn't matter which one we include in the ranking.
