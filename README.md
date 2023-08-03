# Discord Movie Bot

## A Discord bot providing results from The Movie Database

### Installing
`npm install`

### Using the bot

`/moviebot <command> [result option] <term>`

#### Find a movie, tv show, or person
- The first result for Star Wars
    
    `/moviebot find --first Star Wars` or `/moviebot find Star Wars`

- The most popular result for Star Wars

    `/moviebot find --popular Star Wars` or `/moviebot find --pop Star Wars`

#### Misc.
- Is the bot still alive?

    `/moviebot ping`

### Todo:
- [x] Use `node fetch` package to remove Node >=17.5 requirement
    - If fetch is not available in Node.js Core then `node-fetch` will be used
- [ ] Update this file with deployment instructions
    - [ ] What service is useful for hosting Discord bots?
- [ ] Figure out a nice interface for:
    - [ ] Searching for movies, tv, or people aside from making requests to the `/multi` API
    - [ ] Pagination -  What if you didn't want the first or most popular result?
- [ ] Update to `Discord.js` 13 with intents, slash command registration, and ES6 support
- [ ] Incorporate logging with `winston`
