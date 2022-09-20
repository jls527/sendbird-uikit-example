import "./App.css";
// import "@sendbird/uikit-react/dist/index.css";

import React from "react";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";
import da from "date-fns/locale/da";

import { ClientUserMessage } from "SendbirdUIKitGlobal";
import SessionHandler from "@sendbird/uikit-react/handlers/SessionHandler";

// export const APP_ID = "2D7B4CDB-932F-4082-9B09-A1153792DC8D";
export const APP_ID = "B3089175-C202-4118-9CD3-B470A7BAB687";

// export const USER_ID = "sendbird";
export const USER_ID = "dba-4007462";

function App() {
  const [currentChannelUrl, setCurrentChannelUrl] = React.useState("");

  const configureSessionHandler = () => {
    const sessionHandler = new SessionHandler();
    sessionHandler.onSessionTokenRequired = (onSuccess, onError) => {
      console.log("onSessionTokenRequired", Date.now());
      onSuccess(
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1IjozMTM1OTg0OCwidiI6MSwiZSI6MTY2MzY2ODY1Nn0.REh_RfJ2myKFWKCQKxg7fKWU7NYjnSDpf1943oBaFVM"
      );
      // A new session token is required in the SDK to refresh the session.
      // Refresh the session token and pass it onto the SDK through `onSuccess(NEW_TOKEN)`.
      // If you do not want to refresh the session, pass on a null value through `onSuccess(null)`.
      // If any error occurred while refreshing the token, let the SDK know about it through `onError()`.
    };
    sessionHandler.onSessionClosed = () => {
      console.log("onSessionClosed");
      // The session refresh has been denied from the app.
      // Client app should guide the user to a login page to log in again.
    };
    sessionHandler.onSessionRefreshed = () => {
      console.log("onSessionRefreshed");
      // OPTIONAL. No action is required.
      // Called when the session is refreshed.
    };
    sessionHandler.onSessionError = (err) => {
      console.log("onSessionError");
      // OPTIONAL. No action is required.
      // Called when an error occurred during the session refresh.
    };
    return sessionHandler;
  };

  return (
    <div>
      <div className="App">
        <SendbirdProvider
          appId={APP_ID}
          userId={USER_ID}
          dateLocale={da}
          configureSession={configureSessionHandler}
          stringSet={{
            TRYING_TO_CONNECT: "Custom connect text - does NOT work",
            CHANNEL__MESSAGE_INPUT__PLACE_HOLDER:
              "Custom input placeholder text - does NOT work",
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
