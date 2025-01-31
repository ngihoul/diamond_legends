import { LineUpDetail } from '@/lib/models/lineup.model';
import { Player, PositionType } from '@/lib/models/player.model';
import { useState } from 'react';

type PitcherChoiceProps = {
  pitchers: Player[];
  isSelectedTeam: boolean;
  onPitcherChange?: (pitcher: LineUpDetail) => void;
};

export default function PitcherChoice({
  pitchers: initialPitchers,
  isSelectedTeam,
  onPitcherChange,
}: PitcherChoiceProps) {
  const [selectedPitcherId, setSelectedPitcherId] = useState<number | null>(null);

  const handlePitcherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pitcherId = Number(e.target.value);
    const selectedPitcher = initialPitchers.find((p) => p.id === pitcherId);

    setSelectedPitcherId(pitcherId);

    if (selectedPitcher && onPitcherChange && isSelectedTeam) {
      const pitcherLineUp: LineUpDetail = {
        playerId: selectedPitcher.id,
        order: 10,
        position: 1,
      };

      onPitcherChange(pitcherLineUp);
    }
  };

  return (
    <div className='pitcher-choice'>
      <div className='form-control'>
        <label>Lanceur partant :</label>
        <select value={selectedPitcherId || ''} onChange={handlePitcherChange} disabled={!isSelectedTeam}>
          <option value=''>Sélectionner un lanceur</option>
          {initialPitchers.map((p: Player) => (
            <option key={p.id} value={p.id}>
              {`${p.lastname} ${p.firstname} - ${p.energy}% - ${p.positions
                .map((pos: number) => PositionType[pos])
                .join(', ')}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
