# discord-golive-selfbot
**A puppeteer wrapper for Discord's "Go Live" feature currently unavailable for regular bot accounts.**

----

## Warning!
Native login with token and voice channel join doesn't work, as Discord moved from webpack to something idk what. I'll fix it soon.

If you want to use the code in this repo, just click manually on voice channel and login.

## Installing and running the test app
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Install Chrome Dev (required) and copy a path to `chrome.exe` executable.
4. Fill in the `config.json` file with `token`, `executablePath` (copied on the previous step) and `voiceChannelId`.
5. Modify the `index.js` file to open the url of your choice & write your own puppeteer automation scripts on the `capturePage` page.
5. Run the test app using `node index.js`.
