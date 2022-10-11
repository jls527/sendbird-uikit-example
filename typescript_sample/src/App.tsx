import "./App.css";
// import "@sendbird/uikit-react/dist/index.css";

import React from "react";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";
import da from "date-fns/locale/da";

import { ClientUserMessage } from "SendbirdUIKitGlobal";

export const APP_ID = "2D7B4CDB-932F-4082-9B09-A1153792DC8D";
// export const APP_ID = "B3089175-C202-4118-9CD3-B470A7BAB687";

export const USER_ID = "sendbird";
// export const USER_ID = "dba-4007462";

function App() {
  const [currentChannelUrl, setCurrentChannelUrl] = React.useState("");

  return (
    <div>
      <div className="App">
        <SendbirdProvider
          appId={APP_ID}
          userId={USER_ID}
          dateLocale={da}
          stringSet={{
            TRYING_TO_CONNECT: "CUSTOM connect text",
            MESSAGE_INPUT__PLACE_HOLDER: "CUSTOM input placeholder text",
            MESSAGE_INPUT__PLACE_HOLDER__DISABLED: "CUSTOM input disabled text",
            MESSAGE_INPUT__PLACE_HOLDER__MUTED: "CUSTOM input muted text",
          }}
        >
          <ChannelList
            onChannelSelect={(channel) => {
              if (channel?.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
            renderPlaceHolderEmptyList={() => (
              <div className="box">
                Render Empty List State (renderPlaceHolderEmptyList)
              </div>
            )}
            renderPlaceHolderLoading={() => (
              <div className="box">
                Render Loading State (renderPlaceHolderLoading)
              </div>
            )}
            renderPlaceHolderError={() => (
              <div className="box">
                Render Error State (renderPlaceHolderError)
              </div>
            )}
            renderChannelPreview={({ channel }) => (
              <div className="channel-list-item">
                {channel.name} {channel.url}
              </div>
            )}
          />
          <Channel
            channelUrl={currentChannelUrl}
            renderChannelHeader={() => (
              <div className="channel-header">
                Channel header (renderChannelHeader)
              </div>
            )}
            renderMessage={({ message }) => (
              <div className="message">
                <div>{(message as ClientUserMessage)?.message}</div>
                {new Date(message.createdAt).toLocaleTimeString()}
              </div>
            )}
            renderPlaceholderLoader={() => (
              <div className="box">
                Render Loading State (renderPlaceHolderLoader)
              </div>
            )}
            renderPlaceholderEmpty={() => (
              <div className="box">
                Render Empty State (renderPlaceholderEmpty)
              </div>
            )}
            renderPlaceholderInvalid={() => (
              <div className="box">
                Render Invalid State (renderPlaceholderInvalid)
              </div>
            )}
          />
        </SendbirdProvider>
      </div>
      <p>
        Link to source code on GitHub:{" "}
        <a
          href="https://github.com/jls527/sendbird-uikit-example/tree/main/typescript_sample"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/jls527/sendbird-uikit-example/tree/main/typescript_sample
        </a>
        .
      </p>
    </div>
  );
}

export default App;
