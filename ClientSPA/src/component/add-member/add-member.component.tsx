import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { WithTranslation, withTranslation } from 'react-i18next'
import { Formik, FormikProps, FormikErrors } from 'formik'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GenericObject } from 'types/common'
import * as yup from 'yup'
import _ from 'lodash'

interface IProps extends WithTranslation {}

interface IState {
	formData: IFormData
	formValidationErrors?: yup.ValidationError
}
interface Extra {
	extraValue: string
}
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
	extra: Extra[]
}

const schema = yup.object().shape({
	email: yup
		.string()
		.required('addmember-error-email-required')
		.min(1, 'addmember-error-email-required'),
	extra: yup.array().of(
		yup.object().shape({
			extraValue: yup.string().required('abc').min(1, 'abc'),
		})
	),
})

class AddMemberOrigin extends React.PureComponent<IProps, IState> {
	formValidator: React.RefObject<FormikProps<IFormData>> = React.createRef()

	constructor(props: IProps) {
		super(props)
		this.state = {
			formData: initFormData,
			formValidationErrors: undefined,
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	validateForm = async (
		values: IFormData
	): Promise<yup.ValidationError | undefined> => {
		// if (values.email === '' || values.email === null)
		// 	err.email = 'addmember-error-email-required'
		// let extraErrs = values.extra.map(() => '')
		// values.extra.forEach((val, idx) => {
		// 	if (val === '' || val === null) extraErrs[idx] = idx.toString()
		// })
		// err.extra = extraErrs

		try {
			await schema.validate(values, {
				abortEarly: false,
				stripUnknown: true,
			})
			return undefined
		} catch (e) {
			return e
		}
	}

	validateFormAt = async (
		path: string,
		values: IFormData
	): Promise<yup.ValidationError | undefined> => {
		try {
			await schema.validateAt(path, values, {
				abortEarly: false,
				stripUnknown: true,
			})
			return undefined
		} catch (e) {
			return e
		}
	}

	formHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget
		const path = target.name
		//const validator = this.formValidator
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
		//validator.current?.handleChange(e)

		const newFormData = _.cloneDeep(this.state.formData)
		_.set(newFormData, path, target.value)
		this.setState(
			{
				formData: newFormData,
			},
			async () => {
				const valRes = await this.validateForm(this.state.formData)
				console.log(
					JSON.stringify(await this.validateFormAt(path, this.state.formData))
				)
				this.setState({
					formValidationErrors: valRes,
				})
			}
		)
	}
	get validator() {
		return this.formValidator.current!
	}
	addExtra = () => {
		const newExtra = _.cloneDeep(this.state.formData.extra)
		newExtra.push({ extraValue: '' })
		this.setState({
			formData: {
				...this.state.formData,
				extra: newExtra,
			},
		})
	}

	removeExtra = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const target = e.currentTarget! as HTMLElement
		const idx = target.getAttribute('data-index')!
		const newExtra = _.cloneDeep(this.state.formData.extra)
		newExtra.splice(parseInt(idx), 1)
		this.setState({
			formData: {
				...this.state.formData,
				extra: newExtra,
			},
		})
	}

	get errorByPath() {
		const { formValidationErrors } = this.state
		return (path: string) => {
			return formValidationErrors?.inner.find((error) => error.path === path)
		}
	}

	render() {
		const { t } = this.props
		const { formData, formValidationErrors } = this.state
		return (
			<React.Fragment>
				<TextField
					id="login-username"
					label={t('addmember-label-email')}
					variant="outlined"
					fullWidth={false}
					size="small"
					name="email"
					value={formData.email}
					onChange={this.formHandleChange}
					helperText={
						this.errorByPath('email') !== undefined
							? t(this.errorByPath('email')!.message!)
							: ' '
					}
					FormHelperTextProps={{
						className: 'p-b-5',
						error: true,
					}}
					error={this.errorByPath('email') !== undefined}
				/>
				<React.Fragment>
					{formData.extra.length > 0 &&
						formData.extra.map((val, idx) => {
							return (
								<div key={idx}>
									<TextField
										label="extra"
										variant="outlined"
										fullWidth={false}
										size="small"
										name={`extra[${idx}].extraValue`}
										onChange={this.formHandleChange}
										value={val.extraValue}
										helperText={
											this.errorByPath(`extra[${idx}].extraValue`) !== undefined
												? t(
														this.errorByPath(`extra[${idx}].extraValue`)!
															.message!
												  )
												: ' '
										}
										FormHelperTextProps={{
											className: 'p-b-5',
											error: true,
										}}
										error={
											this.errorByPath(`extra[${idx}].extraValue`) !== undefined
										}
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
				<button onClick={this.addExtra}>Add more</button>
				{JSON.stringify(formValidationErrors)}
			</React.Fragment>
		)
	}
}

const AddMember = withTranslation(undefined, { withRef: true })(AddMemberOrigin)
export default AddMember

{
	/* <Formik
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
													name={`extra.extraValue[${idx}]`}
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
							{JSON.stringify(values)}
						</React.Fragment>
					)
				}}
			</Formik> */
}
