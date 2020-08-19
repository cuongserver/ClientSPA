import * as React from 'react'

export interface Props {
  children?: React.ReactNode
}

export interface State {}

class Login extends React.PureComponent {
  constructor(props: Props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        s<h6>This is sparta</h6>
      </React.Fragment>
    )
  }
}

export default Login
