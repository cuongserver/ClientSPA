import React from 'react'
import 'app.css'
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'

const buttonList = [
	[
		'undo',
		'redo',
		'font',
		'fontSize',
		'formatBlock',
		'paragraphStyle',
		'blockquote',
		'bold',
		'underline',
		'italic',
		'strike',
		'subscript',
		'superscript',
		'fontColor',
		'hiliteColor',
		'textStyle',
		'removeFormat',
		'outdent',
		'indent',
		'align',
		'horizontalRule',
		'list',
		'lineHeight',
		'table',
		'link',
		'image',
		'video',
		'audio',
		'imageGallery',
		'fullScreen',
		'showBlocks',
		'codeView',
		'preview',
		'print',
		'save',
		'template',
	],
]

class Home extends React.Component {
	private logo = `${process.env.PUBLIC_URL}/logo192.png`

	componentDidMount() {
		suneditor.create('editor', {
			plugins: plugins,
			buttonList: buttonList,
		})
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
					<textarea id="editor" className="w-full"></textarea>
				</header>
			</div>
		)
	}
}

export default Home
