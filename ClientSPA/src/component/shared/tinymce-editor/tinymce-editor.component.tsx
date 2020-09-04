import * as React from 'react'
import { AppState } from 'model/store-model'
import { connect } from 'react-redux'
import 'tinymce'
import 'tinymce/themes/modern'
import 'tinymce/plugins/table'
import 'tinymce/plugins/link'
import { Settings, Editor } from 'tinymce'

declare var tinymce: any
class TinyMceEditor extends React.PureComponent<{ currentLang: string }> {
	constructor(props: Readonly<{ currentLang: string }>) {
		super(props)
	}
	componentDidMount() {
		const settings: Settings = {
			selector: '#editor',
			plugins: ['link', 'table'],
			skin_url: '/tinymce/skins/lightgray',
		}

		tinymce.init(settings)
		const x = tinymce.get('editor') as Editor
		console.log(x)
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

const mapStateToProps = (state: AppState) => ({
	currentLang: state.locale.currentLang,
})
export default connect(mapStateToProps)(TinyMceEditor)
