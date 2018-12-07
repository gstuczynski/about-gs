const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const backendAddress = hostname === 'localhost' ? '//localhost:3000' : `//${hostname}/api`;

export default {
  backendAddress,
  allowOrigin: '*',
};
