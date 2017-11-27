# Dones CLI

Dones CLI is an integration for the [Dones application](https://github.com/aduth/dones), enabling you to record Dones tasks straight from your terminal.

## Installation

You'll need to have [Node.js](https://nodejs.org/en/) installed before getting started. 

Install the `dones` module globally using npm:

```
npm install --global dones
```

Since Dones CLI is an external client, you will need to install a plugin for your WordPress site to allow external authentication. For more information, read [**Tip: Recording Dones by HTTP Request**](https://github.com/aduth/dones/wiki/Tip:-Recording-Dones-by-HTTP-Request).

**Linux Users:** To make use of the system credentials store, Dones CLI has a dependency on `libsecret`. [See installation instructions](https://www.npmjs.com/package/keytar#on-linux).

## Usage

Once installed, record dones using the `dones` command:

```
dones "Completed #projectx"
```

On the first run, you will be prompted to enter details about your Dones website instance and credentials.

**Options:**

`--date`

Specify a date for the completed task.

```
dones "Complete the flux capacitor #timetravel" --date 1985-07-03
```

`--goal`

Mark task as an incomplete goal for the day.

```
dones "Finish documentation" --goal
```

`--setup`

Re-run the Dones CLI configuration process.

```
dones --setup
```

`--help`

Display help instructions and example usage.

```
dones --help
```

## License

Copyright (c) 2017 Andrew Duthie

[The MIT License (MIT)](https://opensource.org/licenses/MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
