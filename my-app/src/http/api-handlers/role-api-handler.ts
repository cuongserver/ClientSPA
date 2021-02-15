import { AxiosError } from 'axios'
import { Axios } from 'axios-observable'
import { roleEndpoints } from 'http/config/api-endpoints'
import { ApiHandlerBase } from 'http/config/api-handler-base'
import { RoleCreateOrEditRequest, RoleCreateOrEditResponse, RoleDetailsResponse, RoleListResponse } from 'http/dto/role'
import { throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

class RoleApiHandler extends ApiHandlerBase {
	getAll() {
		const apiKey: keyof typeof roleEndpoints = 'getAll'
		return Axios.request<RoleListResponse>({
			url: roleEndpoints[apiKey].path,
			method: roleEndpoints[apiKey].method,
			baseURL: this.serverUrl,
			headers: this.headers,
		}).pipe(
			map((response) => response.data),
			catchError((error: AxiosError) => {
				return throwError(error)
			})
		)
	}
	getAllPermissionsForCreate() {
		const apiKey: keyof typeof roleEndpoints = 'getAllPermissionsForCreate'
		return Axios.request<{ [key: string]: string[] }>({
			url: roleEndpoints[apiKey].path,
			method: roleEndpoints[apiKey].method,
			baseURL: this.serverUrl,
			headers: this.headers,
		}).pipe(
			map((response) => response.data),
			catchError((error: AxiosError) => {
				return throwError(error)
			})
		)
	}
	createOrEditRole(request: RoleCreateOrEditRequest) {
		const apiKey = 'createOrEditRole'
		return Axios.request<RoleCreateOrEditResponse>({
			url: roleEndpoints[apiKey].path,
			method: roleEndpoints[apiKey].method,
			data: request,
			baseURL: this.serverUrl,
			headers: this.headers,
		}).pipe(
			map((response) => response.data),
			catchError((error: AxiosError) => {
				return throwError(error)
			})
		)
	}

	viewRoleById(roleId: string) {
		const apiKey = 'viewRoleDetails'
		return Axios.request<RoleDetailsResponse>({
			url: roleEndpoints[apiKey].path,
			method: roleEndpoints[apiKey].method,
			params: {
				roleId: roleId,
			},
			baseURL: this.serverUrl,
			headers: this.headers,
		}).pipe(
			map((response) => response.data),
			catchError((error: AxiosError) => {
				return throwError(error)
			})
		)
	}
}

export { RoleApiHandler }
