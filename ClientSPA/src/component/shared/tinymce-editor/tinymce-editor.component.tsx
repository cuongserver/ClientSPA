import * as React from 'react'
import { AppState } from 'model/store-model'
import { connect } from 'react-redux'
import 'tinymce'
import 'tinymce/themes/modern'
import 'tinymce/plugins/table'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/code'
import 'tinymce/plugins/lists'
import { Settings, Editor } from 'tinymce'

declare const tinymce: any
export class TinyMceEditor extends React.PureComponent<{
	currentLang: string
}> {
	private editor!: Editor
	private defaultToolbar =
		'undo redo | styleselect | bold italic | alignleft ' +
		'aligncenter alignright alignjustify | ' +
		'bullist numlist outdent indent | link image'

	componentDidMount() {
		const settings: Settings = {
			selector: '#editor',
			plugins: [
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
			toolbar: this.defaultToolbar + ' forecolor',
		}
		tinymce.init(settings)
		this.editor = tinymce.get('editor') as Editor
		console.log(this.editor)
	}
	getContent() {}

	async componentDidUpdate() {}

	render() {
		return (
			<div className="w-full">
				<textarea id="editor" className="w-full"></textarea>
			</div>
		)
	}
}

const mapStateToProps = (state: AppState) => ({
	currentLang: state.locale.currentLang,
})
export default connect(mapStateToProps, null, null, { forwardRef: true })(
	TinyMceEditor
)
