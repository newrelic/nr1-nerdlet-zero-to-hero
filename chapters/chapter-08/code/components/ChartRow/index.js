import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChartRow extends Component { 
    static propTypes = {
        example: PropTypes.string.isRequired,
        exampleStr: PropTypes.string,
        exampleNum: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props)
        this.state = { counter: 1 }
    }

    render() {
        const { counter } = this.state
        const { example } = this.props

        const incCounter = () => {
            this.setState({counter: counter+1})
        }

        return <div onClick={incCounter} className="example">{example}, counter: {counter}</div>
    }
}