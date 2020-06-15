# Chapter 9 - Refactoring to use components

In this chapter we'll take what we have learnt in the previous chapter about components and refactor our code so that each row of our application uses the custom component.



## 1. Lift and Shift

We have already created the RowChart component stub, we need to move all the code related to the chart row from the main `index.js` into the ChartRow `index.js` file. 

### 1b. Tidy up the component

Before we start, revert the ChartRow component code `index.js` to something a little more basic (or comment it out):

```jsx
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChartRow extends Component { 
    static propTypes = { }

    constructor(props) {
        super(props)
        this.state = { }
    }

    render() {
        return <div>Row here</div>
    }
}
```



Also in the main nerdlet `index.js`  **remove this entire line** where we call the `<ChartRow>`:

```jsx
<ChartRow example="This is some example text" exampleStr="This should be a string" exampleNum={1}/>
```



### 1b. Refactoring the code to use component

First, we need a lot of components from NR1, add an import to the top of the component:

```jsx
import { Grid, GridItem, HeadingText, PieChart, LineChart, BillboardChart, Icon } from 'nr1'
```



Replace the return block in the ChartRow's `render()` method by copying the `<Grid>` block from the main `index.js` file where it was being used to define **rows**. 

We need to extract the **row** configuration, **accountId** and **sinceClause** from props, so add those before the return statement too. *Notice how by defining them with the same names as from where we copied from we can avoid making any changes.*

Remove the `key` attribute from the root `<Grid>`element, we dont need that here anymore. 

That was a little hard to describe so here is the complete `render()` method of the ChartRow component:

```jsx
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
            <GridItem columnSpan={5}>
                <PieChart
                    accountId={accountId}
                    query={`select count(*) as 'Transactions' FROM Transaction where appName like '${row.likeClause}' facet appName limit max ${sinceClause}`}
                    fullWidth
                    fullHeight
                />
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
```



Lets be good citizens and add some propTypes to our component:

```jsx
static propTypes = {
    row: PropTypes.object.isRequired,
    accountId: PropTypes.number.isRequired,
    sinceClause: PropTypes.string
 }
```



In the main `index.js` we can now replace the code defining **rows** that we copied from with a reference to the `<ChartRow>` component, passing through the props as required:

```jsx
const rows = appConfig.map((row,index)=>{
    return <ChartRow key={index} row={row} accountId={accountId} sinceClause={sinceClause} uniqueId={index}/>
})
```

> Notice that we have moved ther `key` attribute into the <ChartRow> element and that the row object is passed through as an object as are all the other variables. We kept the names the same to make less changes. If you were building the component from scratch you might choose better property names.



Finally, we should move over the css. It works, but its currently defined in the main application and would be lost if we re-used this component. Delete it from the `styles.scss` in the main application and add to the `styles.scss` of the ChartRow component:

```jsx
.ChartRow {
    background-color: white;
    height: 300px;
    margin-bottom:2em;
    h2 {
        color:#248bbc;
        font-size: 3em;
        font-weight:bold;
        padding: 0.5em 0 0 0.5em;
    }
}
```



Save all the files, cross your fingers and toes and see the app working as before. If it doesnt work then use the Chrome inspector to try and debug the problems. As always the full code for this chapter can be found in the [/code](./code) folder.



**Bonus:**

You can now remove the components we're importing from NR1 in the main `index.js` file. If you use VS Code then the unused ones should be dimmed making it really easy! These are the only ones we still need:

```jsx
import { Grid, GridItem, HeadingText, Icon, PlatformStateContext } from 'nr1'
```



---

[Continue to Chapter 10](../chapter-10)



**FEEDBACK!**

Please provide feedback about this chapter or the course in general via email (jbuchanan@newrelic.com) a **pull request** or via the [feedback form](https://forms.gle/STjad8z2YkdzwAWJA).