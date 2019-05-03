declare const chrome;
import { Button, Input } from "element-react/next";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./header";

export interface IContentScriptRespons {
  table: any[];
  ul: any[];
}

export interface IState {
  response: object;
}

export default function Main() {
  const [resp, setResponse] = useState({ table: [], ul: [] });
  const [value, setValue] = useState("");
  const textRef = useRef(null);

  useEffect(() => {
    chromeContentMessage();
    return undefined;
  }, []);

  function chromeContentMessage() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "start" },
        (response: IContentScriptRespons) => {
          console.log("chrome content_script response", response);
          if (response) {
            setResponse(response);
          }
        }
      );
    });
  }

  function stringify(json) {
    try {
      return JSON.stringify(json, null, 4);
    } catch (err) {
      console.error(err);
      return "";
    }
  }

  function copyToClipboard() {
    const {
      refs: { textarea: teatareaRef }
    } = textRef.current;
    teatareaRef.select();
    document.execCommand("copy");
  }

  const onSelect = useCallback(
    (tag, index) => {
      if (!resp) {
        return;
      }
      if (tag === "top") {
        setValue("");
        return;
      }
      const json = resp[tag][Number(index)];
      if (json) {
        setValue(stringify(json));
      }
    },
    [resp]
  );

  const onChange = useCallback(e => {
    setValue(e);
  }, []);

  return (
    <div style={{ maxHeight: "840px" }}>
      <div style={{ width: "500px" }}>
        <Header response={resp} onSelect={onSelect} />
      </div>
      <Input
        autosize={{ minRows: 20, maxRows: 40 }}
        type="textarea"
        value={value}
        onChange={onChange}
        ref={textRef}
        style={{ margin: "10px 0" }}
      />
      <Button type="primary" disabled={!value} onClick={copyToClipboard}>
        クリップボードにコピー
      </Button>
    </div>
  );
}
