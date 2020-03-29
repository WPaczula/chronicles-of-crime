import * as React from "react";

type MessageHandler<Data> = (data: Data) => void;

function useSocket<Data>(url: string, onMessage: MessageHandler<Data>) {
  const socket = React.useRef<WebSocket>();
  const messageHandler = React.useRef<MessageHandler<Data>>(onMessage);

  React.useEffect(() => {
    const createdSocket = new WebSocket(url);
    createdSocket.onmessage = event => {
      const data: Data = JSON.parse(event.data);
      messageHandler.current(data);
    };

    socket.current = createdSocket;

    return () => {
      createdSocket.close();
    };
  }, [url]);

  return React.useCallback((data: Data) => {
    if (socket.current?.readyState === 1) {
      socket.current?.send(JSON.stringify(data));
    }
  }, []);
}

export default useSocket;
