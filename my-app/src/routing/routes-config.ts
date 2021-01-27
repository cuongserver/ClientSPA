const routes = {
	home: '/',
	addMember: '/add-member',
	editMemberInfo: '/edit-member-info',
}

const breadcrumbNameMap: { [key: string]: string } = {}

breadcrumbNameMap[routes.home] = 'main-breadcrumbs-pathname-home'
breadcrumbNameMap[routes.addMember] = 'main-breadcrumbs-pathname-addmember'
breadcrumbNameMap[routes.editMemberInfo] =
	'main-breadcrumbs-pathname-editmember'

export { routes, breadcrumbNameMap }
