import React from 'react'
import { Grid, GridItem, HeadingText, Icon, PlatformStateContext, Checkbox } from 'nr1'
import Z2HIcon from './icon.png'
import ChartRow from '../../components/ChartRow'

export default class ZerotoheroNerdlet extends React.Component {
    constructor(props) {
        super(props)
        this.state = { slowOnly: true }
    }

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
        return <PlatformStateContext.Consumer>
            {(platformUrlState) => {

                const {slowOnly } = this.state

                let sinceClause = ""
                if(platformUrlState && platformUrlState.timeRange) {
                    if(platformUrlState.timeRange.duration) {
                        sinceClause = `since ${platformUrlState.timeRange.duration/1000/60} minutes ago`
                    } else if(platformUrlState.timeRange.begin_time && platformUrlState.timeRange.end_time){
                        sinceClause = `since ${platformUrlState.timeRange.begin_time} until ${platformUrlState.timeRange.end_time}`
                    }
                }

                const rows = appConfig.map((row,index)=>{
                    return <ChartRow key={index} row={row} accountId={accountId} sinceClause={sinceClause} uniqueId={index} duration={slowOnly ? 0.5 : 0}/>
                })

                const slowToggle = (event) => {
                    this.setState({ slowOnly: event.target.checked})
                }

                return <>
                    <Grid>
                        <GridItem columnSpan={1} className="AppIcon"><img src={Z2HIcon} alt="Zero to Hero" height="80"/></GridItem>
                        <GridItem columnSpan={8}>
                            <HeadingText 
                                tagType={HeadingText.TAG_TYPE.H1}
                                className="MainHeading"
                            >
                                Zero to Hero!
                            </HeadingText>
                        </GridItem>
                        <GridItem columnSpan={3}>
                            <Checkbox onChange={slowToggle} defaultChecked={slowOnly} label='Slow transactions only' />
                        </GridItem>
                    </Grid>
                    {rows}
                </>
            }}
        </PlatformStateContext.Consumer>
    }
}
