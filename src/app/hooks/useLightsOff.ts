import { useLocation } from 'react-router-dom';

const useLightsOff = () => {
  const { pathname } = useLocation();

  // Check if the current route is either '/work/:id' or '/photography'
  return pathname.startsWith('/work/') || pathname === '/photography';
};

export default useLightsOff;