import React from 'react'
import { Grid, GridItem, HeadingText, PieChart, LineChart, BillboardChart, Icon } from 'nr1'
import Z2HIcon from './icon.png'

export default class ZerotoheroNerdlet extends React.Component {
    render() {
        const accountId=1
        const appConfig=[
            {
                name: "Towers",
                icon: Icon.TYPE.HARDWARE_AND_SOFTWARE__SOFTWARE__CORRELATION_REASONING,
                likeClause: "Tower%"
            },
            {
                name: "Proxies",
                icon: Icon.TYPE.HARDWARE_AND_SOFTWARE__SOFTWARE__DECISIONS,
                likeClause: "%Proxy%"
            },
            {
                name: "Services",
                icon: Icon.TYPE.HARDWARE_AND_SOFTWARE__SOFTWARE__DESTINATIONS,
                likeClause: "%Service"
            }
        ]
        const rows = appConfig.map((row,index)=>{
            return <Grid key={index} className="ChartRow">
                <GridItem columnSpan={2}>
                    <HeadingText tagType={HeadingText.TAG_TYPE.H2}>
                        <Icon sizeType={Icon.SIZE_TYPE.LARGE} type={row.icon} /> {row.name}
                    </HeadingText>
                    <BillboardChart 
                        accountId={accountId}
                        query={`select count(*) as 'Transactions' FROM Transaction where appName like '${row.likeClause}'`}
                        fullWidth
                    />
                </GridItem>
                <GridItem columnSpan={5}>
                    <PieChart
                        accountId={accountId}
                        query={`select count(*) as 'Transactions' FROM Transaction where appName like '${row.likeClause}' facet appName limit max`}
                        fullWidth
                        fullHeight
                    />
                </GridItem>
                <GridItem columnSpan={5}>
                    <LineChart
                        accountId={accountId}
                        query={`select count(*) as 'Transactions' FROM Transaction where appName like '${row.likeClause}' facet appName limit max timeseries`}
                        fullWidth
                        fullHeight
                    />
                </GridItem>
            </Grid>  
        })
        return <>
            <Grid>
                <GridItem columnSpan={1} className="AppIcon"><img src={Z2HIcon} alt="Zero to Hero" height="80"/></GridItem>
                <GridItem columnSpan={11}>
                    <HeadingText 
                        tagType={HeadingText.TAG_TYPE.H1}
                        className="MainHeading"
                    >
                        Zero to Hero!
                    </HeadingText>
                </GridItem>
            </Grid>
            {rows}
        </>
    }
}
