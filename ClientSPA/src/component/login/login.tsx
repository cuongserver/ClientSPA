import React from 'react'
import {
	Card,
	TextField,
	Button,
	Link,
	Divider,
	Avatar,
	Typography,
	InputLabel,
} from '@material-ui/core'
import 'component/login/login.scss'
import { WithTranslation, withTranslation } from 'react-i18next'
import background from 'asset/image/login-background.jpg'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as LocaleStore from 'store/locale'
const classList = {
	root: 'login-card flex-col-c-m p-l-10 p-r-10',
}

// const usernameInputProps: InputProps = {
// 	startAdornment: (
// 		<InputAdornment position="start">
// 			<AccountCircle />
// 		</InputAdornment>
// 	),
// }
interface IComponentProps extends WithTranslation {
	currentLang: string
	changeLanguage: (lang: string) => void
}

class Login extends React.PureComponent<IComponentProps> {
	changeLanguage = (e: React.MouseEvent): void => {
		const target = e.currentTarget
		const newLang = target.getAttribute('alt') as string
		this.props.changeLanguage(newLang)
	}

	render() {
		const { t } = this.props
		return (
			<React.Fragment>
				<div
					className="no-margin-collapse sizefull flex-col-c-m"
					style={{
						background: `url("${background}") no-repeat fixed center`,
					}}
				>
					<Card classes={classList} raised>
						<TextField
							id="login-username"
							label={t('login-label-username')}
							variant="outlined"
							fullWidth
							size="small"
						/>
						<div className="m-b-20"></div>
						<TextField
							id="login-password"
							label={t('login-label-password')}
							variant="outlined"
							fullWidth
							size="small"
						/>
						<div className="m-b-20"></div>
						<Button variant="contained" color="primary" size="large" fullWidth>
							{t('login-label-login-command')}
						</Button>
						<div className="m-b-10"></div>
						<Typography color="secondary">
							<Link color="inherit" underline="hover" className="hov-pointer">
								{t('login-label-forgotpassword')}
							</Link>
						</Typography>

						<div className="m-b-10"></div>
						<Divider orientation="horizontal" className="w-full" />
						<div className="m-b-70"></div>
						<Typography color="secondary">
							<InputLabel>{t('login-label-available-language')}</InputLabel>
						</Typography>
						<div className="dis-flex p-t-15">
							<img
								alt="en"
								src="/image/flag/uk.png"
								onClick={this.changeLanguage}
								height="32px"
								width="32px"
							/>
							<div className="m-l-5 m-r-5"></div>
							<img
								alt="vi"
								src="/image/flag/vietnam.png"
								onClick={this.changeLanguage}
								height="32px"
								width="32px"
							/>
						</div>
					</Card>
				</div>
			</React.Fragment>
		)
	}
}

const LoginWithTranslation = withTranslation()(Login)

const mapStateToProps = (state: LocaleStore.IState) => ({
	currentLang: state.currentLang,
})
const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		changeLanguage: (lang: string) =>
			dispatch({ type: 'CHANGE_LANGUAGE', payload: lang }),
	}
}

const LoginWithStore = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginWithTranslation)
const LoginHoc = () => {
	return (
		<React.Suspense fallback="">
			<LoginWithStore />
		</React.Suspense>
	)
}

export default LoginHoc
