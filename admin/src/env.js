export let BASE_URL;
export let SOCKET_URL;

if (process.env.NODE_ENV === 'production') {
	BASE_URL = `https://${window.location.hostname}/api`;
	SOCKET_URL = `wss://${window.location.hostname}/api`;
} else {
	BASE_URL = 'http://localhost:8000/api';
	SOCKET_URL = 'ws://localhost:8000/api';
}
