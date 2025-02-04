import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { Game, GameEvent } from '../models/game.model';
import { FullLineUp } from '../models/lineup.model';

const useSignalR = (hubUrl: string, eventHandler: (gameEvent: GameEvent) => void, endHandler: (game: Game) => void) => {
  const [isConnected, setIsConnected] = useState(false);
  const connection = useRef<signalR.HubConnection>(null);

  const simulateGame = (gameId: number, lineUpDetails: FullLineUp) => {
    lineUpDetails.gameId = gameId;
    connection.current?.invoke('SimulateGame', lineUpDetails);
  };

  useEffect(() => {
    connection.current = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

    const startConnection = async () => {
      try {
        await connection.current?.start();
        console.log('SignalR Connected');
        setIsConnected(true);
      } catch (err) {
        console.error('SignalR Connection Error:', err);
        setIsConnected(false);
      }
    };

    connection.current?.on('SendEvents', eventHandler);

    connection.current?.on('GameEnd', endHandler);

    startConnection();

    return () => {
      connection.current?.stop();
    };
  }, []);

  return { isConnected, simulateGame };
};

export default useSignalR;
