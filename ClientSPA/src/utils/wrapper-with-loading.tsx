import * as React from 'react'
import { LoadingProps } from 'types/common'
import { CircularProgress } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export class WrapperWithLoading extends React.PureComponent<
	LoadingProps & React.HTMLAttributes<HTMLElement> & { progressColor?: string }
> {
	render() {
		const CustomCircularProgress = styled(CircularProgress)({
			color: this.props.progressColor ?? 'primary',
		})
		let Wrapper = (
			props: Readonly<{ children?: React.ReactNode }>
		): JSX.Element => (
			<div className={this.props.className} style={this.props.style}>
				{props.children}
			</div>
		)

		if (this.props.className === undefined && this.props.style === undefined)
			Wrapper = (
				props: Readonly<{ children?: React.ReactNode }>
			): JSX.Element => (
				<div style={{ position: 'relative' }}>{props.children}</div>
			)
		return (
			<Wrapper>
				{this.props.loading && (
					<div
						style={{
							position: 'absolute',
							background: 'rgba(247, 247, 247, 0.7)',
							zIndex: 2000,
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<CustomCircularProgress
							variant="indeterminate"
							style={{
								position: 'relative',
							}}
						></CustomCircularProgress>
					</div>
				)}

				{this.props.children}
			</Wrapper>
		)
	}
}
