# Nyan
Discord Bot

created by: 
> Sakleren Devs

## Project RPWT
> Project RPWT:
> Role
> Play
> Word
> Text

## Info

Our project is to develop an RPG bot for Discord servers and in the future if it is successful to expand to another platform.

### Objetives (comands and structures)
- [x] Build basic program
- [x] Build user status 
- [x] Build shop
- [x] Build economy
- [ ] Build Dungeon


### Information for developers
The bot token will not be exposed at any time, so use a bot created by yourself for testing, remember the token must be kept secret so that there are no future problems.

Enter the discord [Developer portal](https://discord.com/developers/applications) and create your bot

### Bot info:
Developing: Crescent

Dependencies

| Name | Version |
|------|---------|
| aws-sdk | ^2.1009.0 |
| discord-rpc | ^4.0.1 |
| discord.js | ^12.5.3 |
| index.js | ^0.0.3|
| quick.db | 7.1.3 |

Installation

```sh
cd Nyan_bot
npm install
```

Executing
The commands `const aws=require('aws-sdk')` should be commented out, and the command `client.login(process.env.APP_TOKEN)` should be written like this: client.login("YOUR TOKEN"), where YOUR TOKEN should be replaced by the bot's token

```sh
node index.js
```

### Upload
make a [pull request](https://github.com/Armaggedom/Nyan/pulls)(https://github.com/Armaggedom/) in this repository and wait for your command to be revised, if it does not comply with the guidelines it will be denied and if you want you can redo the code and send it again. If accepted, your code will be merged to the original and may present minor adaptations and credits will be given within the code by the command `$help` and by this README

### Guidelines

1. Code guideline
	- In complex codes or very large blocks of code that are difficult to read and interpret, comment on what it does.
	- Don't clutter the code with unused lines or variables
	- At each Pull request, put this header at the beginning: `// Version: (version of the code you used as base) & Version-mod: (Version of your code)-(change classification)`

2. Discord guideline
	- Any command derived from photos/videos/gifs/audio and/or messages, among others, that fits into the *NSWF* category must be placed in the command to prohibit the use of this command outside of *NSWF* channels

### Change classification

> relative change: something related to the bot's main purpose has been changed or added

> non-relative change: changing or adding commands not related to the main objective

> Bugs: bug fixes with few source code changes


- Sakleren Devs
