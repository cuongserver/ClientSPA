interface UserLoginRequest {
	username: string
	password: string
}

interface UserDetail {
	id: string
	userName: string
	accessRights: string[]
}

interface OutputAuthentication {
	userDetail: UserDetail
	result: AuthenticationResult
}

interface UserLoginResponse extends OutputAuthentication {
	token: string
}

interface AddMemberRequest {
	userName: string
	password: string
}
interface AddMemberResponse {
	id: string
	result: AddMemberResult
}

interface SubmitAvatarRequest extends FormData {}

/**
 ** 0: success
 ** 1: wrong credential
 */
enum AuthenticationResult {
	Success,
	WrongCredential,
}
enum AddMemberResult {
	Success,
	UsernameExists,
	Error,
}

export { AuthenticationResult, AddMemberResult }
export type {
	UserLoginRequest,
	UserDetail,
	OutputAuthentication,
	UserLoginResponse,
	AddMemberRequest,
	AddMemberResponse,
	SubmitAvatarRequest,
}
