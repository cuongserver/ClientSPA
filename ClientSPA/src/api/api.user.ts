import { Axios } from 'axios-observable'
import { userEndpoints } from 'configs/api-endpoints'
import { UserLoginRequest, UserLoginResponse } from 'types/dto.user'

class UserApiService {
	private serverUrl = process.env.REACT_APP_API_URL
	public doLogin(request: UserLoginRequest) {
		const apiKey: keyof typeof userEndpoints = 'authenticate'
		return Axios.request<UserLoginResponse>({
			url: userEndpoints[apiKey].path,
			method: userEndpoints[apiKey].method,
			data: request,
			baseURL: this.serverUrl
		})
	}
}

export { UserApiService }
export type { UserLoginRequest, UserLoginResponse }