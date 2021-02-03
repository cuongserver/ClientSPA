import { RootContext } from 'context/app-context-dom'
import React from 'react'

export class ApiHanlderBase {
	private ctx: React.ContextType<typeof RootContext>
	constructor(context: React.ContextType<typeof RootContext>) {
		this.ctx = context
	}
}
