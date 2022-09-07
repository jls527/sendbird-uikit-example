import "./App.css";
// import "@sendbird/uikit-react/dist/index.css";

import React from "react";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";

import { APP_ID, USER_ID, NICKNAME } from "./const";
import { ClientUserMessage } from "SendbirdUIKitGlobal";

function App() {
  const [currentChannelUrl, setCurrentChannelUrl] = React.useState("");
  return (
    <div className="App">
      <SendbirdProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
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
  );
}

export default App;
