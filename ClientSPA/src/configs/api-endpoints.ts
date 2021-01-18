import { Method } from 'axios'

interface Endpoint {
	path: string
	method: Method
}

interface Endpoints {
	[key: string]: Endpoint
}

const userEndpoints: Endpoints = {
	authenticate: {
		path: 'user/authenticate',
		method: 'POST',
	},
	addMember: {
		path: 'user/add-member',
		method: 'POST',
	},
	submitAvatar: {
		path: 'user/submit-avatar',
		method: 'POST',
	},
}

export { userEndpoints }
export type { Endpoints }
