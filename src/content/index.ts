import { browser } from "webextension-polyfill-ts";

interface ITableJson {
  name?: string;
  contents: Array<{
    header: Partial<{ key: string; number: string }>;
    data: Array<Partial<{ key: string; number: string }>>;
  }>;
}

interface IUlistJson {
  name?: string;
  contents: Array<Partial<{ key: string; number: string }>>;
}

/**
 * get an key name of a table/ul element.
 * @param {*} elm
 */
function getElementIndexName(elm: Element): string | undefined {
  if (!elm) {
    return null;
  }
  if (elm.getAttribute("name")) {
    return elm.getAttribute("name");
  }
  if (elm.getAttribute("key")) {
    return elm.getAttribute("key");
  }
  if (elm.getAttribute("class")) {
    return elm.getAttribute("class");
  }
  return null;
}

/**
 * get a key/value object from an table/ul row element.
 * @param {*} elm
 */
function getElementTextObject(
  elm: Element
): Partial<{ key: string; value: string }> {
  if (!elm || !elm.textContent || typeof elm.textContent !== "string") {
    return {};
  }
  const indexName = getElementIndexName(elm);
  if (indexName) {
    return { key: indexName, value: elm.textContent };
  }
  return { value: elm.textContent };
}

/**
 * convert table element to json object.
 * @param {*} t table element
 */
function tableToJson(t: HTMLTableElement): ITableJson {
  const tableJson: ITableJson = {
    contents: []
  };
  if (t.getAttribute("name")) {
    tableJson.name = t.getAttribute("name");
  }
  for (const tr of t.querySelectorAll("tr")) {
    const th = tr.querySelector("th");
    const jsonizedTh = getElementTextObject(th);
    const rowData = [];
    for (const td of tr.querySelectorAll("td")) {
      const jsonizedTd = getElementTextObject(td);
      rowData.push(jsonizedTd);
    }
    tableJson.contents.push({
      data: rowData,
      header: jsonizedTh
    });
  }
  return tableJson;
}

/**
 * apply tableToJson method for multiple table elements
 */
function tablesToJson(): ITableJson[] {
  const tablesJson = [];
  const tables = document.querySelectorAll("table");
  if (!tables || tables.length === 0) {
    return [];
  }
  for (const t of tables) {
    tablesJson.push(tableToJson(t));
  }
  return tablesJson;
}

/**
 * convert ul element to json object.
 * @param {*} ul ul element
 */
function ulToJson(ul: HTMLUListElement): IUlistJson {
  const ulJson: IUlistJson = {
    contents: []
  };
  if (ul.getAttribute("name")) {
    ulJson.name = ul.getAttribute("name");
  }
  for (const li of ul.querySelectorAll("li")) {
    const jsonizedLi = getElementTextObject(li);
    ulJson.contents.push(jsonizedLi);
  }
  return ulJson;
}

/**
 * apply ulToJson method for multiple ul elements
 */
function ulsToJson(): IUlistJson[] {
  const ulsJson = [];
  const uls = document.querySelectorAll("ul");
  if (!uls || uls.length === 0) {
    return [];
  }
  for (const u of uls) {
    ulsJson.push(ulToJson(u));
  }
  return ulsJson;
}

browser.runtime.sendMessage({ table: tablesToJson(), ul: ulsToJson() });
