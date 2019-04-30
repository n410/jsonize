declare const chrome;
import * as React from "react";

export interface IContentScriptRespons {
  title: string;
  src: string;
}

export class Main extends React.Component<any, any> {
  public state = {};
  constructor(props, state) {
    super(props, state);
  }

  public componentDidMount() {
    this.chromeContentMessage();
  }

  public chromeContentMessage() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "start" },
        (response: IContentScriptRespons) => {
          console.log("chrome content_script response", response);
        }
      );
    });
  }

  public render() {
    return <div>test</div>;
  }
}
