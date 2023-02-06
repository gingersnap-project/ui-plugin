import * as React from 'react';
import { useState, useEffect } from 'react';
// Hook function for creating state with Callback Hook
export function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = React.useRef(null); // init mutable ref container for callbacks

  const setStateCallback = React.useCallback((state, cb) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(state);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `null` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      // @ts-ignore
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}
