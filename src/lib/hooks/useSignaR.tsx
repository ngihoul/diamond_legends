import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { GameEvent } from '../models/game.model';

const useSignalR = (hubUrl: string, eventHandler: (gameEvent: GameEvent) => void) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect([3000])
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log('SignalR Connected');
        setIsConnected(true);
      } catch (err) {
        console.error('SignalR Connection Error:', err);
        setIsConnected(false);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        startConnection();
      }
    };

    if (connection.connectionId) {
      connection.off('SendEvent'); // Retirer les anciens handlers si nécessaire
    }

    connection.on('SendEvent', eventHandler);

    connection.onclose(() => {
      console.log('SignalR Disconnected');
      setIsConnected(false);
      startConnection();
    });

    startConnection();

    return () => {
      connection.stop();
    };
  }, [hubUrl, eventHandler]);

  return { isConnected };
};

export default useSignalR;
