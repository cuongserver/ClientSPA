const routes = {
	home: '/editor-portal',
	addMember: '/editor-portal/members/add',
	editMemberInfo: '/edit-member-info',
	login: '/editor-portal/login',
}

const breadcrumbNameMap: { [key: string]: string } = {}

breadcrumbNameMap[routes.home] = 'main-breadcrumbs-pathname-home'
breadcrumbNameMap[routes.addMember] = 'main-breadcrumbs-pathname-addmember'
breadcrumbNameMap[routes.editMemberInfo] =
	'main-breadcrumbs-pathname-editmember'

export { routes, breadcrumbNameMap }
