const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const backendAddress =
  hostname === 'localhost' ? 'https://gstuczynski.pl/api' : `//${hostname}/api`;

export default {
  backendAddress,
  allowOrigin: '*',
};
