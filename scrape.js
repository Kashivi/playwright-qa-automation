const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 60; seed <= 69; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=60=${seed}`; // Replace with actual URL pattern
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => parseFloat(td.innerText.replace(/[^0-9.-]+/g, "")))
        .filter(n => !isNaN(n))
    );

    const pageTotal = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageTotal;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
