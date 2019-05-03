/**
 * get an key name of a table/ul element.
 * @param {*} elm
 */
function getElementIndexName(elm) {
  if(!elm) {
    return null;
  }
  if(elm.getAttribute("name")) {
    return elm.getAttribute("name");
  }
  if(elm.getAttribute("key")) {
    return elm.getAttribute("key");
  }
  if(elm.getAttribute("class")) {
    return elm.getAttribute("class");
  }
  return null;
}

/**
 * get a key/value object from an table/ul row element.
 * @param {*} elm 
 */
function getElementTextObject(elm) {
  if(!elm || !elm.textContent || typeof elm.textContent !== "string") {
    return {};
  }
  const indexName = getElementIndexName(elm);
  if(indexName) {
    return { key: indexName, value: elm.textContent };
  }
  return { value: elm.textContent }
}

/**
 * convert table element to json object.
 * @param {*} t table element
 */
function tableToJson(t) {
  const tableJson = {};
  if(t.getAttribute("name")) {
    tableJson.name = t.getAttribute("name");
  }
  tableJson.contents = [];
  for(let tr of t.querySelectorAll("tr")) {
    const jsonizedRow = {};
    const th = tr.querySelector("th");
    const jsonizedTh = getElementTextObject(th);
    jsonizedRow.header = jsonizedTh;
    jsonizedRow.data = [];
    for(let td of tr.querySelectorAll("td")) {
      const jsonizedTd = getElementTextObject(td);
      jsonizedRow.data.push(jsonizedTd);
    }
    tableJson.contents.push(jsonizedRow);
  }
  return tableJson;
}

/**
 * apply tableToJson method for multiple table elements
 */
function tablesToJson() {
  const tablesJson = [];
  const tables = document.querySelectorAll("table");
  if(!tables || tables.length === 0) {
    return [];
  }
  for(let t of tables) {
    tablesJson.push(tableToJson(t));
  }
  return tablesJson;
}

/**
 * convert ul element to json object.
 * @param {*} ul ul element
 */
function ulToJson(ul) {
  const ulJson = {};
  if(ul.getAttribute("name")) {
    ulJson.name = ul.getAttribute("name");
  }
  ulJson.contents = [];
  for(let li of ul.querySelectorAll("li")) {
    const jsonizedLi = getElementTextObject(li);
    ulJson.contents.push(jsonizedLi);
  }
  return ulJson;
}

/**
 * apply ulToJson method for multiple ul elements
 */
function ulsToJson() {
  const ulsJson = [];
  const uls = document.querySelectorAll("ul");
  if(!uls || uls.length === 0) {
    return [];
  }
  for(let u of uls)  {
    ulsJson.push(ulToJson(u));
  }
  return ulsJson;
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === "start") {
      const response = { table: tablesToJson(), ul: ulsToJson() };
      sendResponse(response);
    }
  });
