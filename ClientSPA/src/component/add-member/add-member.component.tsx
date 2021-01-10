import React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Formik, FormikProps, yupToFormErrors } from 'formik'
import {
	Button,
	TextField,
	TextFieldProps,
	InputAdornment,
	IconButton,
	InputProps,
} from '@material-ui/core'
import _ from 'lodash'
import * as yup from 'yup'
import { Visibility, VisibilityOff } from '@material-ui/icons'

interface IFormData {
	userName: string
	password: string
	confirmPassword: string
}

interface IProps extends WithTranslation {}
type IState = {
	[key in keyof IFormData]: boolean
}

const initFormData: IFormData = {
	userName: '',
	password: '',
	confirmPassword: '',
}

const schema = yup.object().shape({
	userName: yup
		.string()
		.required('addmember-error-username-required')
		.matches(
			new RegExp('^[a-zA-Z0-9]{3,10}$'),
			'addmember-error-username-invalid'
		),
	password: yup.string().required('addmember-error-password-required'),
	confirmPassword: yup.string().when('password', {
		is: (val: string) => !_.isEmpty(val),
		then: yup
			.string()
			.oneOf(
				[yup.ref('password'), null],
				'addmember-error-password-cfm-unmatched'
			),
	}),
})

class AddMember_Origin extends React.PureComponent<IProps, IState> {
	validator: React.RefObject<FormikProps<IFormData>> = React.createRef()

	constructor(props: IProps) {
		super(props)
		this.state = {
			userName: false,
			password: false,
			confirmPassword: false,
		}
	}
	formHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const form = this.validator.current!
		const target = e.currentTarget
		const path = target.name
		const errors = { ...form.errors }
		_.set(errors, path, undefined)
		form.setErrors(errors)
		form.handleChange(e)
	}

	formHandleSubmit = () => {
		const form = this.validator.current!
		schema
			.validate(form.values, {
				abortEarly: false,
			})
			.catch((errors) => {
				form.setErrors(yupToFormErrors(errors))
			})
	}

	handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		const target = event.currentTarget
		const idx = target.getAttribute('data-index') as keyof IState
		this.setState({
			...this.state,
			[idx]: !this.state[idx],
		})
	}

	render() {
		const { t } = this.props
		const commonTextFieldProps: TextFieldProps = {
			variant: 'outlined',
			size: 'small',
			onChange: this.formHandleChange,
			FormHelperTextProps: {
				className: 'p-b-5',
				error: true,
			},
		}
		return (
			<Formik
				innerRef={this.validator}
				validateOnChange={false}
				validateOnBlur={false}
				initialValues={initFormData}
				validationSchema={schema}
				onSubmit={() => {}}
			>
				{(formikProps: FormikProps<IFormData>) => {
					const { values, errors } = formikProps
					return (
						<React.Fragment>
							<div>
								<TextField
									{...commonTextFieldProps}
									id="addMember_Username"
									label={t('addmember-label-username')}
									name="userName"
									value={values.userName}
									error={!_.isEmpty(errors.userName)}
									helperText={
										!_.isEmpty(errors.userName) ? t(errors.userName!) : ' '
									}
								/>
							</div>
							<div>
								<TextField
									{...commonTextFieldProps}
									id="addMember_Password"
									label={t('addmember-label-password')}
									name="password"
									value={values.password}
									error={!_.isEmpty(errors.password)}
									helperText={
										!_.isEmpty(errors.password) ? t(errors.password!) : ' '
									}
									InputProps={this.inputAdornment('password')}
								/>
							</div>
							<div>
								<TextField
									{...commonTextFieldProps}
									id="addMember_ConfirmPassword"
									label={t('addmember-label-password-cfm')}
									name="confirmPassword"
									value={values.confirmPassword}
									error={!_.isEmpty(errors.confirmPassword)}
									helperText={
										!_.isEmpty(errors.confirmPassword)
											? t(errors.confirmPassword!)
											: ' '
									}
									InputProps={this.inputAdornment('confirmPassword')}
								/>
							</div>
							<div>
								<Button
									variant="contained"
									color="primary"
									onClick={this.formHandleSubmit}
								>
									{t('addmember-label-create-button')}
								</Button>
							</div>
						</React.Fragment>
					)
				}}
			</Formik>
		)
	}

	inputAdornment = (name: keyof IState): InputProps => {
		return {
			endAdornment: (
				<InputAdornment position="end">
					<IconButton
						onClick={this.handleClickShowPassword}
						onMouseDown={this.handleMouseDownPassword}
						data-index={name}
					>
						{(this.state[name] as boolean) ? <Visibility /> : <VisibilityOff />}
					</IconButton>
				</InputAdornment>
			),
			type: this.state[name] ? undefined : 'password',
		}
	}
}
const AddMember = withTranslation(undefined, { withRef: true })(
	AddMember_Origin
)
export default AddMember
