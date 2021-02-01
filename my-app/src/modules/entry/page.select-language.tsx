import { Link, Typography, Avatar } from '@material-ui/core'
import { RootContext } from 'context/app-context-dom'
import React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import uk from 'assets/images/flags/uk.png'
import vi from 'assets/images/flags/vietnam.png'

interface IProps extends WithTranslation {}
class SelectLanguage_Root extends React.PureComponent<IProps> {
	static contextType = RootContext
	context!: React.ContextType<typeof RootContext>

	handleClick = (e: React.MouseEvent) => {
		const target = e.currentTarget
		const lang = target.getAttribute('data-language') as string
		this.context?.i18n.changeLang(lang)
	}

	render() {
		const { t } = this.props
		const ctx = this.context!
		return (
			<div>
				<Typography
					align="center"
					color="textSecondary"
					component="div"
					className="flex-c-m"
					paragraph
				>
					{t('login-label-availableLanguage')}: &nbsp; &nbsp;&nbsp; &nbsp;
					<Avatar
						src={vi}
						data-language="vi"
						className="hov-pointer"
						title="vi"
						onClick={this.handleClick}
					></Avatar>
					&nbsp; &nbsp;
					<Avatar
						src={uk}
						data-language="en"
						className="hov-pointer"
						title="en"
						onClick={this.handleClick}
					></Avatar>
				</Typography>

				<Typography
					align="center"
					variant="caption"
					component="p"
					color="textSecondary"
				>
					<Link
						className="hov-pointer"
						onClick={() => ctx.entryModule.switchScreenChannel.next('default')}
						color="inherit"
					>
						{t('login-label-backToLogin')}
					</Link>
				</Typography>
			</div>
		)
	}
}

const WithTrans = withTranslation(undefined, { withRef: true })(
	SelectLanguage_Root
)

export { WithTrans as SelectLanguage }
