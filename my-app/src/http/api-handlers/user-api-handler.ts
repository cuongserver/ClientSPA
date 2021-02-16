import { AxiosError } from 'axios'
import { Axios } from 'axios-observable'
import { userEndpoints } from 'http/config/api-endpoints'
import { ApiHandlerBase } from 'http/config/api-handler-base'
import { PinValidateRequest, PinValidateResponse } from 'http/dto/role'
import { AuthRequest, AuthResponse, GetMfaKeyResponse } from 'http/dto/user'
import { throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

class UserApiHandler extends ApiHandlerBase {
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
			}),
			catchError((err: AxiosError) => {
				if (err.response?.status === 401)
					return [
						{
							displayName: '',
							jwToken: '',
							permissions: [],
							result: 'auth-failed',
						},
					]
				return throwError(err)
			})
		)
	}
	public getMfaKey() {
		const apiKey = 'getMfaKey'
		return Axios.request<GetMfaKeyResponse>({
			url: userEndpoints[apiKey].path,
			method: userEndpoints[apiKey].method,
			baseURL: this.serverUrl,
			headers: this.headers,
		}).pipe(
			map((res) => {
				return res.data
			}),
			catchError((err: AxiosError) => {
				return throwError(err)
			})
		)
	}
	public validatePin(request: PinValidateRequest) {
		const apiKey = 'validatePin'
		return Axios.request<PinValidateResponse>({
			url: userEndpoints[apiKey].path,
			method: userEndpoints[apiKey].method,
			baseURL: this.serverUrl,
			headers: this.headers,
			params: request,
		}).pipe(
			map((res) => {
				return res.data
			}),
			catchError((err: AxiosError) => {
				return throwError(err)
			})
		)
	}
}

export { UserApiHandler }
