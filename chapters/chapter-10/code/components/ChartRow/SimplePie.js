import { Component } from 'react'
import { VictoryPie } from 'victory'

export default class SimplePie extends Component { 
    render() {
        return <VictoryPie height={200} colorScale="qualitative" 
            data={[
                { x: "Cats", y: 35 },
                { x: "Dogs", y: 40 },
                { x: "Birds", y: 55 }
            ]}
        />
    }
}
