import * as React from 'react'
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'
import { buttonList } from './options'
import { Lang } from 'suneditor/src/lang/Lang'
import { connect } from 'react-redux'
import { AppState } from 'model/store-model'
import SunEditor from 'suneditor/src/lib/core'
class SunEditorx extends React.PureComponent<{ currentLang: string }> {
	private lang!: Lang
	private editor!: SunEditor
	constructor(props: Readonly<{ currentLang: string }>) {
		super(props)
	}
	async componentDidMount() {
		this.lang = (await import(
			`asset/editor-translation/${this.props.currentLang}.json`
		)) as Lang
		this.editor = suneditor.create('editor', {
			plugins: plugins,
			buttonList: buttonList,
			imageGalleryUrl: '/gallery.json',
			lang: this.lang,
		})
	}

	async componentDidUpdate() {
		this.lang = (await import(
			`asset/editor-translation/${this.props.currentLang}.json`
		)) as Lang
		this.editor.setOptions({
			plugins: plugins,
			buttonList: buttonList,
			imageGalleryUrl: '/gallery.json',
			lang: this.lang,
		})
	}

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
export default connect(mapStateToProps)(SunEditorx)
