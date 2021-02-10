import { Axios } from 'axios-observable'
import { userEndpoints } from 'http/config/api-endpoints'
import { ApiHandlerBase } from 'http/config/api-handler-base'
import { AuthRequest, AuthResponse } from 'http/dto/user'
import { map } from 'rxjs/operators'

class UserApiHandler extends ApiHandlerBase {
	serverUrl = process.env.REACT_APP_API_URL
	public doLogin(request: AuthRequest) {
		const apiKey: keyof typeof userEndpoints = 'auth'
		return Axios.request<AuthResponse>({
			url: userEndpoints[apiKey].path,
			method: userEndpoints[apiKey].method,
			data: request,
			baseURL: this.serverUrl,
		}).pipe(
			map((res) => {
				return res.data
			})
		)
	}

	public restoreSession() {
		const apiKey: keyof typeof userEndpoints = 'restoreSession'
		return Axios.request<AuthResponse>({
			url: userEndpoints[apiKey].path,
			method: userEndpoints[apiKey].method,
			baseURL: this.serverUrl,
			headers: this.headers,
		}).pipe(
			map((res) => {
				return res.data
			})
		)
	}
}

export { UserApiHandler }
