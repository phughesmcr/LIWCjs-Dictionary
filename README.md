# LIWCjs Dictionary
Parse and manipulate multiple LIWC dictionary files.

## Table of Contents
1. [Install](#install)
2. [Usage](#usage)
3. [To-Do](#todo)
4. [References](#references)
5. [Disclaimer](#disclaimer)
6. [License](#License)

<a name="install">

## Install
Requires Node.js v8.10.0 or above.

To install:
```bash
npm install --save liwcjs-dictionary
```

or, to install without development dependencies:
```bash
npm install --save --production liwcjs-dictionary
```

<a name="usage">

## Usage

LIWCjs-Dictionary is a node module which can be added to your node project like any other:
```javascript
const LIWCDictionary = require('liwcjs-dictionary');
```

All of LIWCjs-Dictionary's DictionaryContainer functions are async and return a promise containing the dictionary object.

See ```test/test.js``` for a complete usage example.

See ```docs/index.html``` for API documentation.

<a name="todo">

## To-Do
- [ ] Testing LIWC 2007 dictionary format
- [ ] Unit tests
- [ ] Improved error handling
- [ ] Complete documentation

<a name="contributing">

## Contributing

Contributions are welcome and encouraged. Please read `CODE_OF_CONDUCT.md`, `SECURITY.md` and consult the `docs` directory first.

LIWCjs-Dictionary is written in Typescript and uses [gts](https://github.com/google/gts).

Please run `gts fix` on any code you're wanting to submit and make sure it compiles using `tsc -p .`

As the purpose of this project is to provide results which match LIWC2015, contributions which affect the accuracy of results will not be accepted.

<a name="references">

## References

Gottschalk, L.A. (1997). The unobtrusive measurement of psychological states and traits. In Text Analysis for the Social Sciences, (Carl W. Roberts, editor). 117-129.

Pennebaker, J.W. (2011). The Secret Life of Pronouns: What Our Words Say About Us. New York: Bloomsbury.

Tausczik, Y.R., & Pennebaker, J.W. (2010). The psychological meaning of words: LIWC and computerized text analysis methods. Journal of Language and Social Psychology, 29, 24-54.

<a name="disclaimer">

## Disclaimer

LIWCjs & LIWCjs-Dictionary are unauthorised, unofficial attempts to replicate the functionality of LIWC which is closed-source software created by Pennebaker Conglomerates, Inc. LIWCjs, LIWCjs-Dictionary, their creator and their contributors are not affiliated with, and do not represent, Pennebaker Conglomerates, Inc.

LIWCjs does not provide medical advice. It is intended for informational purposes only.

LIWCjs-Dictionary is shared under the [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported](http://creativecommons.org/licenses/by-nc-sa/3.0/) license. See `LICENSE` for further disclaimers.

<a name="license">

## License
Copyright 2019 [P. Hughes](https://www.phugh.es). All rights reserved.

Shared under the [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported](http://creativecommons.org/licenses/by-nc-sa/3.0/) license. See `LICENSE` for further details.
