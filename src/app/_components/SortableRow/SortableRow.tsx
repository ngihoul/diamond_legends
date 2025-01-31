import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PositionType } from "@/lib/models/player.model";
import { SortableRowProps } from '@/lib/models/lineup.model';

export const SortableRow = ({ 
  player, 
  index, 
  isSelectedTeam, 
  positionsInGame, 
  handleChange, 
  positions 
}: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: player.id,
    disabled: !isSelectedTeam
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isSelectedTeam ? 'grab' : 'default'
  };

  return (
    <tr ref={setNodeRef} style={style}>
      {isSelectedTeam ? (
        <>
          {index < 9 ? (<td>{index + 1}</td>) : (<td>BE</td>)}
          {index < 9 ? (
            <td>
              <select
                onChange={(e) => handleChange(e, player.id)}
                name={`positionInGame${index + 1}`}
                value={positionsInGame[`positionInGame${index + 1}`]}
              >
                <option value=""></option>
                {positions.map((key, index) => (
                  <option key={key} value={index + 1}>{key}</option>
                ))}
              </select>
            </td>
          ) : (<td></td>)}
        </>
      ) : (
        <>
          <td></td>
          <td></td>
        </>
      )}
      <td {...(isSelectedTeam ? { ...attributes, ...listeners } : {})}>
        {player.lastname} {player.firstname}
      </td>
      <td {...(isSelectedTeam ? { ...attributes, ...listeners } : {})}>
        {player.energy}%
      </td>
      <td {...(isSelectedTeam ? { ...attributes, ...listeners } : {})}>
        {player.positions.map((pos: number) => PositionType[pos]).join(', ')}
      </td>
      <td {...(isSelectedTeam ? { ...attributes, ...listeners } : {})}>
        {player.avg ? (player.avg.toFixed(3)) : ('0.000')}
      </td>
    </tr>
  );
};