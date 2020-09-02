import React from 'react'
import 'app.css'
import 'suneditor/dist/css/suneditor.min.css'
import suneditor from 'suneditor'
import plugins, { imageGallery } from 'suneditor/src/plugins'
import SunEditor from 'suneditor/src/lib/core'
import MUIRichTextEditor from 'component/shared/richtext-editor/MUIRichTextEditor.component'

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

const viLang = {
	code: 'en',
	toolbar: {
		default: 'Default',
		save: 'Save',
		font: 'Phông chữ',
		formats: 'Formats',
		fontSize: 'Size',
		bold: 'Bold',
		underline: 'Underline',
		italic: 'Italic',
		strike: 'Strike',
		subscript: 'Subscript',
		superscript: 'Superscript',
		removeFormat: 'Remove Format',
		fontColor: 'Font Color',
		hiliteColor: 'Highlight Color',
		indent: 'Indent',
		outdent: 'Outdent',
		align: 'Align',
		alignLeft: 'Align left',
		alignRight: 'Align right',
		alignCenter: 'Align center',
		alignJustify: 'Align justify',
		list: 'List',
		orderList: 'Ordered list',
		unorderList: 'Unordered list',
		horizontalRule: 'Horizontal line',
		hr_solid: 'Solid',
		hr_dotted: 'Dotted',
		hr_dashed: 'Dashed',
		table: 'Table',
		link: 'Link',
		math: 'Math',
		image: 'Image',
		video: 'Video',
		audio: 'Audio',
		fullScreen: 'Full screen',
		showBlocks: 'Show blocks',
		codeView: 'Code view',
		undo: 'Undo',
		redo: 'Redo',
		preview: 'Preview',
		print: 'print',
		tag_p: 'Paragraph',
		tag_div: 'Normal (DIV)',
		tag_h: 'Header',
		tag_blockquote: 'Quote',
		tag_pre: 'Code',
		template: 'Template',
		lineHeight: 'Line height',
		paragraphStyle: 'Paragraph style',
		textStyle: 'Text style',
		imageGallery: 'Image gallery',
	},
	dialogBox: {
		linkBox: {
			title: 'Insert Link',
			url: 'URL to link',
			text: 'Text to display',
			newWindowCheck: 'Open in new window',
		},
		mathBox: {
			title: 'Math',
			inputLabel: 'Mathematical Notation',
			fontSizeLabel: 'Font Size',
			previewLabel: 'Preview',
		},
		imageBox: {
			title: 'Insert image',
			file: 'Select from files',
			url: 'Image URL',
			altText: 'Alternative text',
		},
		videoBox: {
			title: 'Insert Video',
			file: 'Select from files',
			url: 'Media embed URL, YouTube/Vimeo',
		},
		audioBox: {
			title: 'Insert Audio',
			file: 'Select from files',
			url: 'Audio URL',
		},
		browser: {
			tags: 'Tags',
			search: 'Search',
		},
		caption: 'Insert description',
		close: 'Close',
		submitButton: 'Submit',
		revertButton: 'Revert',
		proportion: 'Constrain proportions',
		basic: 'Basic',
		left: 'Left',
		right: 'Right',
		center: 'Center',
		width: 'Width',
		height: 'Height',
		size: 'Size',
		ratio: 'Ratio',
	},
	controller: {
		edit: 'Edit',
		unlink: 'Unlink',
		remove: 'Remove',
		insertRowAbove: 'Insert row above',
		insertRowBelow: 'Insert row below',
		deleteRow: 'Delete row',
		insertColumnBefore: 'Insert column before',
		insertColumnAfter: 'Insert column after',
		deleteColumn: 'Delete column',
		fixedColumnWidth: 'Fixed column width',
		resize100: 'Resize 100%',
		resize75: 'Resize 75%',
		resize50: 'Resize 50%',
		resize25: 'Resize 25%',
		autoSize: 'Auto size',
		mirrorHorizontal: 'Mirror, Horizontal',
		mirrorVertical: 'Mirror, Vertical',
		rotateLeft: 'Rotate left',
		rotateRight: 'Rotate right',
		maxSize: 'Max size',
		minSize: 'Min size',
		tableHeader: 'Table header',
		mergeCells: 'Merge cells',
		splitCells: 'Split Cells',
		HorizontalSplit: 'Horizontal split',
		VerticalSplit: 'Vertical split',
	},
	menu: {
		spaced: 'Spaced',
		bordered: 'Bordered',
		neon: 'Neon',
		translucent: 'Translucent',
		shadow: 'Shadow',
	},
}

class Home extends React.Component {
	private logo = `${process.env.PUBLIC_URL}/logo192.png`

	editorRef: React.RefObject<typeof MUIRichTextEditor>
	constructor(props: Readonly<{}>) {
		super(props)
		this.editorRef = React.createRef()
	}
	//private editor: SunEditor[] = []

	// componentDidMount() {
	// 	this.editor.push(
	// 		suneditor.create('editor', {
	// 			plugins: plugins,
	// 			buttonList: buttonList,
	// 			imageGalleryUrl: '/gallery.json',
	// 			lang: viLang,
	// 		})
	// 	)
	// }

	handleClick = () => {
		//console.log(this.editor[0].getContents(false))
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
					<MUIRichTextEditor label="Start typing..." />
				</header>
			</div>
		)
	}
}

export default Home
