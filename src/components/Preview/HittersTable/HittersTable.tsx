import { useState, useEffect, useMemo, useCallback } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { PlayersTableProps, PositionsInGame } from '@/lib/models/lineup.model';
import { getFilteredPositions, getInitialPositionsInGame } from '@/lib/utils/positions';
import { SortableRow } from '../SortableRow/SortableRow';

import './HittersTable.css';

export const HittersTable = ({ players: initialPlayers, isSelectedTeam, onLineUpChange }: PlayersTableProps) => {
  const [players, setPlayers] = useState(initialPlayers);
  const positions = useMemo(() => getFilteredPositions(), []);
  const [positionsInGame, setPositionsInGame] = useState<PositionsInGame>(getInitialPositionsInGame());

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPositionsInGame((prevValues) => {
      const newValues = { ...prevValues };
      Object.keys(newValues).forEach((key) => {
        if (newValues[key] === value) {
          newValues[key] = '';
        }
      });
      newValues[name] = value;
      return newValues;
    });
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!isSelectedTeam) return;
      const { active, over } = event;
      if (over && active.id !== over.id) {
        setPlayers((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    },
    [isSelectedTeam],
  );

  const lineUpDetails = useMemo(() => {
    return players
      .slice(0, 9)
      .map((player, index) => ({
        playerId: player.id,
        order: index + 1,
        position: parseInt(positionsInGame[`positionInGame${index + 1}`] || '0'),
      }))
      .filter((detail) => detail.position !== 0);
  }, [players, positionsInGame]);

  useEffect(() => {
    if (!isSelectedTeam || !onLineUpChange) return;
    onLineUpChange(lineUpDetails);
  }, [lineUpDetails, isSelectedTeam, onLineUpChange]);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <table className='players-table'>
        <thead>
          <tr>
            <th colSpan={2}></th>
            <th>Nom</th>
            <th>Energie</th>
            <th>Positions</th>
            <th>AVG</th>
          </tr>
        </thead>
        <tbody>
          <SortableContext items={players.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            {players.map((player, index) => (
              <SortableRow
                key={player.id}
                player={player}
                index={index}
                isSelectedTeam={isSelectedTeam}
                positionsInGame={positionsInGame}
                handleChange={handleChange}
                positions={positions}
              />
            ))}
          </SortableContext>
        </tbody>
      </table>
    </DndContext>
  );
};
