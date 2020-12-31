import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { WithTranslation, withTranslation } from 'react-i18next'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Formik, FormikProps, FormikErrors, FieldArray } from 'formik'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GenericObject } from 'types/common'

interface IProps extends WithTranslation {}

interface IState {}

const initFormData: IFormData = {
	email: '',
	password: '',
	passwordConfirm: '',
	name: '',
	extra: [],
}

interface IFormData {
	email: string
	password: string
	passwordConfirm: string
	name: string
	extra: string[]
}

class AddMemberOrigin extends React.PureComponent<IProps, IState> {
	formValidator: React.RefObject<FormikProps<IFormData>>

	constructor(props: IProps) {
		super(props)
		this.formValidator = React.createRef()
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	validateForm = (values: IFormData): Promise<FormikErrors<IFormData>> => {
		let err: FormikErrors<IFormData> = {}

		if (values.email === '' || values.email === null)
			err.email = 'addmember-error-email-required'
		let extraErrs = values.extra.map(() => '')
		values.extra.forEach((val, idx) => {
			if (val === '' || val === null) extraErrs[idx] = idx.toString()
		})
		err.extra = extraErrs
		return Promise.resolve(err)
	}

	formHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//const target = e.target
		const validator = this.formValidator
		// if (
		// 	validator.current?.errors &&
		// 	(validator.current?.errors as GenericObject)[target.name]
		// ) {
		// 	const err = validator.current?.errors as GenericObject
		// 	validator.current?.setErrors({
		// 		...err,
		// 		[target.name]: undefined,
		// 	})
		// }
		validator.current?.handleChange(e)
	}
	get validator() {
		return this.formValidator.current!
	}
	addExtra = (props: FormikProps<IFormData>) => {
		const newExtra = [...props.values.extra]
		newExtra.push('')
		props.setValues({
			...props.values,
			extra: newExtra,
		})
	}

	removeExtra = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const target = e.target! as HTMLElement
		const idx = target.getAttribute('data-index')!
		const newExtra = [...this.validator.values.extra]
		newExtra.splice(parseInt(idx), 1)
		this.validator.setValues({
			...this.validator.values,
			extra: newExtra,
		})
	}

	render() {
		const { t } = this.props
		return (
			<Formik
				initialValues={initFormData}
				onSubmit={(values, actions) => console.log({ values, actions })}
				validate={this.validateForm}
				innerRef={this.formValidator}
				validateOnChange={true}
				validateOnMount={false}
			>
				{(props: FormikProps<IFormData>) => {
					const { errors, values } = props
					return (
						<React.Fragment>
							<TextField
								id="login-username"
								label={t('addmember-label-email')}
								variant="outlined"
								fullWidth={false}
								size="small"
								name="email"
								value={values.email}
								onChange={this.formHandleChange}
								helperText={errors.email !== undefined ? t(errors.email) : ' '}
								FormHelperTextProps={{
									className: 'p-b-5',
									error: true,
								}}
								error={errors.email !== undefined}
							/>
							<React.Fragment>
								{values.extra.length > 0 &&
									values.extra.map((val, idx) => {
										return (
											<div key={idx}>
												<TextField
													label="extra"
													variant="outlined"
													fullWidth={false}
													size="small"
													name={`extra[${idx}]`}
													onChange={this.formHandleChange}
													value={val}
													helperText={
														errors.extra !== undefined &&
														errors.extra[idx] !== undefined
															? errors.extra[idx]
															: ' '
													}
													FormHelperTextProps={{
														className: 'p-b-5',
														error: true,
													}}
												/>
												<Button
													data-index={idx}
													onClick={this.removeExtra}
													variant="contained"
													color="primary"
												>
													Remove
												</Button>
												{idx}
											</div>
										)
									})}
							</React.Fragment>
							<button onClick={() => this.addExtra(props)}>Add more</button>
							{JSON.stringify(errors)}
						</React.Fragment>
					)
				}}
			</Formik>
		)
	}
}

const AddMember = withTranslation(undefined, { withRef: true })(AddMemberOrigin)
export default AddMember
