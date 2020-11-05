/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import 'app.css'
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import plugins, { imageGallery } from 'suneditor/src/plugins'
import Editor, {
	TinyMceEditor,
} from 'component/shared/tinymce-editor/tinymce-editor.component'
import MUIRichTextEditor from 'component/shared/richtext-editor/MUIRichTextEditor.component'
import { connect } from 'react-redux'
import { StoreStateApp } from 'types/store.app'
import { StoreStateLocale } from 'types/store.locale'
import { Dispatch } from 'redux'

class Home extends React.PureComponent<{
	dispatch: Dispatch
	currentLang: string
}> {
	private logo = `${process.env.PUBLIC_URL}/logo192.png`

	editorRef: React.RefObject<TinyMceEditor>
	constructor(props: Readonly<{ dispatch: Dispatch; currentLang: string }>) {
		super(props)
		this.editorRef = React.createRef()
	}

	handleClick = () => {
		// if (this.props.currentLang === 'vi')
		// 	LocaleModel.actionCreators.changeLanguage(this.props.dispatch, 'en')
		// if (this.props.currentLang === 'en')
		// 	LocaleModel.actionCreators.changeLanguage(this.props.dispatch, 'vi')
		this.editorRef.current?.getContent()
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
					<Editor ref={this.editorRef} />
				</header>
			</div>
		)
	}
}
const mapStateToProps = (state: StoreStateApp) => ({
	currentLang: state.locale.currentLang,
})
export default connect(mapStateToProps)(Home)
