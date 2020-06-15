import { Component } from 'react'
import { VictoryPie, VictoryTooltip, VictoryContainer } from 'victory'
import { Spinner, NerdGraphQuery } from 'nr1'

export default class SimplePie extends Component { 
    constructor(props) {
        super(props)
        this.state = { data:null }
    }

    async componentDidMount() {
        this.loadData()
    }
    
    loadData() {
        const { accountId, likeClause, sinceClause } = this.props

        const variables = {
            id: accountId
        }

        let query = `
            query($id: Int!) {
                actor {
                    account(id: $id) {
                        appshare: nrql(query: "select count(*) as 'Transactions' FROM Transaction where appName like '${likeClause}' facet appName limit max ${sinceClause}") {results}
                    }
                }
            }
        `

        const q = NerdGraphQuery.query({ query: query, variables: variables });
        q.then(results => {
            const formattedData=results.data.actor.account.appshare.results.map((item,idx)=>{ 
                return {  
                    y: item.Transactions, 
                    label: `${item.appName}: ${Number(item.Transactions/1024).toFixed(2)}k` 
                } 
            })
            this.setState({data: formattedData})
        }).catch((error) => { console.log(error); })
    }

    render() {
        const { data } = this.state
        let returnVal = <Spinner />
        if(data) {
            returnVal=<VictoryPie 
                height={300} 
                colorScale="qualitative" 
                data={data} 
                padding={10}
                labelComponent={<VictoryTooltip/>}
                containerComponent={<VictoryContainer responsive={false}/>}
            />
        }
        return returnVal
    }
}
