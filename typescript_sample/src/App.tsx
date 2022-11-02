import "./App.css";
// import "@sendbird/uikit-react/dist/index.css";

import React from "react";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";
import da from "date-fns/locale/da";

import { ClientUserMessage, RenderMessageProps } from "SendbirdUIKitGlobal";
import { getOutgoingMessageState } from "@sendbird/uikit-react/utils/message/getOutgoingMessageState";
import { useChannelContext } from "@sendbird/uikit-react/Channel/context";

export const APP_ID = "2D7B4CDB-932F-4082-9B09-A1153792DC8D";
// export const APP_ID = "B3089175-C202-4118-9CD3-B470A7BAB687";
// export const USER_ID = "sendbird";

function App() {
  const userId = window.location.search.replace("?user=", "") || "sendbird";
  const [currentChannelUrl, setCurrentChannelUrl] = React.useState("");

  return (
    <div>
      <h1>Sendbird demo app</h1>
      <p>
        You can change the User ID by changing the URL parameter like /?user=abc
      </p>
      <p>
        Your User ID: <strong>{userId}</strong>
        <br />
        Current Channel URL: <strong>{currentChannelUrl}</strong>
      </p>
      <div className="App">
        <SendbirdProvider
          appId={APP_ID}
          userId={userId}
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
            renderMessage={(renderProps) => (
              <RenderMessage {...renderProps} userId={userId} />
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

function RenderMessage(props: RenderMessageProps & { userId: string }) {
  const { currentGroupChannel } = useChannelContext();

  const message = props.message as ClientUserMessage;

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        className="message"
        style={{
          float: message?.sender?.userId === props.userId ? "right" : "left",
        }}
      >
        <strong>{message?.sender?.userId}</strong>
        <div>{message?.message}</div>
        <div>{new Date(message.createdAt).toLocaleTimeString()}</div>
        {currentGroupChannel && (
          <strong>
            {getOutgoingMessageState(currentGroupChannel, message)}
          </strong>
        )}
      </div>
    </div>
  );
}
