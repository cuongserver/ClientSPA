export interface RoleListResponse {
	roles: Role[]
}

export interface Role {
	id: string
	name: string
}

export interface RoleCreateOrEditRequest {
	id?: string
	name: string
	claims: string[]
}

export interface RoleCreateOrEditResponse {
	id: string
	result: string
}

export interface RoleDetailsResponse {
	id: string | null
	name: string | null
	claims: { [key: string]: string[] } | null
}
