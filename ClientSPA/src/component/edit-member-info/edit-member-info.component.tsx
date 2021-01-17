import React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { DropzoneArea } from 'material-ui-dropzone'
import { CloudUploadOutlined } from '@material-ui/icons'
import 'component/edit-member-info/edit-member-info.scss'
interface IProps extends WithTranslation {}
interface IState {
	files: File[]
	changeCount: number
}

export class EditMemberInfoOrigin extends React.PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props)
		this.state = {
			files: [],
			changeCount: 0,
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onChangeHandler = (files: File[]) => {
		this.setState({
			files: files,
			changeCount: this.state.changeCount + 1,
		})
	}

	render() {
		return (
			<React.Fragment>
				<div
					style={{
						height: 320,
						width: 320,
						position: 'relative',
					}}
				>
					<DropzoneArea
						initialFiles={['/image/flag/uk.png']}
						showPreviews={false}
						showPreviewsInDropzone={true}
						previewText=""
						dropzoneText={this.state.files.length > 0 ? '' : 'xxxxx'}
						Icon={
							this.state.files.length > 0
								? // eslint-disable-next-line @typescript-eslint/no-explicit-any
								  ('div' as any)
								: // eslint-disable-next-line @typescript-eslint/no-explicit-any
								  (CloudUploadOutlined as React.ComponentType)
						}
						filesLimit={1}
						previewGridProps={{
							container: {
								spacing: undefined,
							},
							item: {
								xs: false,
							},
						}}
						dropzoneClass="sizefull"
						previewGridClasses={{
							container: 'pos-absolute top-0 sizefull',
							item: 'sizefull image-upload',
						}}
						onChange={this.onChangeHandler}
					/>
				</div>
				{/* <img src="/image/flag/uk.png" onLoad={this.handleImgOnLoad} /> */}
			</React.Fragment>
		)
	}
}

export default withTranslation(undefined, { withRef: true })(
	EditMemberInfoOrigin
)
