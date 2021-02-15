const routes = {
	home: '/editor-portal',
	login: '/editor-portal/login',
	forgotPassword: '/editor-portal/forgot-password',
	default: '/',
	roleList: '/editor-portal/roles',
	roleAdd: '/editor-portal/roles/add',
	roleDetails: '/editor-portal/roles/:roleId',
}

const breadcrumbPathnameMap: { [key: string]: string } = {}

breadcrumbPathnameMap[routes.home] = 'portal-breadcrumbs-home'
breadcrumbPathnameMap[routes.roleList] = 'portal-breadcrumbs-role'
breadcrumbPathnameMap[routes.roleAdd] = 'portal-breadcrumbs-role-add'
export { routes, breadcrumbPathnameMap }
