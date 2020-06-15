# Chapter 4 - Enriching the layout

In this chapter we take a look at JSX and improve our layout with some styling using inline styles and style sheets.



## 1. What is JSX?

Before we go further we need to discuss JSX. We are writing JSX not javascript when we build our NR1 React application. Think of it as a syntax extenstion to javascript. Its javascript with bells and whistles and its focused at making it easy to work with react. Below is a quick summary of the main features, for more information view the [reactjs documentation.](https://reactjs.org/docs/introducing-jsx.html)



### 1a. A quick example

```jsx
let name = 'James'
let component = <h1>Hello, {name}</h1>
```

Here the **name** variable is a standard javascript string. 

The **component** variable, however, is an H1 react component. It renders as: `<h1>Hello, James</h1>`. Note that it looks a lot like an html tag, in this case it is, but it doesnt have to be, we've already used other non-html components like `<Grid>`. 

> All HTML elements already exist as components and do not need to be imported.



### 1b. Children

Just like HTML, JSX components can have child elements. For example our grid layout contains child elements:

```jsx
let component = <Grid>
	<GridItem columnSpan={4}>One</GridItem>
	<GridItem columnSpan={8}>Two</GridItem>
</Grid>
```

*Note that you can span multiple lines in JSX elements.* 

You may only have one single root element, the following is NOT valid because  **components must be contained in a single root element**:

```jsx
let component = <GridItem columnSpan={4}>One</GridItem>
	<GridItem columnSpan={8}>Two</GridItem>
```



There may not be a appropriate root element to contain your components, in this case you can wrap in a  [fragment](https://reactjs.org/docs/fragments.html), which is like an empty component `<>...</>` e.g.:

```jsx
let component = <>
        <h1>Title</h1>
        <h2>Subtitlle</h2>
    </>
```



### 1c. Curly braces `{}`

You can put any javascript expression within curly braces, so in the above example the `{name}` part means: "evaluate and render the value of the name variable". We can have any javascript expression here such as:

```jsx
let correct=7
let totalAnswers=12
let component = <h1>Score: { ((correct/totalAnswers)*100).toFixed(0)  }%</h1>
```

> ```<h1>Score: 58%</h1>```



### 1d. Attributes

JSX components can take attributes which become properties (aka "props") of the component. These can be specified as strings or expressions by enclosing in curly braces. 

```jsx
let example1=<img alt="Example image" src="http://some.url"/>
let example2=<img alt={user.name} src={user.avatarURL} />
let example3=<GridItem columnSpan={3}>Item</GridItem>
```

> Notice that in the third example we must specify the columns to the component as an expression not as a string. This is common among the attributes passed to UI compoennts from the NR1 library.



## 2. Styling and classes

You can style elements with classes and inline styles, as well as use components from the NR1 ocomponent library to improve and standardise the look and feel of your application.



### 2a. Styling the header

Lets improve our header style. First we will change the heading to use a [HeadingText](https://developer.newrelic.com/client-side-sdk/index.html#components/HeadingText) component.  Open the `/nerdlets/zerotohero-nerdlet/index.js` file and change the heading text to use the component like this:

```jsx
<GridItem columnSpan={11}>
    <HeadingText>
        Zero to Hero!
    </HeadingText>
</GridItem>
```



Remember to add the new component to the import statement at the top of the script:

```jsx
import { Grid, GridItem, HeadingText } from 'nr1';
```



Save and observe that (via the Chrome inspector) it now has a heading styling (its an H2 by default). Now, we want it to be an H1 not an H2, so as per the documentation we need to add a `tagType` attribute with the value `HeadingText.TAG_TYPE.H1`:

```jsx
<GridItem columnSpan={11}>
    <HeadingText tagType={HeadingText.TAG_TYPE.H1}>
        Zero to Hero!
    </HeadingText>
</GridItem>
```

>  Notice we use curly braces to provide the tagType  `HeadingText.TAG_TYPE.H1`, this is because its an enumerated type not a string.



### 2b. Inline Styling

We can provide styling to most of the NR1 components via the `style` attribute. This takes **a JSON object** of  css attribute/value pairs, a bit like css but the property names are collapsed. So for example lets make the text coloured and bigger by adding a style attribute to the `<HeadingText>` component:

```jsx
<HeadingText 
  tagType={HeadingText.TAG_TYPE.H1}
  style={{"color":"#b31021", "fontSize":"3em"}}
>
  Zero to Hero!
</HeadingText>
```

> The css property `font-size` becomes camel-cased `fontSize` here



### 2c. CSS Styling

Inline styling can be useful, but is rather messy. Its better to use CSS and classes. Nerdlets can use Sass (`.scss`) style sheets as well as standard `.css`. for more information on that checkout the [Sass website.](https://sass-lang.com/)

Lets convert the change we just made to being CSS driven. Edit the `/nerdelets/zerotohero-nerdelet/styles.scss` file and add the following CSS rule:

```css
.MainHeading {
    color: #b31021; 
    font-size: 3em;
    line-height: 80px;
    font-weight: bold;
}
```



To specify a class for a react element we have to specify the `className` attribute (rather than `class` as you might expect). Add the `className` attribute to the code in `index.js` as follows:

```jsx
<HeadingText 
  tagType={HeadingText.TAG_TYPE.H1}
  className="MainHeading"
>
  Zero to Hero!
</HeadingText>
```



## 3. Adding an image

Generally its best to link to images remotely rather than package them up in your application. There are limits on bundle sizes and images can be heavy. However, it is possible to include them for a quick styling win, here's how:



Grab a suitably sized PNG image and add it to the `/nerdlets/zerotohero-nerdlet` folder (or use [this one](./screenshots/icon.png)).

Add an import statement at the top of the file to import the image data:

```jsx
import Z2HIcon from './icon.png'
```



Add an `<img>` element to the `<GridItem>` containing the icon text as follows:

```jsx
<GridItem columnSpan={1}><img src={Z2HIcon} alt="Zero to Hero" height="80"/></GridItem>
```

>  Notice how the value of the imported image is an embedded `data:` string that contains a base64 representation of the  image.



Your app should look a bit like this now:

![Title styling](./screenshots/titlestyling.png)

 

---

[Continue to Chapter 5](../chapter-05)



**FEEDBACK!**

Please provide feedback about this chapter or the course in general via email (jbuchanan@newrelic.com) a **pull request** or via the [feedback form](https://forms.gle/STjad8z2YkdzwAWJA).