const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 60; seed <= 69; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Processing seed ${seed}`);

    await page.goto(url);

    // IMPORTANT: wait for JS table to load
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => parseFloat(td.innerText.trim()))
        .filter(n => !isNaN(n))
    );

    const pageTotal = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} total: ${pageTotal}`);

    grandTotal += pageTotal;
  }

  console.log("================================");
  console.log("FINAL GRAND TOTAL:", grandTotal);
  console.log("================================");

  await browser.close();
})();
