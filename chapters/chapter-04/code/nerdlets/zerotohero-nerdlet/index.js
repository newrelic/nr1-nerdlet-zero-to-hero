import React from 'react'
import { Grid, GridItem, HeadingText } from 'nr1'
import Z2HIcon from './icon.png'

export default class ZerotoheroNerdlet extends React.Component {
    render() {
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
                <GridItem columnSpan={6}>Graph</GridItem>
                <GridItem columnSpan={6}>Graph</GridItem>
            </Grid>
            <Grid>
                <GridItem columnSpan={6}>Graph</GridItem>
                <GridItem columnSpan={6}>Graph</GridItem>
            </Grid>    
            <Grid>
                <GridItem columnSpan={6}>Graph</GridItem>
                <GridItem columnSpan={6}>Graph</GridItem>
            </Grid>
        </>
    }
}
