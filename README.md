# Shipment Routing

1. [Description](#description)
1. [Installation](#installation)
1. [Usage](#usage)
1. [Challenges](#challenges)
1. [Future Possibilities](#future-possibilities)
## Description [↑](#shipment-routing)
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

## Installation [↑](#shipment-routing)
Installation should be a simple:
```bash
npm install
```

### Postinstall Script
The `postinstall` script will run after all dependencies have been installed. This script will install the `pre-push` git-hook into the `.git/hooks` directory in the project. This helps ensure that everything has been properly linted and all tests are passing.

> Note: If in dire need you can always add the `--no-verify` flag to your push command to skip the checks. Make sure that everything lints and passes testing prior to creating your PR though!

## Usage [↑](#shipment-routing)

There are two commands with several options each. The easiest way to see how to use them is to run:
```bash
node index help
```

### Route

Usage: `shipment-routing route [options]`

Route shipments to drivers given a list of shipments and list of drivers

| Options | Description |
|---------|-------------|
| -d --driverFile | File of driver names \\n separated|
| -s --destinationFile | File of shipment destinations \\n separated |
| -t --testData | Comma separated count of number of drivers and destinations to generate. |
| -f --file | Dump output to file |
| -h, --help | display help for command |

#### Examples
Read drivers and destinations from file
```bash
node index route -d ./test/data/drivers100.data -s ./test/data/destinations100.data
```
Read drivers and destinations from file and output to file
```bash
node index route -d ./test/data/drivers100.data -s ./test/data/destinations100.data -f
```
Route 25 randomized drivers and 25 randomized destinations
```bash
node index route -t 25,25
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
node index generate -d 25 -s 25
```
Write 25 randomized drivers and 25 randomized destinations to files in the current working directory.
```bash
node index generate -d 25 -s 25 -p .
```
## Challenges [↑](#shipment-routing)
This project was a lot of fun. I especially enjoyed being able to add all the quality of life features that every project should have. However, I did run into several challenges during the process.
### Algorithm
#### Assignment Problem
I had put off the actual meat of the algorithm until later on thinking that it wouldn't be so difficult. What I had missed was the solution requirement that it:
>maximizes the total SS over the set of drivers

I tried a few brute force ways to begin with until I realized that there was a lot more going on to get the optimal value over the entire set of drivers.

After more research I was able to find the [assignment problem](https://en.wikipedia.org/wiki/Assignment_problem) and realized that was what I needed to code around. It was fairly quick work to find a library that could handle the task relatively quickly. It could be interesting in the future to code my own algorithm, but this seems to be efficient and working well.
#### Map Jobs
As part of the required input for the [hungarian method](https://en.wikipedia.org/wiki/Hungarian_algorithm) we need to create a table of all possible combinations. I have a very rudimentary O(nm) ≈ O(n<sup>2</sup>) mapping function which is easily the worst bottleneck in the program. I would like to come back and see if there's a way to make it more efficient for larger data sets.

### Testing Commander
One of the other big challenges I had was how to manage the integration testing for [Commander.js](https://www.npmjs.com/package/commander). I toyed around with a few different things and ended up settling with the current solution of creating a subprocess to the testing process for each test. This seems to be working okay in terms of testing, but is much slower than I'd like it to be. I do worry that if the program took much longer to complete that there could be issues with the way the integration tests are set up.
## Future Possibilities [↑](#shipment-routing)
It's never over! Here are a few more things that could be fun/interesting to add to the project.
1. Publish package
    - see [Issue #13](https://github.com/awarnes/shipment-routing/issues/13)
1. Fancy Address Parsing
    - Address parsing/validation API: https://www.smarty.com/pricing/choose-your-plan
    - NLP Based Address Parsing: https://www.npmjs.com/package/node-postal
1. Properly handle `sometimes y` vowel/consonant counts
    - see [Issue #14](https://github.com/awarnes/shipment-routing/issues/14)
1. Re-add Node v14.x support
    - see [Issue #3](https://github.com/awarnes/shipment-routing/issues/3)