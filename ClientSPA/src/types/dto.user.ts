interface UserLoginRequest {
	username: string
	password: string
}

interface UserDetail {
	id: string
	username: string
	accessRights: string[]
}

interface OutputAuthentication {
	userDetail: UserDetail
	result: AuthenticationResult
}

interface UserLoginResponse extends OutputAuthentication {
	token: string
}
/** 
 ** 0: success
 ** 1: wrong credential
 */
type AuthenticationResult = 0 | 1

export type { UserLoginRequest, UserDetail, OutputAuthentication, UserLoginResponse, AuthenticationResult }