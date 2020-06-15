import { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, GridItem, HeadingText, PieChart, LineChart, BillboardChart, Icon } from 'nr1'
import SimplePie from './SimplePie.js'

export default class ChartRow extends Component { 
    static propTypes = {
        row: PropTypes.object.isRequired,
        accountId: PropTypes.number.isRequired,
        sinceClasue: PropTypes.string
     }

    constructor(props) {
        super(props)
        this.state = { }
    }

    render() {
        const { row, accountId, sinceClause } = this.props

        return <Grid className="ChartRow">
            <GridItem columnSpan={2}>
                <HeadingText tagType={HeadingText.TAG_TYPE.H2}>
                    <Icon sizeType={Icon.SIZE_TYPE.LARGE} type={row.icon} /> {row.name}
                </HeadingText>
                <BillboardChart 
                    accountId={accountId}
                    query={`select count(*) as 'Transactions' FROM Transaction where appName like '${row.likeClause}' ${sinceClause}`}
                    fullWidth
                />
            </GridItem>
            <GridItem columnSpan={5} >
                <SimplePie accountId={accountId} likeClause={row.likeClause} sinceClause={sinceClause}/>
            </GridItem>
            <GridItem columnSpan={5}>
                <LineChart
                    accountId={accountId}
                    query={`select count(*) as 'Transactions' FROM Transaction where appName like '${row.likeClause}' facet appName limit max timeseries ${sinceClause}`}
                    fullWidth
                    fullHeight
                />
            </GridItem>
        </Grid>  
    }
}