/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
	createStyles,
	withStyles,
	WithStyles,
	Theme,
} from '@material-ui/core/styles'

const styles = ({ spacing, palette }: Theme) =>
	createStyles({
		root: {
			backgroundColor: palette.grey[200],
			padding: spacing(1, 2, 1, 2),
		},
	})

interface IBlockquoteProps extends WithStyles<typeof styles> {
	children?: React.ReactNode
}

class CodeBlock extends React.PureComponent<IBlockquoteProps> {
	render() {
		const props = this.props
		return <div className={props.classes.root}>{props.children}</div>
	}
}

export default withStyles(styles, { withTheme: true })(CodeBlock)
