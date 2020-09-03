import * as React from 'react'
import { AppState } from 'model/store-model'
import { connect } from 'react-redux'

declare var tinymce: any
class TinyMceEditor extends React.PureComponent<{ currentLang: string }> {
	constructor(props: Readonly<{ currentLang: string }>) {
		super(props)
	}
	componentDidMount() {
		tinymce.init({
			selector: '#editor',
		})
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
