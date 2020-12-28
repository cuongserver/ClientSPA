const routes = {
	home: '/',
	addMember: '/add-member'
}
const breadcrumbNameMap: { [key: string]: string } = {

}

breadcrumbNameMap[routes.home] = 'main-breadcrumbs-pathname-home'
breadcrumbNameMap[routes.addMember] = 'main-breadcrumbs-pathname-addmember'
export { routes, breadcrumbNameMap }