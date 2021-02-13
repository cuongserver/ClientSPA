export class ApiHandlerBase {
	headers: { [key: string]: string } = {}
	serverUrl = process.env.REACT_APP_API_URL
	setHeader(headers: { [key: string]: string }) {
		this.headers = { ...headers }
		return this
	}
}
