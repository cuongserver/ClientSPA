import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { WithTranslation, withTranslation } from 'react-i18next'
import * as yup from 'yup'
import _ from 'lodash'
import {
	Formik,
	FormikProps,
	FieldArray,
	FormikErrors,
	yupToFormErrors,
} from 'formik'

interface IProps extends WithTranslation {}

interface IState {
	formData: IFormData
	formValidationErrors: yup.ValidationError[]
}
interface Extra {
	extraValue: string
	enabled: boolean
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
	email: yup.string().required('addmember-error-email-required').min(3, 'def'),
	extra: yup.array().of(
		yup.object().shape({
			extraValue: yup
				.string()
				.required('abc')
				.min(3, 'xyz')
				.test('unique', 'not unique', (value, context) => {
					if (_.isEmpty(value)) return true
					const list = context.options.context as Extra[]
					return list.filter((extra) => extra.extraValue === value).length <= 1
				}),
		})
	),
})

class AddMemberOrigin extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props)
		this.state = {
			formData: initFormData,
			formValidationErrors: [],
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
		const newFormData = _.cloneDeep(this.state.formData)
		_.set(newFormData, path, target.value)
		this.setState(
			{
				formData: newFormData,
			},
			async () => {
				const valRes = await this.validateFormAt(path, this.state.formData)
				const currentErrors = [...this.state.formValidationErrors].filter(
					(error) => error.path !== path
				)
				let errors: yup.ValidationError[] = [...currentErrors]
				if (valRes) errors = currentErrors.concat(valRes.inner)
				this.setState({
					formValidationErrors: errors,
				})
			}
		)
	}

	addExtra = () => {
		const newExtra = _.cloneDeep(this.state.formData.extra)
		newExtra.push({ extraValue: '', enabled: true })
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
		newExtra[parseInt(idx)].enabled = false
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
			return formValidationErrors.find((error) => error.path === path)
		}
	}

	get errorByPath2() {
		return (obj: FormikErrors<IFormData>, path: string) => {
			return _.get(obj, path)
		}
	}

	validateData = () => {}
	render() {
		const { t } = this.props
		// return (
		// 	<React.Fragment>
		// 		<TextField
		// 			id="login-username"
		// 			label={t('addmember-label-email')}
		// 			variant="outlined"
		// 			fullWidth={false}
		// 			size="small"
		// 			name="email"
		// 			value={formData.email}
		// 			onChange={this.formHandleChange}
		// 			helperText={
		// 				this.errorByPath('email') !== undefined
		// 					? t(this.errorByPath('email')!.message!)
		// 					: ' '
		// 			}
		// 			FormHelperTextProps={{
		// 				className: 'p-b-5',
		// 				error: true,
		// 			}}
		// 			error={this.errorByPath('email') !== undefined}
		// 		/>
		// 		<React.Fragment>
		// 			{formData.extra.length > 0 &&
		// 				formData.extra.map((val, idx) => {
		// 					return (
		// 						val.enabled && (
		// 							<div key={idx}>
		// 								<TextField
		// 									label="extra"
		// 									variant="outlined"
		// 									fullWidth={false}
		// 									size="small"
		// 									name={`extra[${idx}].extraValue`}
		// 									onChange={this.formHandleChange}
		// 									value={val.extraValue}
		// 									helperText={
		// 										this.errorByPath(`extra[${idx}].extraValue`) !==
		// 										undefined
		// 											? t(
		// 													this.errorByPath(`extra[${idx}].extraValue`)!
		// 														.message!
		// 											  )
		// 											: ' '
		// 									}
		// 									FormHelperTextProps={{
		// 										className: 'p-b-5',
		// 										error: true,
		// 									}}
		// 									error={
		// 										this.errorByPath(`extra[${idx}].extraValue`) !==
		// 										undefined
		// 									}
		// 								/>
		// 								<Button
		// 									data-index={idx}
		// 									onClick={this.removeExtra}
		// 									variant="contained"
		// 									color="primary"
		// 								>
		// 									Remove
		// 								</Button>
		// 								{idx}
		// 							</div>
		// 						)
		// 					)
		// 				})}
		// 		</React.Fragment>
		// 		<button onClick={this.addExtra}>Add more</button>
		// 		{JSON.stringify(formValidationErrors)}
		// 	</React.Fragment>
		//)
		return (
			<Formik
				initialValues={initFormData}
				enableReinitialize={true}
				validateOnChange={false}
				validateOnMount={false}
				validationSchema={schema}
				/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
				onSubmit={(values, helpers) => {}}
			>
				{(props: FormikProps<IFormData>) => {
					const { errors, values, handleChange, setErrors } = props
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
								onChange={(e) => {
									const err = { ...errors }
									_.set(err, e.currentTarget.name, undefined)
									handleChange(e)
									setErrors(err)
								}}
								helperText={!_.isEmpty(errors.email) ? t(errors.email!) : ' '}
								FormHelperTextProps={{
									className: 'p-b-5',
									error: true,
								}}
								error={!_.isEmpty(errors.email)}
							/>
							{/*
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
													name={`extra.${idx}.extraValue`}
													onChange={handleChange}
													value={val.extraValue}
													// helperText={
													// 	errors.extra !== undefined &&
													// 	errors.extra[idx] !== undefined
													// 		? errors.extra[idx]
													// 		: ' '
													// }
													FormHelperTextProps={{
														className: 'p-b-5',
														error: true,
													}}
												/>
												<Button
													data-index={idx}
													onClick={() => {
														values.extra.splice(idx, 1)
													}}
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
							<button
								onClick={() => {
									values.extra.push({
										extraValue: '',
										enabled: true,
									})
								}}
							>
								Add more
							</button>
							{JSON.stringify(values)}
							*/}
							<FieldArray name="extra">
								{(arrayHelpers) => {
									const { push, remove } = arrayHelpers
									return (
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
																name={`extra[${idx}].extraValue`}
																onChange={(e) => {
																	const err = { ...errors }
																	_.set(err, e.currentTarget.name, undefined)
																	handleChange(e)
																	setErrors(err)
																}}
																value={val.extraValue}
																helperText={
																	!_.isEmpty(errors.extra) &&
																	!_.isEmpty(errors.extra![idx])
																		? _.get(errors, `extra[${idx}].extraValue`)
																		: ' '
																}
																FormHelperTextProps={{
																	className: 'p-b-5',
																	error: true,
																}}
																error={
																	!_.isEmpty(errors.extra) &&
																	!_.isEmpty(errors.extra![idx])
																}
															/>
															<Button
																data-index={idx}
																onClick={() => {
																	remove(idx)
																}}
																variant="contained"
																color="primary"
															>
																Remove
															</Button>
															{idx}
														</div>
													)
												})}
											<button
												onClick={() => {
													push({
														extraValue: '',
														enabled: true,
													})
												}}
											>
												Add more
											</button>
											<pre>{JSON.stringify(values)}</pre>
											<pre>{JSON.stringify(errors)}</pre>
											<button
												onClick={() => {
													// try {
													// 	await validateYupSchema(
													// 		values,
													// 		schema,
													// 		false,
													// 		values.extra
													// 	)
													// 	return undefined
													// } catch (e) {
													// 	props.setErrors(e)
													// }
													schema
														.validate(values, {
															abortEarly: false,
															context: values.extra,
														})
														.catch((err) => {
															props.setErrors(yupToFormErrors(err))
														})
												}}
											>
												Validate
											</button>
										</React.Fragment>
									)
								}}
							</FieldArray>
						</React.Fragment>
					)
				}}
			</Formik>
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
