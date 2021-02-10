import { Method } from 'axios'

interface Endpoint {
	path: string
	method: Method
}

interface Endpoints {
	[key: string]: Endpoint
}

const userEndpoints: Endpoints = {
	auth: {
		path: 'user/auth',
		method: 'POST',
	},
	restoreSession: {
		path: 'user/restore-session',
		method: 'GET',
	},
}

export { userEndpoints }
export type { Endpoints }
