import React, { useSyncExternalStore } from 'react';
import { isSoundEnabled, setSoundEnabled, subscribeSound } from '../../utils/sound';

// Header switch for the interface sounds: four bars that move while sound is
// on and rest flat when it is off. The choice is remembered on this device.
export function SoundToggle() {
  const enabled = useSyncExternalStore(subscribeSound, isSoundEnabled, () => true);
  const hint = enabled ? 'Sound effects: on' : 'Sound effects: off';

  return (
    <button
      type="button"
      className={`nav-sound ${enabled ? 'is-on' : ''}`}
      aria-label="Sound effects"
      aria-pressed={enabled}
      title={hint}
      data-sound="off"
      onClick={() => setSoundEnabled(!enabled)}
    >
      <span className="nav-sound-bars" aria-hidden="true"><i /><i /><i /><i /></span>
    </button>
  );
}

export default SoundToggle;
