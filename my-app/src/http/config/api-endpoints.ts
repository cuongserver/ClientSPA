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

const roleEndpoints: Endpoints = {
	getAll: {
		path: 'role/get-all',
		method: 'GET',
	},
	getAllPermissionsForCreate: {
		path: 'role/get-all-permissions-for-create',
		method: 'GET',
	},
}

export { userEndpoints, roleEndpoints }
export type { Endpoints }
