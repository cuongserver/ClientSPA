import { Button, Card, CardContent, CardHeader, Checkbox, TextField } from '@material-ui/core'
import { RootContext } from 'context/app-context-dom'
import { RoleApiHandler } from 'http/api-handlers/role-api-handler'
import _ from 'lodash'
import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Formik, FormikProps, yupToFormErrors } from 'formik'
import * as yup from 'yup'
import { AxiosError } from 'axios'

interface IProps extends WithTranslation {}
interface IState {
	availablePermissions: { [key: string]: string[] }
	selectedPermissions: { [key: string]: boolean }
}

interface IFormData {
	name: string
	claims: string[]
}
const schema = yup.object().shape({
	name: yup.string().required('common-error-required'),
	claims: yup.array().min(1, 'common-error-required'),
})

class RoleAdd_Root extends React.PureComponent<IProps, IState> {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>
	defaultFormData: IFormData = {
		name: '',
		claims: [],
	}
	validator: React.RefObject<FormikProps<IFormData>> = React.createRef()
	constructor(props: IProps) {
		super(props)
		this.state = {
			availablePermissions: {},
			selectedPermissions: {},
		}
	}
	componentDidMount() {
		const ctx = this.context!
		const apiHandler = new RoleApiHandler()
		apiHandler
			.setHeader({ Authorization: ctx.auth.jwToken })
			.getAllPermissionsForCreate()
			.subscribe({
				next: (res) => {
					this.setState((prevState) => {
						let newState = _.cloneDeep<IState>(prevState)
						newState.availablePermissions = res
						return newState
					})
				},
			})
	}

	render() {
		const { t } = this.props
		return (
			<div>
				<Formik
					validateOnChange={false}
					validateOnBlur={false}
					initialValues={this.defaultFormData}
					validationSchema={schema}
					onSubmit={() => {}}
					innerRef={this.validator}
				>
					{(formikProps: FormikProps<IFormData>) => {
						const { values, errors } = formikProps
						return (
							<React.Fragment>
								<TextField
									variant="outlined"
									size="small"
									label={t('common-name')}
									id="RoleAddPage_roleName"
									helperText={!_.isEmpty(errors.name) ? t(errors.name!) : ' '}
									error={!_.isEmpty(errors.name)}
									value={values.name}
									name="name"
									onChange={this.handleChangeInput}
								></TextField>
								<div className="MuiFormHelperText-root Mui-error">
									{!_.isEmpty(errors.claims) ? t(errors.claims!) : ' '}
								</div>
								{Object.keys(this.state.availablePermissions).map((key) => (
									<React.Fragment key={key}>
										{this.renderPermissionGroup(key, this.state.availablePermissions[key])}
									</React.Fragment>
								))}
								<div>
									<Button variant="contained" color="primary" onClick={this.handleSubmit}>
										Submit
									</Button>
								</div>
								{JSON.stringify(values)}
							</React.Fragment>
						)
					}}
				</Formik>
			</div>
		)
	}
	renderPermissionGroup = (groupName: string, options: string[]) => {
		return (
			<Card raised className="m-t-5 m-b-5">
				<CardHeader title={groupName}></CardHeader>
				<CardContent className="flex-w">
					{options.map((option) => (
						<div key={option}>
							<Checkbox size="small" value={option} onChange={this.handleChangeCheckbox} /> {option}
						</div>
					))}
				</CardContent>
			</Card>
		)
	}
	handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		const value = event.target.value
		const form = this.validator.current!
		let claims = _.cloneDeep(form.values.claims)
		if (checked) {
			claims.push(value)
		} else {
			claims = _.reject(claims, (claim) => claim == value)
		}
		const errors = { ...form.errors }
		const path = 'claims'
		_.set(errors, path, undefined)
		form.setErrors(errors)
		form.setValues({ ...form.values, claims: claims })
	}

	handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const form = this.validator.current!
		const target = e.currentTarget
		const path = target.name
		const errors = { ...form.errors }
		_.set(errors, path, undefined)
		form.setErrors(errors)
		form.handleChange(e)
	}

	validateForm = async () => {
		const form = this.validator.current!
		try {
			await schema.validate(form.values, {
				abortEarly: false,
			})
			return true
		} catch (errors) {
			form.setErrors(yupToFormErrors(errors))
			return false
		}
	}
	handleSubmit = async () => {
		const ctx = this.context!
		const isValid = await this.validateForm()
		const form = this.validator.current!
		if (!isValid) return
		const apiHandler = new RoleApiHandler()
		apiHandler
			.setHeader({ Authorization: ctx.auth.jwToken })
			.createOrEditRole({
				...form.values,
			})
			.subscribe({
				next: (res) => {
					console.log(res.id)
				},
				error: (err: AxiosError) => {
					console.log(err.code)
				},
			})
	}
}

const RoleAdd = withTranslation(undefined, { withRef: true })(RoleAdd_Root)
export { RoleAdd }
