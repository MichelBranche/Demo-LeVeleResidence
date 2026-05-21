import { useEffect, useState } from 'react';
import { getNetworkTier, subscribeToNetworkChanges, type NetworkTier } from '../lib/network';

export function useNetworkTier(): NetworkTier {
  const [tier, setTier] = useState<NetworkTier>(() => getNetworkTier());

  useEffect(() => {
    const update = () => setTier(getNetworkTier());
    const mq = window.matchMedia('(max-width: 767px)');
    mq.addEventListener('change', update);
    const unsubConn = subscribeToNetworkChanges(update);
    return () => {
      mq.removeEventListener('change', update);
      unsubConn();
    };
  }, []);

  return tier;
}
