/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Popover from '@material-ui/core/Popover'
import TextField from '@material-ui/core/TextField'
import {
	createStyles,
	withStyles,
	WithStyles,
	Theme,
} from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import MovieIcon from '@material-ui/icons/Movie'
import CheckIcon from '@material-ui/icons/Check'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter'
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft'
import FormatAlignRight from '@material-ui/icons/FormatAlignRight'

export type TAlignment = 'left' | 'center' | 'right'

export type TMediaType = 'image' | 'video'

export type TUrlData = {
	url?: string
	width?: number
	height?: number
	alignment?: TAlignment
	type?: TMediaType
}

interface IUrlPopoverStateProps extends WithStyles<typeof styles> {
	anchor?: HTMLElement
	data?: TUrlData
	isMedia?: boolean
	onConfirm: (isMedia?: boolean, ...args: any) => void
}

const styles = ({ spacing }: Theme) =>
	createStyles({
		linkPopover: {
			padding: spacing(2, 2, 2, 2),
			maxWidth: 250,
		},
		linkTextField: {
			width: '100%',
		},
	})

type IUrlPopoverState = {
	data: TUrlData
}
class UrlPopover extends React.PureComponent<
	IUrlPopoverStateProps,
	IUrlPopoverState
> {
	constructor(props: IUrlPopoverStateProps) {
		super(props)
		this.state = {
			data: props.data || {
				url: undefined,
				width: undefined,
				height: undefined,
				alignment: undefined,
				type: undefined,
			},
		}
	}

	onSizeChange = (value: any, prop: 'width' | 'height') => {
		if (value === '') {
			this.setState({ data: { ...this.state.data, [prop]: undefined } })
			return
		}
		const intValue = parseInt(value, 10)
		if (isNaN(intValue)) {
			return
		}
		this.setState({ data: { ...this.state.data, [prop]: intValue } })
	}

	render() {
		const props = this.props
		const { classes } = props

		return (
			<Popover
				open={props.anchor !== undefined}
				anchorEl={props.anchor}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<div className={classes.linkPopover}>
					<Grid container spacing={1}>
						<Grid container item xs spacing={1}>
							<Grid item xs={12}>
								<TextField
									className={classes.linkTextField}
									onChange={(event) =>
										this.setState({
											data: { ...this.state.data, url: event.target.value },
										})
									}
									label="URL"
									defaultValue={props.data && props.data.url}
									autoFocus={true}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>
							{props.isMedia ? (
								<>
									<Grid item xs={12}>
										<ButtonGroup fullWidth>
											<Button
												color={
													!this.state.data.type ||
													this.state.data.type === 'image'
														? 'primary'
														: 'default'
												}
												size="small"
												onClick={() =>
													this.setState({
														data: { ...this.state.data, type: 'image' },
													})
												}
											>
												<InsertPhotoIcon />
											</Button>
											<Button
												color={
													this.state.data.type === 'video'
														? 'primary'
														: 'default'
												}
												size="small"
												onClick={() =>
													this.setState({
														data: { ...this.state.data, type: 'video' },
													})
												}
											>
												<MovieIcon />
											</Button>
										</ButtonGroup>
									</Grid>
									<Grid item xs={6}>
										<TextField
											onChange={(event) =>
												this.onSizeChange(event.target.value, 'width')
											}
											value={this.state.data.width || ''}
											label="Width"
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											onChange={(event) =>
												this.onSizeChange(event.target.value, 'height')
											}
											value={this.state.data.height || ''}
											label="Height"
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<ButtonGroup fullWidth>
											<Button
												color={
													this.state.data.alignment === 'left'
														? 'primary'
														: 'default'
												}
												size="small"
												onClick={() =>
													this.setState({
														data: { ...this.state.data, alignment: 'left' },
													})
												}
											>
												<FormatAlignLeft />
											</Button>
											<Button
												color={
													this.state.data.alignment === 'center'
														? 'primary'
														: 'default'
												}
												size="small"
												onClick={() =>
													this.setState({
														data: { ...this.state.data, alignment: 'center' },
													})
												}
											>
												<FormatAlignCenter />
											</Button>
											<Button
												color={
													this.state.data.alignment === 'right'
														? 'primary'
														: 'default'
												}
												size="small"
												onClick={() =>
													this.setState({
														data: { ...this.state.data, alignment: 'right' },
													})
												}
											>
												<FormatAlignRight />
											</Button>
										</ButtonGroup>
									</Grid>
								</>
							) : null}
						</Grid>
						<Grid container item xs={12} direction="row" justify="flex-end">
							{props.data && props.data.url ? (
								<Button onClick={() => props.onConfirm(props.isMedia, '')}>
									<DeleteIcon />
								</Button>
							) : null}
							<Button
								onClick={() =>
									props.onConfirm(
										props.isMedia,
										this.state.data.url,
										this.state.data.width,
										this.state.data.height,
										this.state.data.alignment,
										this.state.data.type
									)
								}
							>
								<CheckIcon />
							</Button>
						</Grid>
					</Grid>
				</div>
			</Popover>
		)
	}
}

export default withStyles(styles, { withTheme: true })(UrlPopover)
