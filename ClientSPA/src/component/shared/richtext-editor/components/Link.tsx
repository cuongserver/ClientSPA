/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { ContentState } from 'draft-js'
import MuiLink from '@material-ui/core/Link'

type TLinkProps = {
	children?: React.ReactNode
	contentState: ContentState
	entityKey: string
}

class Link extends React.PureComponent<TLinkProps> {
	render() {
		const props = this.props
		const { url, className } = props.contentState
			.getEntity(props.entityKey)
			.getData()
		return (
			<MuiLink
				href={url}
				className={`${className} editor-anchor`}
				target="_blank"
			>
				{props.children}
			</MuiLink>
		)
	}
}

export default Link
