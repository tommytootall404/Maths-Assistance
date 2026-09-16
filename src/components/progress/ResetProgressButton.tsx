import { useState } from 'react';
import { useProgress } from '../../hooks/useProgress';

export function ResetProgressButton() {
  const { resetAll } = useProgress();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="reset-progress reset-progress--confirming">
        <span>Reset all saved progress on this device?</span>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            resetAll();
            setConfirming(false);
          }}
        >
          Yes, reset it
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => setConfirming(false)}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button type="button" className="btn btn--ghost" onClick={() => setConfirming(true)}>
      Reset progress
    </button>
  );
}
