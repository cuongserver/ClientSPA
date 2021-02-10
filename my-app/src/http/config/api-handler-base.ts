export class ApiHandlerBase {
	headers: { [key: string]: string } = {}
	setHeader(headers: { [key: string]: string }) {
		this.headers = { ...headers }
		return this
	}
}
