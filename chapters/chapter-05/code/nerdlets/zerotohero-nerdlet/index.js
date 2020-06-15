import React from 'react'
import { Grid, GridItem, HeadingText, PieChart, LineChart, BillboardChart } from 'nr1'
import Z2HIcon from './icon.png'

export default class ZerotoheroNerdlet extends React.Component {
    render() {
        const accountId=1
        const appName="Tower"
        return <>
            <Grid>
                <GridItem columnSpan={1}><img src={Z2HIcon} alt="Zero to Hero" height="80"/></GridItem>
                <GridItem columnSpan={11}>
                    <HeadingText 
                        tagType={HeadingText.TAG_TYPE.H1}
                        className="MainHeading"
                    >
                        Zero to Hero!
                    </HeadingText>
                </GridItem>
            </Grid>
            <Grid>
                <GridItem columnSpan={2}>
                    <HeadingText tagType={HeadingText.TAG_TYPE.H2}>
                        {appName}
                    </HeadingText>
                    <BillboardChart
                        accountId={accountId}
                        query={`select count(*) as 'Transactions' FROM Transaction where appName like '${appName}%'`}
                        fullWidth
                    />
                </GridItem>
                <GridItem columnSpan={5}>
                    <PieChart
                        accountId={accountId}
                        query={`select count(*) as 'Transactions' FROM Transaction where appName like '${appName}%' facet appName limit max`}
                        fullWidth
                        fullHeight
                    />
                </GridItem>
                <GridItem columnSpan={5}>
                    <LineChart
                        accountId={accountId}
                        query={`select count(*) as 'Transactions' FROM Transaction where appName like '${appName}%' facet appName limit max timeseries`}
                        fullWidth
                        fullHeight
                    />
                </GridItem>
            </Grid>  
        </>
    }
}
