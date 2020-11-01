type ApiMethod = 'GET' | 'POST'

interface Endpoint {
	path: string
	method: ApiMethod
}

interface Endpoints {
	[key: string]: Endpoint
}

const userEndpoints: Endpoints = {
	authenticate: {
		path: 'user/authenticate',
		method: 'POST'
	}
}

export { userEndpoints }
export type { ApiMethod, Endpoints }
