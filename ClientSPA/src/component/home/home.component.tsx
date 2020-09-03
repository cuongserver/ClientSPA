/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import 'app.css'
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import plugins, { imageGallery } from 'suneditor/src/plugins'
import Editor from 'component/shared/tinymce-editor/tinymce-editor.component'
import MUIRichTextEditor from 'component/shared/richtext-editor/MUIRichTextEditor.component'
import { connect } from 'react-redux'
import { AppState } from 'model/store-model'
import * as LocaleModel from 'model/store-model/locale'
import { Dispatch } from 'redux'

class Home extends React.Component<{
	dispatch: Dispatch
	currentLang: string
}> {
	private logo = `${process.env.PUBLIC_URL}/logo192.png`

	editorRef: React.RefObject<typeof MUIRichTextEditor>
	constructor(props: Readonly<{ dispatch: Dispatch; currentLang: string }>) {
		super(props)
		this.editorRef = React.createRef()
	}

	handleClick = () => {
		if (this.props.currentLang === 'vi')
			LocaleModel.actionCreators.changeLanguage(this.props.dispatch, 'en')
		if (this.props.currentLang === 'en')
			LocaleModel.actionCreators.changeLanguage(this.props.dispatch, 'vi')
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={this.logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
					<button onClick={this.handleClick}>View content</button>
					<Editor />
				</header>
			</div>
		)
	}
}
const mapStateToProps = (state: AppState) => ({
	currentLang: state.locale.currentLang,
})
export default connect(mapStateToProps)(Home)
