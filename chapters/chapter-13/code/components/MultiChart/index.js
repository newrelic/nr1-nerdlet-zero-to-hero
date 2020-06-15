import { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner, NerdGraphQuery, LineChart } from 'nr1'

export default class MultiChart extends Component { 
    static propTypes = {
        accountId: PropTypes.number.isRequired,
        sinceClause: PropTypes.string
     }

    constructor(props) {
        super(props)
        this.state = { data:null }
    }

    async componentDidMount() {
        this.loadData()
        this.autoRefresh = setInterval(() => this.loadData(), 1000*60*1) //auto refresh 1 minute;
    }

    componentWillUnmount() {
        clearInterval(this.autoRefresh);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sinceClause!==this.props.sinceClause){
            this.loadData()
        }
    }

    loadData() {
        const { accountId, sinceClause } = this.props
    
        const variables = {
            id: accountId
        }
    
        let query = `
            query($id: Int!) {
                actor {
                    account(id: $id) {
                        server: nrql(query: "SELECT count(*) as 'transactions' from Transaction where appName='WebPortal' timeseries ${sinceClause}") {results}
                        browser: nrql(query: "select count(*) as 'pageViews' FROM PageView where appName='WebPortal' timeseries ${sinceClause}") {results}
                    }
                }
            }
        `
    
        const q = NerdGraphQuery.query({ query: query, variables: variables });
        q.then(results => {

            const dataFormatter = (data, fieldName, id, name, color) =>{
                return {
                    metadata: {
                        id: id,
                        name: name,
                        color: color,
                        viz: 'main',
                        units_data: {
                            x: 'TIMESTAMP',
                            y: 'TRANSACTIONS',
                        }
                    },
                    data: data.results.map((datapoint)=>{ return { x: datapoint.endTimeSeconds*1000, y:datapoint[fieldName] }})
                }
            }

            let formattedData=[]
            formattedData.push(dataFormatter(results.data.actor.account.server,'transactions','series1','Server App', '#a35ebf'))
            formattedData.push(dataFormatter(results.data.actor.account.browser,'pageViews','series2','Browser App', '#ff0000'))
            this.setState({data: formattedData})

        }).catch((error) => { console.log(error); })
    }

    render() {
        const { data } = this.state
        let returnVal = <Spinner />
        if(data) {
            returnVal=<LineChart data={data} fullWidth />
        }
        return returnVal
    }
}