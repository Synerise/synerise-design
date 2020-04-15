---

Color usage in the Synerise application is a way of communicating the basic rules about the behavior of the interface elements. By consistent use of the specific color patterns, we can educate the users about the meaning and scope of actions to be performed on the interface. Disobedience of the rules may cause incorrect identification of features.

### Guidelines

We have built the Synerise application upon the following color usage guidelines. 

**Communication comes first**

As much as we appreciate the good application of aesthetic rules, we always prioritize transparency in communication.

**Draw attention**

Avoid distracting users by the use of the color. Bring only important elements to user's attention.   

**Be consistent**

In our designs, every decision about the color is justified and aims to convey clear message for the users who are used to consistency of the color usage.

### Color anatomy

Synerise uses a color pallete that consists of 12 colors. Each color in the pallete has shades in the scale from 900 (the most intense shade) to 050 (the most pale shade). This structure dictates the name format of the colors. The color name is hyphenated; the first part contains a customary name of the color and the second part is a numerical affix, for example, `Blue-600`, `Yellow-300`, `Grey-050`.

## Colors

Our color palette is built with our core principles and guidelines as its foundation.

**Primary colors**

In the application, in the key UI elements for the users we consistently use the colors of the `600` affix. Primary colors should be used in all CTA elements which call out a function in the system. 

Tutaj musimy pokazac blue 600 i gray 600  jako bloczki zawierajace obrazek- kwadrat kolor wraz z pod spodem hexem i rgb koloru do copy paste 

**Primary colors**

There are two primary colors:

- `Blue-600`
    - This color is used mainly to draw attention to specific elements:
    - basic CTA elements, 
    - primary buttons, 
    - links, 
    - active buttons,
    - additional icons (non-standard icons that mark the selection of the specific option).

- `Grey-600` 
    - This is the main color for typography, shadows and shape of components.
 
**Notification colors**

- `Green-600` 
    - This color is used to communicate a successful operation.
    
``` jsx noeditor
import SingleColor from './utils/Palette/SingleColor/SingleColor';
<SingleColor color="green-600" />
```
- `Yellow-600` 
    - This color is used to convey significant information and warnings - if a user misses it, they will not achieve the desired result.
    
``` jsx noeditor
import SingleColor from './utils/Palette/SingleColor/SingleColor';
<SingleColor color="yellow-600" />
```
- `Red-600` 
    - This color is used to communicate alerts, failed operations or to convey information of the greatest importance - if a user misses it, it will cause downtime.

``` jsx noeditor
import SingleColor from './utils/Palette/SingleColor/SingleColor';
<SingleColor color="red-600" />
```

---

**Full palette**

```jsx noeditor
import Palette from './utils/Palette/Palette';

<Palette /> 
```


**Borders**

- Thickness: `1-2px`
- Color variations: Most frequently used color is `Grey-600`, but other variations of grey are used as well as other colors from the palette.
- Outline dashes

### Implementation of colors

In order to use the color in the code, you need to perform the following steps:

1. Choose the color from this website.
2. To access the color, go to [https://styled-components.com/docs/advanced#the-theme-prop](https://styled-components.com/docs/advanced#the-theme-prop) and use the `theme` property.

See example below:

```static
const RedText = styled.div`
  color: ${(props): string => props.theme.palette["red-600"]};
`;
```

**Do's & Don'ts**
