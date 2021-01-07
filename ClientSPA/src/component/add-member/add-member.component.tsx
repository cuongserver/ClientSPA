import React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Formik, FormikProps, yupToFormErrors } from 'formik'
import { Button, TextField, TextFieldProps } from '@material-ui/core'
import _ from 'lodash'
import * as yup from 'yup'

interface IFormData {
	email: string
	password: string
	confirmPassword: string
}

interface IProps extends WithTranslation {}

const initFormData: IFormData = {
	email: '',
	password: '',
	confirmPassword: '',
}

const schema = yup.object().shape({
	email: yup
		.string()
		.required('addmember-error-email-required')
		.email('addmember-error-email-invalid'),
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

class AddMember_Origin extends React.PureComponent<IProps> {
	validator: React.RefObject<FormikProps<IFormData>> = React.createRef()

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
									id="addMember_Email"
									label={t('addmember-label-email')}
									name="email"
									value={values.email}
									error={!_.isEmpty(errors.email)}
									helperText={!_.isEmpty(errors.email) ? t(errors.email!) : ' '}
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
}
const AddMember = withTranslation(undefined, { withRef: true })(
	AddMember_Origin
)
export default AddMember
