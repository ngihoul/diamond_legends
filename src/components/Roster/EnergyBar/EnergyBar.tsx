type EnergyBarProps = {
  energy: number;
};

import './EnergyBar.css';

export default function EnergyBar({ energy }: EnergyBarProps) {
  return (
    <div
      className='energy-bar'
      style={
        energy === 100
          ? { width: '100%', backgroundColor: 'green' }
          : energy >= 70 && energy < 100
          ? { width: `${energy}%`, backgroundColor: '#ACE1AF' }
          : energy > 50 && energy < 70
          ? { width: `${energy}%`, backgroundColor: 'orange' }
          : { width: `${energy}%`, backgroundColor: 'red' }
      }></div>
  );
}
