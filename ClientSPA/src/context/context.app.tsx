import { PaletteType } from '@material-ui/core'
import React from 'react'

interface ThemeContext {
	value: PaletteType
	setTheme: (theme: PaletteType) => void
}

interface AppContext {
	theme: ThemeContext
}

const RootContext = React.createContext<AppContext | undefined>(undefined)

class Context extends React.PureComponent<{}, AppContext> {
	private setTheme = (theme: PaletteType) => {
		this.setState({
			theme: {
				...this.state.theme,
				value: theme,
			},
		})
	}
	constructor(props: {}) {
		super(props)
		this.state = {
			theme: {
				value: 'light',
				setTheme: this.setTheme,
			},
		}
	}
	render() {
		return (
			<RootContext.Provider value={{ ...this.state }}>
				{this.props.children}
			</RootContext.Provider>
		)
	}
}

export { Context, RootContext }
export type { AppContext }
