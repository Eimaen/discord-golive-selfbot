const puppeteer = require('puppeteer-extra');

const config = require('./config.json');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
    const captureTabName = 'Frame Capture Tab';

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        args: [
            '--use-fake-device-for-media-stream',
            '--use-file-for-fake-audio-capture',
            '--enable-usermedia-screen-capturing',
            '--allow-http-screen-capture',
            `--auto-select-desktop-capture-source=${captureTabName}`,
            '--auto-accept-this-tab-capture',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-component-extensions-with-background-pages',
            '--disable-dev-shm-usage',
            '--disable-extensions',
            '--disable-features=TranslateUI,BlinkGenPropertyTrees',
            '--disable-ipc-flooding-protection',
            '--disable-renderer-backgrounding',
            '--enable-features=NetworkService,NetworkServiceInProcess',
            '--force-color-profile=srgb',
            '--hide-scrollbars',
            '--metrics-recording-only',
            '--no-sandbox'
        ],
        ignoreDefaultArgs: ['--mute-audio'],
        executablePath: config.browser.executablePath // should be used with 
    });

    const ctx = browser.defaultBrowserContext();
    ctx.overridePermissions('https://discord.com', ['microphone']);

    // create capture tab
    const capturePage = (await browser.pages())[0];
    await capturePage.goto('https://example.com', { waitUntil: 'networkidle0' });
    await capturePage.evaluate((title) => document.title = title, captureTabName);

    const page = await browser.newPage();

    await page.goto('https://discord.com/app', { waitUntil: 'networkidle0' });

    page.on("dialog", (dialog) => {
        console.log("dialog");
        dialog.accept();
    });

    // login using token
    if (page.url().includes('login')) {
        await page.evaluate((token) => {
            webpackChunkdiscord_app.push([[Math.random()], {}, (r) => { Object.values(r.c).find(m => m.exports && m.exports.default && m.exports.default.login !== void 0).exports.default.loginToken(token) }]);
        }, config.token);
    }

    await page.waitForNetworkIdle({ idleTime: 1000 });

    // join voice
    await page.evaluate((voiceChannelId) => {
        webpackChunkdiscord_app.push([[Math.random()], {}, (r) => { console.log(Object.values(r.c).find(m => m.exports && m.exports.default && m.exports.default.joinVoiceEvent !== void 0).exports.default.joinVoiceEvent(null, voiceChannelId)) }]);
    }, config.voiceChannelId);

    await page.waitForNetworkIdle({ idleTime: 2000 });

    // click the stream button
    await page.click('div[class^="actionButtons"] button:nth-of-type(2) svg');
})();