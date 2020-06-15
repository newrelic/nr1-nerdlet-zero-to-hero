import React from 'react';
import { Grid, GridItem } from 'nr1';

export default class ZerotoheroNerdlet extends React.Component {
    render() {
        return <>
            <Grid>
                <GridItem columnSpan={1}>Icon</GridItem>
                <GridItem columnSpan={11}>Zero to Hero!</GridItem>
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
