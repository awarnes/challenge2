# Shipment Routing

Code challenge to create a CLI for routing shipments to drivers.

## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Description](#description)
1. [Assumptions](#assumptions)
1. [Challenges](#challenges)
1. [Future Possibilities](#future-possibilities)

## Installation
[To Top ↑](#table-of-contents)

Install package:
```bash
npm install @awarnes/shipment-routing
```
Install pre-release:
```bash
npm install @awarnes/shipment-routing@next
```

### Prepare Script
The `prepare` script will run after all dependencies have been installed (locally). This script will install the `pre-push` git-hook into the `.git/hooks` directory in the project. This helps ensure that everything has been properly linted and all tests are passing.

> Note: If in dire need you can always add the `--no-verify` flag to your push command to skip the checks. Make sure that everything lints and passes testing prior to creating your PR though!

## Usage
[To Top ↑](#table-of-contents)

There are two commands with several options each. The easiest way to see how to use them is to run:
```bash
shipment-routing help
```

### Route

Usage: `shipment-routing route [options]`

Route shipments to drivers given a list of shipments and list of drivers

| Options | Description |
|---------|-------------|
| -d --driverFile | File of driver names \\n separated|
| -s --destinationFile | File of shipment destinations \\n separated |
| -t --testData | Comma separated count of number of drivers and destinations to generate. |
| -x --maxThreads | Maximum number of threads to allow for the mapJobs function. Default 4. |
| -f --file | Dump output to file |
| -h, --help | display help for command |

#### Examples
Read drivers and destinations from file
```bash
shipment-routing route -d ./some/file/with/driver.data -s ./some/file/with/destination.data
```
Read drivers and destinations from file and output to file
```bash
shipment-routing route -d ./some/file/with/driver.data -s ./some/file/with/destination.data -f
```
Route 25 randomized drivers and 25 randomized destinations
```bash
shipment-routing route -t 25,25
```

### Generate

Usage: `shipment-routing generate [options]`

Generate data for use with the command line tool

| Options | Descriptions |
| ------- | ------------ |
| -d --driverCount | Number of driver names to generate|
| -s --destinationCount | Number of destinations to generate|
| -p --path | Path to save files. If not included will output on command line. |
| -h, --help | display help for command|

#### Examples
Print out 25 randomized drivers and 25 randomized destinations
```bash
shipment-routing generate -d 25 -s 25
```
Write 25 randomized drivers and 25 randomized destinations to files in the current working directory.
```bash
shipment-routing generate -d 25 -s 25 -p .
```
Generate a file of 25 drivers and 25 destinations, then run the routing function on them.
```bash
shipment-routing generate -d 25 -s 25 -p . && shipment-routing route -d ./drivers.data -s ./destinations.data
```

## Description
[To Top ↑](#table-of-contents)

Our sales team has just struck a deal with Acme Inc to become the exclusive provider for routing their product shipments via 3rd party trucking fleets. The catch is that we can only route one shipment to one driver per day.

Each day we get the list of shipment destinations that are available for us to offer to drivers in our network. Fortunately our team of highly trained data scientists have developed a mathematical model for determining which drivers are best suited to deliver each shipment.

With that hard work done, now all we have to do is implement a program that assigns each shipment destination to a given driver while maximizing the total suitability of all shipments to all drivers.

The top-secret algorithm is:
- If the length of the shipment's destination street name is even, the base suitability
score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
- If the length of the shipment's destination street name is odd, the base SS is the
number of consonants in the driver’s name multiplied by 1.
- If the length of the shipment's destination street name shares any common factors
(besides 1) with the length of the driver’s name, the SS is increased by 50% above the
base SS.

Write an application in the language of your choice that assigns shipment destinations to drivers in a way that maximizes the total SS over the set of drivers. Each driver can only have one shipment and each shipment can only be offered to one driver. Your program should run on the command line and take as input two newline separated files, the first containing the street addresses of the shipment destinations and the second containing the names of the drivers.

The output should be the total SS and a matching between shipment destinations and drivers.

You do not need to worry about malformed input, but you should certainly handle both upper and lower case names.

## Assumptions
[To Top ↑](#table-of-contents)

Some of the assumptions that were made for this project:

1. Driver's name includes their entire name and spaces between:
    - honorific/title (if applicable)
    - First Name
    - Middle Name(s)
    - Last Name
    - Any other titles
1. Destinations will generally meet [USPS address specifications](https://pe.usps.com/text/pub28/28c2_001.htm)
1. The `destination street name` is the [street name](https://pe.usps.com/text/pub28/28c2_012.htm) with no direction signifiers, prefixes, or suffixes. For example:
    - `123 Fake St` the street name is `Fake`
    - `1242 East Paddington Highway` the street name is `Paddington`.
1. Driver names and destination addresses will each be input on a single line (no newline breaks internal to the name/address)
1. `Y` is always a consonant (see [Issue #14](https://github.com/awarnes/shipment-routing/issues/14))

## Challenges
[To Top ↑](#table-of-contents)

This project was a lot of fun. I especially enjoyed being able to add all the quality of life features that every project should have. I did run into a few challenges during the process, which were interesting to solve.
### Algorithm
#### Assignment Problem
I had put off the actual meat of the algorithm until later on thinking that it wouldn't be so difficult. What I had missed was the solution requirement that it:
>...maximizes the total SS over the set of drivers...

I tried a attacking it a few different ways to begin with until I realized that there was a lot more going on to get the optimal value over the _entire_ set of drivers and destinations.

After more research I was able to find the [assignment problem](https://en.wikipedia.org/wiki/Assignment_problem) and realized that was what I needed to code around. After that, it was fairly quick work to find a library that could handle the task effectively. It could be interesting in the future to code my own algorithm, but this seems to be working efficiently for now.
#### Map Jobs
As part of the required input for the [hungarian method](https://en.wikipedia.org/wiki/Hungarian_algorithm) we need to create a table of all possible combinations. I have a very rudimentary O(nm) ≈ O(n<sup>2</sup>) mapping function which is easily the biggest bottleneck in the program. I would like to come back and see if there's a way to make it more efficient for larger data sets (see [Issue #15](https://github.com/awarnes/shipment-routing/issues/15)).

##### UPDATE 2/25/23:
I'm sure there are plenty of other ways to look at improving performance of the program, but for now looking at the map jobs function I've set it up to split this into several jobs and run accross multiple worker threads. From initial testing this has improved the performance of the function from ~17 seconds on a 1000x1000 set to ~4 seconds.

Given the pace of the previous functions I had not thought of testing anything higher than that, but after adding the workers I tried running the program with a 10,000x10,000 set. In that single run the `mapJobs` function took ~290 seconds (~5 mintes). Far longer than I'd generally like, but significantly better than the naive approach.

The implementation of the hungarian algorthim that we're using here is expected to be O(n<sup>3</sup>) in the worst case. It has been interesting to see that it's often significantly faster than the O(nm) that the `mapJobs` function runs through. In this 10,000x10,000 case we definitely tipped over the line though because the runtime was approximately 2158 seconds, or 36 minutes. I have not tried that test again.

###### Performance Testing
In the interest of collecting some data about the performance of each part of the program I wrote a simple performance testing function (I'm sure there's better out there, but it gives us an idea). You can run it yourself with `npm run test:performance`. These are the results from running each test 10 times and averaging the times:
```
Testing with [10] drivers and [10] destinations
┌─────────────────┬─────────┐
│     (index)     │ Values  │
├─────────────────┼─────────┤
│   driverTime    │ '0.000' │
│ destinationTime │ '0.008' │
│   mapJobsTime   │ '0.197' │
│  hungarianTime  │ '0.002' │
└─────────────────┴─────────┘
Testing with [100] drivers and [100] destinations
┌─────────────────┬─────────┐
│     (index)     │ Values  │
├─────────────────┼─────────┤
│   driverTime    │ '0.000' │
│ destinationTime │ '0.008' │
│   mapJobsTime   │ '0.195' │
│  hungarianTime  │ '0.002' │
└─────────────────┴─────────┘
Testing with [500] drivers and [500] destinations
┌─────────────────┬─────────┐
│     (index)     │ Values  │
├─────────────────┼─────────┤
│   driverTime    │ '0.002' │
│ destinationTime │ '0.039' │
│   mapJobsTime   │ '2.470' │
│  hungarianTime  │ '0.215' │
└─────────────────┴─────────┘
Testing with [1000] drivers and [1000] destinations
┌─────────────────┬─────────┐
│     (index)     │ Values  │
├─────────────────┼─────────┤
│   driverTime    │ '0.007' │
│ destinationTime │ '0.074' │
│   mapJobsTime   │ '4.064' │
│  hungarianTime  │ '1.603' │
└─────────────────┴─────────┘
```
### Testing Commander
One of the other big challenges I had was how to manage the integration testing for [Commander.js](https://www.npmjs.com/package/commander). I toyed around with a few different things and ended up settling with the current solution of creating a subprocess to the testing process for each test. This seems to be working okay in terms of testing, but is much slower than I'd like it to be. I do worry that if the program took much longer to complete or there was some other complication that there could be issues with the way the integration tests are set up.
## Future Possibilities
[To Top ↑](#table-of-contents)

It's never over! Here are a few more things that could be fun/interesting to add to the project.
1. Publish package :white_check_mark:
    - ~~see [Issue #13](https://github.com/awarnes/shipment-routing/issues/13)~~
1. Fancy Address Parsing
    - Address parsing/validation API: https://www.smarty.com/pricing/choose-your-plan
    - NLP Based Address Parsing: https://www.npmjs.com/package/node-postal
1. Properly handle `sometimes y` vowel/consonant counts
    - see [Issue #14](https://github.com/awarnes/shipment-routing/issues/14)
1. Re-add Node v14.x support
    - see [Issue #3](https://github.com/awarnes/shipment-routing/issues/3)
1. Add more command line feedback for the user
    - What part of the process is the program on?
    - How far along is it?
    - Expected time to completion?