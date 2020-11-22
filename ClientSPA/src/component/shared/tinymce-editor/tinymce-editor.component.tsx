import * as React from 'react'
import { StoreStateApp } from 'types/store.app'
import { connect } from 'react-redux'
import 'tinymce'
import 'tinymce/themes/modern'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/table'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/code'
import 'tinymce/plugins/lists'
import './tinymce-editor.scss'
import { Settings, Editor } from 'tinymce'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const tinymce: any
export class TinyMceEditor extends React.PureComponent<{
	currentLang: string
}> {
	private editor!: Editor
	private defaultToolbar =
		'fullscreen | undo redo | styleselect | bold italic | alignleft ' +
		'aligncenter alignright alignjustify | ' +
		'bullist numlist outdent indent | link image'

	componentDidMount() {
		const settings: Settings = {
			selector: '#editor',
			plugins: [
				'fullscreen',
				'link',
				'table',
				'image',
				'code',
				'imagetools',
				'textcolor',
				'lists',
			],
			skin_url: '/tinymce/skins/lightgray',
			language_url: '/tinymce/langs/vi_VN.js',
			statusbar: false,
			menubar: false,
			toolbar: this.defaultToolbar + ' forecolor Gallery',
			setup: (editor: Editor) => {
				editor.addButton('Gallery', {
					subtype: 'custom-class',
					icon: 'image-gallery',
					tooltip: 'Gallery',
				})
			},
		}
		tinymce.init(settings)
		this.editor = tinymce.get('editor') as Editor
	}
	getContent() {
		const range = this.editor.selection.getRng(true)
		const newNode = this.editor.getDoc().createElement('img')
		newNode.src = 'http://suneditor.com/docs/cat.jpg'
		range.insertNode(newNode)
	}

	async componentDidUpdate() {}

	render() {
		return (
			<div className="w-full">
				<textarea id="editor" className="w-full"></textarea>
			</div>
		)
	}
}

const mapStateToProps = (state: StoreStateApp) => ({
	currentLang: state.locale.currentLang,
})
export default connect(mapStateToProps, null, null, { forwardRef: true })(
	TinyMceEditor
)
