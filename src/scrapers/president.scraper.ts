import axios from "axios";
import * as cheerio from "cheerio";

const url =
  "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States";

export async function getPresidents() {
  const html: string = (await axios.get(url)).data;
  const $ = cheerio.load(html);
  const presidents = $(
    "#mw-content-text > div.mw-parser-output > table > tbody > tr"
  )
    .map((_, element) => {
      const $president = $("td > b > a", element);
      const $party = $("td:nth-child(6) > a", element);
      const $portrait = $("td:nth-child(2) > a > img", element);
      return {
        name: $president.text() || "",
        href: $president.attr("href") || "",
        party: $party.text() || "",
        portrait: $portrait.attr("src") || "",
      };
    })
    .toArray();
  presidents.shift();
  return presidents;
}
