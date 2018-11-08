export let BASE_URL;
export let WEBSOCKET_URL;

if (process.env.NODE_ENV === 'production') {
	BASE_URL = `https://${window.location.hostname}/api`;
	WEBSOCKET_URL = `wss://${window.location.hostname}/api`;
} else {
	BASE_URL = 'http://localhost:8000/api';
	WEBSOCKET_URL = 'ws://localhost:8000/api';
}
