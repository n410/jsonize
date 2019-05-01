import { Menu } from "element-react/next";
import * as React from "react";
import { IContentScriptRespons } from "./main";

export const Header = React.memo<{
  response: IContentScriptRespons;
  onSelect: (tag: string, index: string) => void;
}>(({ response, onSelect }) => {
  const { table, ul } = response;

  function onSelectMenu(index, [tag]) {
    onSelect(tag, index.split("/")[0]);
  }

  function trim(str) {
    if (!str) {
      return "";
    }
    return str.substring(0, 5) + "...";
  }

  function getHeadline(tag, index) {
    const domJson = response[tag][index];
    if (!domJson) {
      return "";
    }
    const contentJson = domJson.contents[0];
    if (!contentJson) {
      return "";
    }
    if (tag === "ul") {
      return contentJson.value;
    }
    if (contentJson.th && contentJson.th.value) {
      return contentJson.th.value;
    }
    if (contentJson.tds && contentJson.tds.length > 0) {
      return contentJson.tds[0].value || "";
    }
    return "";
  }

  return (
    <Menu
      theme="dark"
      defaultActive="top"
      className="menu"
      mode="horizontal"
      onSelect={onSelectMenu}
    >
      <Menu.Item index="top">Jsonize</Menu.Item>
      {table && table.length > 0 && (
        <Menu.SubMenu index="table" title="Table">
          {table.map((t, i) => (
            <Menu.Item key={t.name || `Option${i}`} index={`${i}/table`}>
              {t.name || `要素${i + 1}[${trim(getHeadline("table", i))}]`}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      )}
      {ul && ul.length > 0 && (
        <Menu.SubMenu index="ul" title="Ul">
          {ul.map((u, i) => (
            <Menu.Item key={u.name || `Option${i}`} index={`${i}/ul`}>
              {u.name || `要素${i + 1}[${trim(getHeadline("ul", i))}]`}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      )}
    </Menu>
  );
});
