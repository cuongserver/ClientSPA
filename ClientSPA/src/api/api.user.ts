import { Axios } from 'axios-observable'
import { userEndpoints } from 'configs/api-endpoints'
import {
	AddMemberRequest,
	AddMemberResponse,
	UserLoginRequest,
	UserLoginResponse,
	SubmitAvatarRequest,
} from 'types/dto.user'
import { store } from 'configs/config.store'
import { StoreStateIdentity } from 'types/store.identity'

class UserApiService {
	private serverUrl = process.env.REACT_APP_API_URL
	private authHeader = () => {
		return {
			Authorization:
				'Bearer ' +
				(store.getState().identity as StoreStateIdentity).identity!.authToken!,
		}
	}
	public doLogin(request: UserLoginRequest) {
		const apiKey: keyof typeof userEndpoints = 'authenticate'
		return Axios.request<UserLoginResponse>({
			url: userEndpoints[apiKey].path,
			method: userEndpoints[apiKey].method,
			data: request,
			baseURL: this.serverUrl,
		})
	}
	public addMember(request: AddMemberRequest) {
		const apiKey: keyof typeof userEndpoints = 'addMember'
		return Axios.request<AddMemberResponse>({
			url: userEndpoints[apiKey].path,
			method: userEndpoints[apiKey].method,
			data: request,
			baseURL: this.serverUrl,
		})
	}
	public submitAvatar(request: SubmitAvatarRequest) {
		const apiKey: keyof typeof userEndpoints = 'submitAvatar'
		return Axios.request({
			url: userEndpoints[apiKey].path,
			method: userEndpoints[apiKey].method,
			data: request,
			baseURL: this.serverUrl,
			headers: this.authHeader(),
		})
	}
}

export { UserApiService }
export type { UserLoginRequest, UserLoginResponse }
