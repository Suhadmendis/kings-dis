import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * useEffect that does not run on initial render. simulate componentDidUpdate
 * @param effect Imperative function that can return a cleanup function
 * @param deps effect will only activate if the values in the list change
 */
const useDidUpdateEffect = (effect: EffectCallback, deps: DependencyList) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) effect();
        else didMount.current = true;
    }, deps);
}

export default useDidUpdateEffect;
