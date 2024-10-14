# CS 260 Notes

## 9/5/24 - Github


### Creating a Repository

To create a repository
- Select the respositories tab
- Click `New Repository`
- Fill out the repository details as desired


### Cloning a Repository

All GitHub repositories have a unique URL, which is what we use to clone, which includes all the commits, comments, and SHAs.

To clone a repository onto your device
- Get a copy of the URL by going to the repository and clicking the green `code` button, and then copying the HTTPS URL.
- Run the `git clone <url>` command in the terminal (verify you are in the right directory, this will create a subdirectory).


### Managing Changes

As you make changes to the repository (files, folders, etc.) you have to push the changes to the GitHub clone. Use the `git push` command.

To pull commits down, you will use the `git pull` command. A good order to follow is to pull changes, then make changes, then commit the changes, and push those changes to GitHub.


### Other Useful Commands

The `git fetch` command will give you the latest information about the changes on GitHub, without changing your local version.

The `git status` command will display the differences between the clones and show things such as missing commits.


### Handling Conflicts

Merge conflicts arise when the Github Code has changes, and you try to commit, push, or pull with different changes locally.

If the exact same line is changed, GitHub won't know what change to keep, so we cannot just pull the different commits. Run `git merge` to merge the changes. After the conflict is resolved, you can commit and push.



## 9/13/24 - Technology Stack

A technology stack is a "collection of technologies you use to create or deliver your web application." These normally layer on top of one another, which is where the term stack somes into play. The top of this stack is the web framework (such as React and Vue). This provides things such as authentication, business, data, storage, etc. by communicating with web services (which use backend services such as caching, DBs, logging, monitoring, etc.).

Migrating to a new stack is expensive and often causes problems and errors.


## 9/13/24 - Amazon Web Services-EC2

#### SSH into your server

To remote shell into your server, run the command:
```sh
ssh -i [key pair file] ubuntu@[ip address]
```

In there, there are a few different files.  
- The Caddyfile is the configuration file for your web service gateway.
- The public_html directory contains all of the static files that you are serving up directly through Caddy when using it as a web service
- The services directory is the place where you are going to install all of your web services once you build them.

Exit the remote shell by typing exit.


## 9/13/24 - Amazon Web Services-Route 53

- referring to a web server by its IP address works for development, but not for most users.
- you want to create a secure (HTTPS) connection to your app, which cannot be done with only an IP address. Use a domain name instead.
- Route 53 is the AWS service that handles everything DNS (Domain Name System) related. Can buy a domain name, host your domain on their DNS servers, and create DNS records with a DNS server.

#### Managing your DNS records

- DNS records map domain names to IP addresses (A records) or other domain names (CNAME records).
- There are two additional NS and SOA type records listed which are important for working with DNS.
    - The NS (name server) record contains the names of the authoritative name servers authorized by you to place DNS records in this DNS server. Listed with registrar you lease your domain name from. This way the authoritative NS can verify the DNS record and DNS registration match and are authorized to represent the domain name when defining DNS records.
    - The SOA (start of authority) record provides contact info about the owner of the domain name.




## 9/14/24 - Caddy

- Released in 2020 by Matt Holt, who combined building an HTTP server with Go with the ease of generating TLS certs with LetsEncrypt.
- Web service that listens for incoming HTTP requests. Then either serves up the requested static files or routes the request to another web service.
- Gateway or Reverse proxy: Ability to route requests and allows you to expose multiple web services as a single external web service.
- For this course, used for:
    - Handling all of the creation and rotation of web certs (we can easily support HTTPS)
    - Serves up all static HTML, CSS, and JS files.
    - Acts as gateway for subdomain requests to your startup app services.

#### Important Caddy Files

- Config file `/Caddyfile`
    - Contains definitions for routing HTTP requests that Caddy receives
    - Used to determine location where static HTML files are loaded from and to proxy requests into the services you create later.
    - You will only modify this file manually for when you configure your server's domain name.
- HTML files `/public_html`
    - Directory of files that Caddy serves up when requests are made to the root or your web server.
    - Configured in Caddyfile discussed above. Static file server is mapped to /usr/share/caddy.
    - Whenever Caddy receives an HTTP request for any domain name on port 80, it will use the path of the request to find corresponding files in this directory.




## 9/14/24 - HTTPS, TLS, and web certificates

#### HTTPS and TLS

- Secure version of HTTP is HTTPS (Secure Hypertext Transport Protocol)
- HTTPS is basically HTTP with a negotiated secure connection that happens before any data is exchanged.
- Secure connection means all data is encrypted using the TLS protocol.
    - How it works: negotiates a shared secret that is then used to encrypt data.
    - Can see its negotiation with `curl` along with the `-v` parameter to see the verbose output of the HTTPS exchange.
    - Negotiation involves multiple steps in the handshake.
    - Part of the handshake is the exchange of a web cert that identifies the domain name of the server creating the secure connection.
    - Browser compares the certificate domain name to the one represented in the URL. If no match, or expired cert, it will show a warning.

#### Web Certificates

- They are generated by a third party using public/private key encryption.
- Cert issuer is responsible for verifying that the cert owner actually owns the domain name represented by the cert.
- Once you have a cert from your web server, then the browser can validate cert using public keys of the cert issuer.
- `Let's Encrypt` was created by two Mozilla employees with the goal of creating trusted web certs for free.
    - Anyone with a domain name can dynamically generate and renew a cert for free.
- Caddy uses Let's Encrypt to generate a web cert every time an HTTPS request is made for a domain name Caddy doesn't have a cert for.
    1. Caddy asks Let's Encrypt to verify the domain for the requested cert is actually owned by the requester
    2. Let's encrypt tells the requester to return a specifically digitally signed response for a temporary URL when an HTTP request to the domain is made.
    3. Let's Encrypt then makes the HTTP request. If successful, issues cert to the requester.

#### To-Do: Enabling HTTPS

- Edit Caddy config file
```sh
vi Caddyfile
```
- Modified it to handle requests for my domain name.
- To save and exit the file, click `esc` then type `:wq`
- Restart Caddy so changes take effect.
```sh
sudo service caddy restart
```




## 9/19/24 - Hypertext Markup Language

- HTML provides the foundational content structure that all web apps build on.
- The concept of web pages were changed into web applications, where a new page represents either a single page application (SPA) or a large group of hyperlinked pages that form a multi-page application (MPA).

- text is valid HTML
- To provide structure to our text, we need to introduce the concept of elements and their associated tag representation.

#### Elements and tags

- HTML elements: represented with enclosing tags that may enclose other elements or text
    - Example: paragraph element and associated tag `p` designate that the text is a structural paragraph of text.
- Tags: refer to a delimited textual name that we use to designate the start and end of an HTML element as it appears in an HTML document.
    - Delimited with `<` and `>` symbols. Closing tags have a `/` before its name.
- `html` element represents the top level page structure.
- `head` element contains metadata about the page and page title.
- `body` element represents the content structure.
- `main` element represents the main content structure, as opposed to things such as headers, footers, asides, and navigation content.

#### Attributes

- HTML elements may have attributes
- Attributes: describe the specific details of the element.
    - Example: `id` attribute gives a unique ID to the element so that you can tell it apart from other elements.
    - Example: `class` attribute designates the element as being classified into a named group of elements.
- Attributes are written inside the element tag with a name followed by an optional value. (use single or double quotes)

#### Hyperlinks

- Represented with an anchor `a` element that has an attribute containing the address of the hyperlink reference `href`.
```html
<a href="https://byu.edu">Go to the Y</a>
```

#### Complete Example

- HTML defines a header `<!DOCTYPE html>` that tells the browser the type and version of the document.

#### Common Elements

| element | meaning |
| ------- | ------- |
| `html`  | The page container |
| `head`  | Header information |
| `title` | Title of the page  |
| `meta`  | Metadata for the page such as character set or viewport settings|
| `script`  | JavaScript reference. Either a external reference, or inline |
| `include` | External content reference |
| `body`    | The entire content body of the page |
| `header`  | Header of the main content |
| `footer`  | Footer of the main content |
| `nav`     | Navigational inputs |
| `main`    | Main content of the page |
| `section` | A section of the main content |
| `aside`   | Aside content from the main content |
| `div`     | A block division of content |
| `span`    | An inline span of content |
| `h<1-9>`  | Text heading. From h1, the highest level, down to h9, the lowest level |
| `p`       | A paragraph of text |
| `b`       | Bring attention |
| `table`   | Table |
| `tr`      | Table row |
| `th`      | Table header |
| `td`      | Table data |
| `ol,ul`   | Ordered or unordered list |
| `li`      | List item |
| `a`       | Anchor the text to a hyperlink |
| `img`     | Graphical image reference |
| `dialog`  | Interactive component such as a confirmation |
| `form`    | A collection of user input |
| `input`   | User input field |
| `audio`   | Audio content |
| `video`   | Video content |
| `svg`     | Scalable vector graphic content |
| `iframe`  | Inline frame of another HTML page |

#### Comments

Can include comments by starting it with `<!--` and ending it with `-->`

#### Special Characters

HTML uses several reserved characters for defining its file format. If you want to use those characters in your content, then escape them using the entity syntax.
- Example: to display a less than symbol `<` you would instead use the less than entity `&lt;`
- Entity syntax can also be used to represent any unicode character.

| Character | Entity      |
| --------- | ----------- |
| &amp;     | `&amp;`     |
| <         | `&lt;`      |
| >         | `&gt;`      |
| "         | `&quot;`    |
| '         | `&apos;`    |
| &#128512; | `&#128512;` |

#### HTML Versions

Different featuress and when they were introduced helps you know what has been around for a long time and is supported by more browsers, and what is new and may not work everywhere.

| Year | Version | Features                                  |
| ---- | ------- | ----------------------------------------- |
| 1990 | HTML1   | format tags                               |
| 1995 | HTML2   | tables, internationalization              |
| 1997 | HTML3   | MathML, CSS, frame tags                   |
| 1999 | HTML4   | external CSS                              |
| 2014 | HTML5   | email, password, media, and semantic tags |

#### index.html

A default web server will display the HTML file named index.html when a web browser, such as Google Chrome, makes a request without asking for a specific HTML file.



## HTML structure elements

- two major purposes of HTML is to provide structure and content to your web app.
- common html structural elements are: body, header, footer, main, section, aside, p, table, ol/ul, div, and span.

#### Block and Inline

- There is a distinction between structure elements that are block vs inline.
- Block element is meant to be a distinct block in the flow of the content structure.
- Inline element is meant to be inline with the content flow of a block element. 
    - AKA, they do not disrupt the flow of a block element's content





## 9/20/24 - HTML input elements

There are different elements for accepting the input of user data.

| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

#### Form element

- Main purpose of the `form` element is to submit the values of the inputs it contains.
- With JavaScript we have much more control over the input data and what is done with it.
    - For example, in a single page application the JavaScript with dynamically rebuild the HTML elements to reflect the result of the user interaction.
    - Form example that submits the value of a textarea element:
```html
<form action="submission.html" method="post">
  <label for="ta">TextArea: </label>
  <textarea id="ta" name="ta-id">
Some text
  </textarea>
  <button type="submit">Submit</button>
</form>
```

#### Input element

Input element represents many different input types. Set the type of input with the `type` attribute. 

| Type           | Meaning                           |
| -------------- | --------------------------------- |
| text           | Single line textual value         |
| password       | Obscured password                 |
| email          | Email address                     |
| tel            | Telephone number                  |
| url            | URL address                       |
| number         | Numerical value                   |
| checkbox       | Inclusive selection               |
| radio          | Exclusive selection               |
| range          | Range limited number              |
| date           | Year, month, day                  |
| datetime-local | Date and time                     |
| month          | Year, month                       |
| week           | Week of year                      |
| color          | Color                             |
| file           | Local file                        |
| submit         | button to trigger form submission |

#### Validating input

Several input elements have validation built into them. They will not accept a value that is not for example, a number, a URL, outside of a range, or an email address.

You can specify the required attribute on an input element to mark it as requiring a value before it can be submitted.

The `pattern` attribute exists on `text`, `search`, `url`, `tel`, `email`, and `password` inputs.





## HTML media elements

HTML elements that represent media are: img, audio, video, svg, and canvas.
- img, audio, and video elements reference to an external file
- svg and canvas both contain code to render a visual image that can be animated.

### External media

Media tags that reference external media all take a URL as an attribute. The path represented by the URL can either be a relative path or full path. (full includes the protocol, domain name, and path to file)

### Internal media

Internal media elements, svg and canvas, allow you to actually create images directly within your HTML.

#### Scalable Vector Graphics (SVG)

SVG is an extremely powerful and widely supported way to render graphics inline in your HTML.

#### Canvas

The canvas element was introducted to HTML in order to facilitate 2D drawing and animation.





## Deploy to production

- deploy to your production environment using the deployFiles.sh script found in the example app.
    - The script does three things: deletes any previous deployment for simon, copies up all of the files found in the project directory, and makes sure Caddy is hosting the files under the simon subdomain of your domain.

```sh
./deployFiles.sh -k ../<folder>/<yourpemkey> -h <yourdomain.click> -s simon
```


## Startup html

- Make sure to add the `deployFiles.sh` file to the src folder with the html files, or you get an error like below:
![DeploymentErrorSS](../Pics/deploymentErrorSS.png)

- To move out of more than one directory, use additional `../` like below:

```sh
./deployFiles.sh -k ../../<folder>/<yourpemkey> -h grocerease.click -s startup
```

- Some things I want to note to implement:
    - Design it so if a user isn't authenticated, index.html will redirect them to login.html
    - Database will contain login data to tell if a user is authenticated





# CSS

## Cascading Style Sheets

- converts structure and content of HTML into a vibrant and responsive design and overall experience.
- nowadays, css focuses more on helping the developer create complex renderings of dynamic content that is responsive to the actions of the user and device the application is rendered on.
- With CSS a web programmer can:
    - animate the page
    - deploy custom fonts
    - respond to user actions
    - dynamically alter the entire layout of the page based on device size and orientation
- CSS is primarily defines rulesets or just simply rules. A rule is comprised of a selector that selects the elements to apply the rule to, and one or more declarations that represent the property to style with the given property value.
![CSSruleAnatomy](../Pics/CSSruleAnatomy.png)
- There are three ways to use CSS with HTML
    1. use the style attribute of an HTML element and explicitly assigne one or more declarations
    2. use the HTML style element to define CSS rules within the HTML document (in the head element of the document)
    3. use the HTML link element to create a hypelink reference to an external file containing CSS rules. Link must appear in the head element of the document.
- element's inherit rules applied to parents, but also the rules cascade down from the highest nodes in the DOM tree to the lowest level. Lower level declarations override higher declarations.

### The box model

- CSS defines everything as boxes, so when you apply styles you are actually applying them to a region of the display that is a rectangular box.
- There are several internal boxes within an element's box.
- Innermost box holds element's content (text, image, etc)
- Next box is padding, which will inherity things like the background color.
- Then there is the border (color, thickness, line style)
- Finally, the last box is the margin, which represents white space as it is considered external to the actual styling of the box.
![boxmode](../Pics/boxmodel.gif)
- by default, the width and height of an element is defined by the width and height of the content box. 
    - change the `box-sizing` CSS property from the default value of the `content-box` to `border-box` in order to redefine the width and height to also include padding and border.

### CSS versions


| Year      | Version | Features   |
| --------- | ------- | ------------------------- |
| 1996      | CSS1    | selectors, font, color, background, alignment, margin, border, padding  |
| 1998      | CSS2    | positioning, z-index, bidirectional text, shadows  |
| 2011      | CSS2.1  | removed incompatible features  |
| 1999-2021 | CSS3    | enhancements for media, box, background, borders, color, template, multi-column, selectors |






## CSS Selectors

### Element type selector

element name selector, such as `body` element to apply style to all the children of the body (whole document)
- there is a wildcard element name selector `*` to select all elements

### Combinators

a descendant combinator is defined with a space delimited list of values where each item in the list is a descendant of the previous.
- Example: a selector that would be all `h2` elements that are descendants of `section` elements
    ```css
    section h2 {
        color: #004400;
    } 
    ```
Some other types of combinators:
| Combinator       | Meaning   | Example        | Description    |
| ---------------- | -------- | -----------| ---------- |
| Descendant       | A list of descendants      | `body section` | Any section that is a descendant of a body |
| Child            | A list of direct children  | `section > p`  | Any p that is a direct child of a section  |
| General sibling  | A list of siblings         | `div ~ p`      | Any p that has a div sibling               |
| Adjacent sibling | A list of adjacent sibling | `div + p`      | Any p that has an adjacent div sibling     |

We can use the general sibling combinator to increase the whitespace padding on the left of paragraphs that are siblings of a level two heading.

### Class selector

Any element can have zero or more classifications applied to it.

Supply class name summary prefixed with a period such as:
```css
.summary {
    font-weight: bold;
}
```
You can also combine the element name and class selectors to select all paragraphs with a class of summary.
```css
p.summary {
    font-weight: bold;
}
```

### ID selector

All IDs should be unique within an HTML document and so this select targets a specific element. To use the ID selector you prefix the ID with the hash symbol `(#)`.
```css
#physics {
    border-left: solid 1em purple;
}
```

### Attribute selector

You use an attribute selector to select any element with a given attribute (`a[href]`). You can also specify a required value for an attribute (`a[href="./fish.png"]`) in order for the selector to match. 

Attribute selectors also support wildcards such as the ability to select attribute values containing specific text (`p[href*="https://"]`).

```css
p[class='summary'] {
    color: red;
}
```

### Pseudo selector

CSS also defines a significant list of pseudo selectors which select based on positional relationships, mouse interactions, hyperlink visitation states, and attributes.

Example: we want our purple highlight bar to appear only when the mouse hovers over the text. To accomplish this we can change our ID selector to select whenever a section is hovered over.
```css
section:hover {
    border-left: solid 1em purple;
}
```





## CSS Declarations

CSS rule declarations specify a property and value to assign when the rule selector matches one or more elements.

| Property           | Value                              | Example             | Discussion                                                                     |
| ------------------ | ---------------------------------- | ------------------- | ------------------------------------------------------------------------------ |
| background-color   | color                              | `red`               | Fill the background color                                                      |
| border             | color width style                  | `#fad solid medium` | Sets the border using shorthand where any or all of the values may be provided |
| border-radius      | unit                               | `50%`               | The size of the border radius                                                  |
| box-shadow         | x-offset y-offset blu-radius color | `2px 2px 2px gray`  | Creates a shadow                                                               |
| columns            | number                             | `3`                 | Number of textual columns                                                      |
| column-rule        | color width style                  | `solid thin black`  | Sets the border used between columns using border shorthand                    |
| color              | color                              | `rgb(128, 0, 0)`    | Sets the text color                                                            |
| cursor             | type                               | `grab`              | Sets the cursor to display when hovering over the element                      |
| display            | type                               | `none`              | Defines how to display the element and its children                            |
| filter             | filter-function                    | `grayscale(30%)`    | Applies a visual filter                                                        |
| float              | direction                          | `right`             | Places the element to the left or right in the flow                            |
| flex               |                                    |                     | Flex layout. Used for responsive design                                        |
| font               | family size style                  | `Arial 1.2em bold`  | Defines the text font using shorthand                                          |
| grid               |                                    |                     | Grid layout. Used for responsive design                                        |
| height             | unit                               | `.25em`             | Sets the height of the box                                                     |
| margin             | unit                               | `5px 5px 0 0`       | Sets the margin spacing                                                        |
| max-[width/height] | unit                               | `20%`               | Restricts the width or height to no more than the unit                         |
| min-[width/height] | unit                               | `10vh`              | Restricts the width or height to no less than the unit                         |
| opacity            | number                             | `.9`                | Sets how opaque the element is                                                 |
| overflow           | [visible/hidden/scroll/auto]       | `scroll`            | Defines what happens when the content does not fix in its box                  |
| position           | [static/relative/absolute/sticky]  | `absolute`          | Defines how the element is positioned in the document                          |
| padding            | unit                               | `1em 2em`           | Sets the padding spacing                                                       |
| left               | unit                               | `10rem`             | The horizontal value of a positioned element                                   |
| text-align         | [start/end/center/justify]         | `end`               | Defines how the text is aligned in the element                                 |
| top                | unit                               | `50px`              | The vertical value of a positioned element                                     |
| transform          | transform-function                 | `rotate(0.5turn)`   | Applies a transformation to the element                                        |
| width              | unit                               | `25vmin`            | Sets the width of the box                                                      |
| z-index            | number                             | `100`               | Controls the positioning of the element on the z axis                          |


### Units

- You can use a variety of units when defining size of a CSS property

| Unit | Description                                                      |
| ---- | ---------------------------------------------------------------- |
| px   | The number of pixels                                             |
| pt   | The number of points (1/72 of an inch)                           |
| in   | The number of inches                                             |
| cm   | The number of centimeters                                        |
| %    | A percentage of the parent element                               |
| em   | A multiplier of the width of the letter `m` in the parent's font |
| rem  | A multiplier of the width of the letter `m` in the root's font   |
| ex   | A multiplier of the height of the element's font                 |
| vw   | A percentage of the viewport's width                             |
| vh   | A percentage of the viewport's height                            |
| vmin | A percentage of the viewport's smaller dimension                 |
| vmax | A percentage of the viewport's larger dimension                  |

### Color

| Method       | Example                   | Description                                                                                                                                                                                                       |
| ------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyword      | `red`                     | A set of predefined colors (e.g. white, cornflowerblue, darkslateblue)                                                                                                                                            |
| RGB hex      | `#00FFAA22` or `#0FA2`    | Red, green, and blue as a hexadecimal number, with an optional alpha opacity                                                                                                                                      |
| RGB function | `rgb(128, 255, 128, 0.5)` | Red, green, and blue as a percentage or number between 0 and 255, with an optional alpha opacity percentage                                                                                                       |
| HSL          | `hsl(180, 30%, 90%, 0.5)` | Hue, saturation, and light, with an optional opacity percentage. Hue is the position on the 365 degree color wheel (red is 0 and 255). Saturation is how gray the color is, and light is how bright the color is. |





## CSS Fonts

### Font families

There are four major families of fonts: `Serif`, `sans-serif`, `fixed`, and `symbol`. 
- A serif is a small stroke attached to the ends of a character's major strokes.
- Serif fonts have the extra strokes; sans-serif fonts do not.
- Fixed fonts characters all are the same size. This is useful for lining up text when doing things like coding or displaying tabular data.
- Symbol fonts represent non-language characters such as arrows or emojis.

### Importing fonts

You can specify a font that you provide with your application. That way your application is guaranteed to always look the same. In order to have the browser load a font you use the @font-face rule and provide the font name and source location.
```css
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.ttf');
}

p {
  font-family: Quicksand;
}
```






## CSS Animation

You create CSS animations using the `animation` properties and defining `keyframes` for what the element should look like at different times in the animation.





## Responsive Design

Responsive design is the ability to configure the interface so the application accommodates and takes advantage of the screen's size and orientation.

### Display

- CSS display property allows you to change how an element is displayed by the browser.

| Value  | Meaning    |
| ------ | ------------------- |
| none   | Don't display this element. The element still exists, but the browser will not render it.                                    |
| block  | Display this element with a width that fills its parent element. A `p` or `div` element has block display by default.        |
| inline | Display this element with a width that is only as big as its content. A `b` or `span` element has inline display by default. |
| flex   | Display this element's children in a flexible orientation.     |
| grid   | Display this element's children in a grid orientation.  |

- By default, `div` elements have a displahy property value of `block`.

### Viewport meta tag

Mobile browsers auto started scaling websites so they look better on a small screen, but as web apps started being responsive to screen size, the scaling would get in the way.

- Solution is to include a meta tag in the `head` element of your HTML pages. This tells your browser to not scale the page.

```html
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

### Float

The float CSS property moves an element to the left or right of its container element and allows inlihne elements to wrap around it.

### Media queries

One of the main CSS features for creating responsive applications is the `@media` selector. This dynamically detects the size and orientatio of the device and applies CSS rules to represent the structure of HTML in a way that accommodates the change.

- Example: to see if the screen is in portrait mode or not:
    ```css
    @media (orientation: portrait) {
        div {
        transform: rotate(270deg);
        }
        aside {
            display: none;
        }
    }
    ```





## CSS Grid

- The grid display layout is useful when you want to display a group of child elements in a responsive grid.
- We turn this into a responsive grid by including a CSS display property with the value of grid on the container element. (This tells the browser that all of the children of this element are to be displayed in a grid flow.)
- The grid-template-columns property specifies the layout of the grid columns. We set this to repeatedly define each column to auto-fill the parent element's width with children that are resized to a minimum of 300 pixels and a maximum of one equal fractional unit (1fr) of the parents total width.
- Next, we fix the height of the rows to be exactly 300 pixels by specifying the grid-auto-rows property.
- Finally, we finish off the grid configuration by setting the grid-gap property to have a gap of at least 1 em between each grid item.

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```





## CSS Flexbox

The `flex` display layout is useful when you want to partition your application into areas that responsively move around as the window resizes or orientation changes.

To get the division of space for the flexbox children correct we add the following flex properties to each of the children.
- header - flex: 0 80px - Zero means it will not grow and 80px means it has a starting basis height of 80 pixels. This creates a fixed size box.
- footer - flex: 0 30px - Like the header it will not grow and has a height of 30 pixels.
- main - flex: 1 - One means it will get one fractional unit of growth, and since it is the only child with a non-zero growth value, it will get all the remaining space. We want it to also be a flexbox container for the controls and content area. So we set its display to be flex and specify the flex-direction to be row so that the children are oriented side by side.








## CSS Frameworks

CSS frameworks provide functions and components that commonly appear in web apps. When apps begin to use the same patterns over and over, these patterns were combined into a shared package of code and are now open source repos.

They decrease the time to develop an app and create a common user experience for the web overall.

### Tailwind

Tailwind takes a different approach than traditional CSS frameworks, using smaller definitions that are applied specifically to individual HTML elements (rather than using large, rich, CSS rulesets).
- This moves a lot of the CSS representation out of the CSS file and into the HTML.

Example:
```html
<div class="pt-6 md:p-8 text-center md:text-left space-y-4">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="profile.png" />
  <p class="text-lg font-medium">“Tailwind CSS”</p>
</div>
```

### Bootstrap

Most popular framework by far. Has a lot of lessons learned from real world apps.
- Major downside is it's success. Because it is so popular, it defines the de facto look and feel of websites. This is good for user experience, but it makes it harder to grab new user attention.

To integrate bootstrap into a web app, you need to reference the Bootstrap CSS files from their CDN (content delivery network). Then add the html link elements to your head element. Example below.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
  <body>
    ...
  </body>
</html>
```

If you are planning to include Bootstrap's components that require JS, you will need to include the Bootstrap JS module. Put the following at the end of your HTML body element to do so.

```html
<body>
  ...

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"
  ></script>
</body>
```

To include bootstrap in your app using NPM, run the following from your console

```sh
npm install bootstrap@5.2.3
```

#### Using bootstrap

Once bootstrap is linked in your html files, you can use the components it provides. You change the class to a bootstrap specific class. In the example below, the `btn` class gives the button a nice looking rounded appearance, and the `btn-primary` class shades the button with the current primary color for the app (default is blue).

```html
<button type="button" class="btn btn-primary">Bootstrap</button>
```











# JavaScript

## Introduction

Officially known as EXMAScript, it is a weakly typed languages based on concepts found in C, Java, and Scheme.
- Most used programming language in the world, running on every browser and commonly used as a web server language and for creating serverless functions.
- Typically it is executed using an interpreter at runtime instead of compiling it into a machine specific binary at build time.
    - This makes JS very portable, but also allows for a lot of errors, such as using an undefined variable (errors normally only get discovered when the program crashes during an execution)

### Getting Started

JavaScript's runtime's built in function `console.log` outputs the string to the debugger console.

### Comments

you can make comments with block or line comments

### Code delimiters

Not required, but suggested, to end JS statements with a semicolon `;`. Code block and their scope are defined with curly braces `{ }`.




## JavaScript Console

JS console object provides interaction with the JS runtime's debugger console. It provides functionality for outputting the value of text and objects, running timers, and counting iterations.

### Log

Basic usage of the console object is to output a log message.

```js
console.log('hello');
// output: hello
```

You can format the messages in the log parameter.

```js
console.log('hello %s', 'wordl');
// output: hello world
```

You can even specify CSS declarations to style the log output.

```js
console.log('%c JavaScript demo', 'font-size:1.5em; color:green');
// output (in large green text): JavaScript Demo 
```

### Timers

If you want to see how long a piece of code is running, you can wrap it with `time` and `timeEnd` calls and it will put the duration between the `time` and `timeEnd` calls.

```js
console.time('demo time');
// ... some code that takes a long time
console.timeEnd('demo time');
// output: demo time: 9762.74 ms
```

### Count

To see how many times a block of code is called you can use the `count` function

```js
console.count('a');
// output: a: 1
console.count('a');
// output: a: 2
console.count('b');
// output: a: 1
```



## Adding JavaScript to HTML

You can add JS to HTML by either directly including it within a `<script>` element, or by using the `src` attribute to reference a JS file.

Special attributes such as `onclick` automatically create event listeners for different DOM events that call the code contained in the attribute's value.

```js
<button onclick="let i=1;i++;console.log(i)">press me</button>
<!-- OUTPUT: 2 -->
```




## JavaScript type and construct

### Declaring variables

Variables are declares using either the `let` or `const` keyword.
- `let` allows you to change the value of the variable
- `const` will cause an error if you try to change it

```js
let x = 1;

const y = 2;
```

the keyword `var` has been depricated since it causes hard to detect errors in code related to the scope of the variable.

### Type

| Type        | Meaning   |
| ----------- | -----------|
| `Null`      | The type of a variable that has not been assigned a value. |
| `Undefined` | The type of a variable that has not been defined.  |
| `Boolean`   | true or false.  |
| `Number`    | A 64-bit signed number.   |
| `BigInt`    | A number of arbitrary magnitude.   |
| `String`    | A textual sequence of characters.  |
| `Symbol`    | A unique value.   |

Of these types Boolean, Number, and String are the types commonly thought of when creating variables. However, variables may refer to the Null or Undefined primitive. Because JavaScript does not enforce the declaration of a variable before you use it, it is entirely possible for a variable to have the type of Undefined.

In addition to the above primitives, JavaScript defines several object types. Some of the more commonly used objects include the following:

| Type       | Use  | Example   |
| ---------- | ------ | ------------------------ |
| `Object`   | A collection of properties represented by name-value pairs. Values can be of any type. | `{a:3, b:'fish'}` |
| `Function` | An object that has the ability to be called. | `function a() {}` |
| `Date` | Calendar dates and times.  | `new Date('1995-12-17')` |
| `Array` | An ordered sequence of any type. | `[3, 'fish']` |
| `Map` | A collection of key-value pairs that support efficient lookups. | `new Map()` |
| `JSON` | A lightweight data-interchange format used to share information across programs. | `{"a":3, "b":"fish"}` |

### Common Operators

When dealing with a number variable, JS supports standard mathematical operators like `+`, `-`, `*`, `/`, and `===` (equality). For string variables, it supports concatenation `+` and equality `===`.

### Type conversions

JS is a weakly typed language, meaning a variable always has a type, but the variable can change type when it is assigned a new value, or that types can be automatically converted based on the context they are used in.

```js
2 + '3';
// OUTPUT: '23'
2 * '3';
// OUTPUT: 6
[2] + [3];
// OUTPUT: '23'
true + null;
// OUTPUT: 1
true + undefined;
// OUTPUT: NaN
```

Getting unexpected results is especially common when dealing with the `equality` operator.

```js
1 == '1';
// OUTPUT: true
null == undefined;
// OUTPUT: true
'' == false;
// OUTPUT: true
```

- The unexpected results happen in JavaScript because it uses complex rules for defining equality that depend upon the conversion of a type to a boolean value. You will sometimes hear this referred to as falsy and truthy evaluations.
    - To remove this confusion, JavaScript introduced the strict equality (===) and inequality (!==) operators. The strict operators skip the type conversion when computing equality. This results in the following.

    ```js
    1 === '1';
    // OUTPUT: false
    null === undefined;
    // OUTPUT: false
    '' === false;
    // OUTPUT: false
    ```

    - Because strict equality is considered more intuitive, it is almost always preferred and should be used in your code.

```js
('b' + 'a' + +'a' + 'a').toLowerCase();
// output: banana
```

### Conditionals

JS supports common programming language conditional constructs such as `if`, `else`, and `if else`.

```js
if (a === 1) {
  //...
} else if (b === 2) {
  //...
} else {
  //...
}
```

You can also use the ternary operator, which provides a compact `if else` representation.

```js
a === 1 ? console.log(1) : console.log('not 1');
```

You can include boolean operations to create complex predicates, such as `&&` (and), `||` (or), and `!` (not).

```js
if (true && (!false || true)) {
  //...
}
```

### Loops

JS supports `for`, `for in`, `for of`, `while`, `do while`, and `switch`.

### for

Note the introduction of the common post increment operation (`i++`) for adding one to a number.

```js
for (let i = 0; i < 2; i++) {
  console.log(i);
}
// OUTPUT: 0 1
```

### do while

```js
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 2);
// OUTPUT: 0 1
```

### while

```js
let i = 0;
while (i < 2) {
  console.log(i);
  i++;
}
// OUTPUT: 0 1
```

### for in

The `for in` statement iterates over an object's property names.

```js
const obj = { a: 1, b: 'fish' };
for (const name in obj) {
  console.log(name);
}
// OUTPUT: a
// OUTPUT: b
```

For arrays the object's name is the array index.

```js
const arr = ['a', 'b'];
for (const name in arr) {
  console.log(name);
}
// OUTPUT: 0
// OUTPUT: 1
```

### for of

The `for of` statement iterates over an iterable's (Array, Map, Set, ...) property values.

```js
const arr = ['a', 'b'];
for (const val of arr) {
  console.log(val);
}
// OUTPUT: 'a'
// OUTPUT: 'b'
```

### Break and continue

All of the looping constructs demonstrated above allow for either a `break` or `continue` statement to abort or advance the loop.

```js
let i = 0;
while (true) {
  console.log(i);
  if (i === 0) {
    i++;
    continue;
  } else {
    break;
  }
}
// OUTPUT: 0 1
```





## JavaScript string

A string variable is specified by surrounding a sequence of characters with single quotes `'`, double quotes `"`, or backticks `` ` ``.

The meaning of single or double quotes are equivalent, but the backtick defines a string literal that may contain JavaScript that is evaluated in place and concatenated into the string.
- A string literal replacement specifier is declared with a dollar sign followed by a curly brace pair. Anything inside the curly braces is evaluated as JavaScript.
- You can also use backticks to create multiline strings without having to explicitly escape the newline characters using `\n`.

```js
'quoted text'; // " also works

const l = 'literal';
console.log(`string ${l + (1 + 1)} text`);
// OUTPUT: string literal2 text
```

### Unicode support

JS supports unicode by defining a string as a sequence of 16 bit unsigned integers that represent UTF-16-encoded characters. Unicode support allows JavaScript to represent most languages spoken on the planet, include those read from right to left.

Internationalization: make your web app fully internationalized, including handling of currency, time, dates, iconography, units of measure, keyboard layouts, and respecting local customs.

### String functions

The string object has several interesting functions associated with it. Here are some of the commonly used ones.

| Function      | Meaning      |
| ------------- | -----------|
| length        | The number of characters in the string   |
| indexOf()     | The starting index of a given substring   |
| split()       | Split the string into an array on the given delimiter string |
| startsWith()  | True if the string has a given prefix   |
| endsWith()    | True if the string has a given suffix |
| toLowerCase() | Converts all characters to lowercase  |

```js
const s = 'Example:조선글';

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf('조선글'));
// OUTPUT: 8
console.log(s.split(':'));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith('Ex'));
// OUTPUT: true
console.log(s.endsWith('조선글'));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글
```





## Functions

In JS, functions are first class objects, meaning that they can be:
- assigned a name
- passed as a parameter
- returned as a result
- referenced from an object or array like any other variable

Basic syntax of a function begins with the `function` keyword followed by zero or more parameters and a body that may contain zero or more return statements.
- the return statement may return a single value
- there are no type declarations, as the tuype is always inferred by the assignment of the value to the parameter

```js
function hello(who) {
  return 'hello ' + who;
}

console.log(hello('world'));
// OUTPUT: hello world
```

A function without a return value usually exists to produce some side effect like modifying a parameter or interacting with an external program.
- In the example below, the side effect of the function is to output text to the debugger console.
```js
function hello(who) {
  who.count++;
  console.log('hello ' + who.name);
}

hello({ name: 'world', count: 0 });
// OUTPUT: hello world
```

### Function parameters

When a function is called, the caller may choose what parameters to provide.

If a parameter isn't provided, then the value of the parameter is `undefined` when the function executes.

On top of explicityly passing the value of a parameter to a function, the function can define a default value. Do this by assigning a value to the parameter in the function declaration.

```js
function labeler(value, title = 'title') {
  console.log(`${title}=${value}`);
}

labeler();
// OUTPUT: title=undefined

labeler('fish');
// OUTPUT: title=fish

labeler('fish', 'animal');
// OUTPUT: animal=fish
```

### Anonymous functions

Functions in JS are assigned to a variable so they can be passed as a parameter to some other function or stored as an object property. To support this you define a function anonymously and assign it to a variable. 
```js
// Function that takes a function as a parameter
function doMath(operation, a, b) {
  return operation(a, b);
}

// Anonymous function assigned to a variable
const add = function (a, b) {
  return a + b;
};

console.log(doMath(add, 5, 3));
// OUTPUT: 8

// Anonymous function assigned to a parameter
console.log(
  doMath(
    function (a, b) {
      return a - b;
    },
    5,
    3
  )
);
// OUTPUT: 2
```

### Creating, passing, and returning functions

```js
// Anonymous declaration of the function that is later assigned to a variable
const add = function (a, b) {
  return a + b;
};

// Function that logs as a side effect of its execution
function labeler(label, value) {
  console.log(label + '=' + value);
}

// Function that takes a function as a parameter and then executes the function as a side effect
function addAndLabel(labeler, label, adder, a, b) {
  labeler(label, adder(a, b));
}

// Passing a function to a function
addAndLabel(labeler, 'a+b', add, 1, 3);
// OUTPUT: a+b=4

// Function that returns a function
function labelMaker(label) {
  return function (value) {
    console.log(label + '=' + value);
  };
}

// Assign a function from the return value of the function
const nameLabeler = labelMaker('name');

// Calling the returned function
nameLabeler('value');
// OUTPUT: name=value
```

### Inner functions

functions can be declared inside other functions, allowing yu to modularize your code without exposing private details.

```js
function labeler(value) {
  function stringLabeler(value) {
    console.log('string=' + value);
  }
  function numberLabeler(value) {
    console.log('number=' + value);
  }

  if (typeof value == 'string') {
    stringLabeler(value);
  } else if (typeof value == 'number') {
    numberLabeler(value);
  }
}

labeler(5);
// OUTPUT: number=5

labeler('fish');
// OUTPUT: string=fish
```







## JavaScript arrow function

Functions are first order objects in JS, so they can be declared anywhere and passed as parameters. This results in code with a lot of anonymous functions cluttering things up.

Make code more compact with the `arrow` syntax. This replaces the need for the `function` keyword and the symbols `=>` places after the parameter declaration. (`{ }` are also optional)

### Return values

Arrow functions have special rules for the `return` keyword. It is optional if no curly braces are provided for the function and it contains a single expression. Result of expression is auto returned in that case.

### This pointer

Next, arrow functions inherit the `this` pointer from the scope in which they are created. This makes what is known as a `closure`.
- closures allow a function to continue referencing its creation scope, even after it has passed out of that scope.

Example: the function `makeClosure` returns an anonymous function using the arrow syntax. The `a` parameter is overridden, a new `b` variable is created, and both `a` and `b` are references in the arrow function. They are both part of the closure for the returned function becauase of that reference.

```js
function makeClosure(a) {
  a = `a2`;
  const b = `b2`;
  return () => [a, b];
}
```

Next, we declare the variables `a` and `b` at the top level scope, and call `makeClosure` with `a`.

```js
const a = `a`;
const b = `b`;

const closure = makeClosure(a);
```

Now, when we call the `closure` function, it will output the values contained in the scope in which it was created, instead of the current values of the variables.

```js
console.log(closure());
// OUTPUT: ['a2', 'b2']

console.log(a, b);
// OUTPUT: 'a' 'b'
```

Closure provides a valuable property when we do things like execute JS within the scope of an HTML page, because it can remember the values of variables when the function was created instead of what they are when executed.

### Putting it all together

Now that you know how functions work in JavaScript, let's look at an example that demonstrates the use of functions, arrow functions, parameters, a function as a parameter (callback), closures, and browser event listeners. This is done by implementing a `debounce` function.

The point of a debounce function is to only execute a specified function once within a given time window. Any requests to execute the debounce function more frequently than this will case the time window to reset. This is important in cases where a user can trigger expensive events thousands of times per second. Without a debounce the performance of your application can greatly suffer.

The following code calls the browser's `window.addEventListener` function to add a callback function that is invoked whenever the user scrolls the browser's web page. The first parameter to `addEventListener` specifies that it wants to listen for `scroll` events. The second parameter provides the function to call when a scroll event happens. In this case we call a function named `debounce`.

The debounce function takes two parameters, the time window for executing the window function, and the window function to call within that limit. In this case we will execute the arrow function at most every 500 milliseconds.

```js
window.addEventListener(
  'scroll',
  debounce(500, () => {
    console.log('Executed an expensive calculation');
  })
);
```

The debounce function implements the execution of windowFunc within the restricted time window by creating a closure that contains the current timeout and returning a function that will reset the timeout every time it is called. The returned function is what the scroll event will actually call when the user scrolls the page. However, instead of directly executing the `windowFunc` it sets a timer based on the value of `windowMs`. If the debounce function is called again before the window times out then it resets the timeout.

```js
function debounce(windowMs, windowFunc) {
  let timeout;
  return function () {
    console.log('scroll event');
    clearTimeout(timeout);
    timeout = setTimeout(() => windowFunc(), windowMs);
  };
}
```





## JavaScript Array

JS array objects represent a sequence of other objects & primitives.
- You can reference the members of the array using a zero based index. 
- You can create an array with the Array constructor or using the array literal notation (below).
  ```js
  const a = [1, 2, 3];
  console.log(a[1]);
  // OUTPUT: 2

  console.log(a.length);
  // OUTPUT: 3
  ```

### Object functions

Array object has several static functions. 

| Function | Meaning                                                   | Example                       |
| -------- | --------------------------------------------------------- | ----------------------------- |
| push     | Add an item to the end of the array                       | `a.push(4)`                   |
| pop      | Remove an item from the end of the array                  | `x = a.pop()`                 |
| slice    | Return a sub-array                                        | `a.slice(1,-1)`               |
| sort     | Run a function to sort an array in place                  | `a.sort((a,b) => b-a)`        |
| values   | Creates an iterator for use with a `for of` loop          | `for (i of a.values()) {...}` |
| find     | Find the first item satisfied by a test function          | `a.find(i => i < 2)`          |
| forEach  | Run a function on each array item                         | `a.forEach(console.log)`      |
| reduce   | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)`   |
| map      | Run a function to map an array to a new array             | `a.map(i => i+i)`             |
| filter   | Run a function to remove items                            | `a.filter(i => i%2)`          |
| every    | Run a function to test if all items match                 | `a.every(i => i < 3)`         |
| some     | Run a function to test if any items match                 | `a.some(i => i < 1)`          |

```js
const a = [1, 2, 3];

console.log(a.map((i) => i + i));
// OUTPUT: [2,4,6]
console.log(a.reduce((v1, v2) => v1 + v2));
// OUTPUT: 6
console.log(a.sort((v1, v2) => v2 - v1));
// OUTPUT: [3,2,1]

a.push(4);
console.log(a.length);
// OUTPUT: 4
```






## JSON

JavaScript Object Notation (JSON) provides a simple and effective way to share and store data. By design, it is easily convertible to and from JS objects. This makes it a convenient data format when working with web technologies.

### Format

A JSON document contains one of the following data types:

| Type    | Example                 |
| ------- | ----------------------- |
| string  | "crockford"             |
| number  | 42                      |
| boolean | true                    |
| array   | [null,42,"crockford"]   |
| object  | {"a":1,"b":"crockford"} |
| null    | null                    |

Most common, a JSON document contains an object. Objects have zero or more key value pairs. Key is always a string, and the value must be one of the valid JSON data types.
- Key value pairs are delimited with commas.
- Curly braces delimit an object
- Square brackets and commas delimit arrays
- Double quotes delimit strings

Example of JSON document (always encoded with UTF-8, allowing for representation of globabl data):
```json
{
  "class": {
    "title": "web programming",
    "description": "Amazing"
  },
  "enrollment": ["Marco", "Jana", "فَاطِمَة"],
  "start": "2025-02-01",
  "end": null
}
```

### Converting to JS

Convert JSON to, and from, JS using the `JSON.parse` and `JSON.stringify` functions.
```json
const obj = { a: 2, b: 'crockford', c: undefined };
const json = JSON.stringify(obj);
const objFromJson = JSON.parse(json);

console.log(obj, json, objFromJson);

// OUTPUT:
// {a: 2, b: 'crockford', c: undefined}
// {"a":2, "b":"crockford"}
// {a: 2, b: 'crockford'}
```

In this example, JSON cannot represent the JS `undefined` object so it gets dropped during conversion.







## JavaScript object and classes

A JS object represents a collection of name value pairs referred to as properties. The property name must be of type String or Symbol, but value can be any type.

Objects also have common object oriented functionality such as constructors, a `this` pointer, static properties and functions, and inheritance.

Objects can be created with the new operator. This causes the object's constructor to be called. Once declared you can add properties to the object by referencing the property name in an assignment.
- Any type of variable can be assigned to a property, including a sub-object, array, or function.
- properties of an object can be referenced either with dot (`obj.prop`) or bracket notation (`obj['prop']`).

```js
const obj = new Object({ a: 3 });
obj['b'] = 'fish';
obj.c = [1, 2, 3];
obj.hello = function () {
  console.log('hello');
};

console.log(obj);
// OUTPUT: {a: 3, b: 'fish', c: [1,2,3], hello: func}
```

The ability to dynamically modify an object is useful when manipulating data with an indeterminate structure.

### Object-literals

You can declare a variable of an object type with the `object-literal` syntax as well. This allows you to provide the initial composition of the object.

```js
const obj = {
  a: 3,
  b: 'fish',
};
```

### Object functions

Object has several static functions with it.

| Function | Meaning                             |
| -------- | ----------------------------------- |
| entries  | Returns an array of key value pairs |
| keys     | Returns an array of keys            |
| values   | Returns an array of values          |

```js
const obj = {
  a: 3,
  b: 'fish',
};

console.log(Object.entries(obj));
// OUTPUT: [['a', 3], ['b', 'fish']]
console.log(Object.keys(obj));
// OUTPUT: ['a', 'b']
console.log(Object.values(obj));
// OUTPUT: [3, 'fish']
```

### Constructor

Any function that returns an object is considered a `constructor` and can be inboked with the `new` operator.
```js
function Person(name) {
  return {
    name: name,
  };
}

const p = new Person('Eich');
console.log(p);
// OUTPUT: {name: 'Eich'}
```

Objects can have any type of property value, so you can create methods on the object as part of its encapsulation

```js
function Person(name) {
  return {
    name: name,
    log: function () {
      console.log('My name is ' + this.name);
    },
  };
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
```

### This pointer

The meanining of `this` depends on the scope of where it is used, but in the context of an object it refers to a pointer to the object.

### Classes

Use classes to define objects. Using a class clarifies the intent to create a reusable component rather than a one off object. Class declarations look similar to declaring an object, but classes have an explicit constructor and assumed function declarations. Person object from above would look like the following when converted to a class.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  log() {
    console.log('My name is ' + this.name);
  }
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
```

You can make properties and functions of classes private by prefixing them with a #.

```js
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }
}

const p = new Person('Eich');
p.#name = 'Lie';
// OUTPUT: Uncaught SyntaxError: Private field '#name' must be declared in an enclosing class
```

### Inheritance

Classes can be extended by using the `extends` keyword to define inheritance. Parameters that need to be passed to the parent class are delivered using the `super` function. Any functions defined on the child that have the same name as the parent override the parent's implementation. A parent's function can be explicitly accessed using the `super` keyword.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  print() {
    return 'My name is ' + this.name;
  }
}

class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  print() {
    return super.print() + '. I am a ' + this.position;
  }
}

const e = new Employee('Eich', 'programmer');
console.log(e.print());
// OUTPUT: My name is Eich. I am a programmer
```







## JavaScript regular expressions

Regular expression support is built into JS. You use a regular expression to find text in a string so that you can replace it, or simply to know that it exists.

You can create a regular expression using the class constructor or a regular expression literal.

```js
const objRegex = new RegExp('ab*', 'i');
const literalRegex = /ab*/i;
```

The `string` class has several functions that accept regular expressions. This includes `match`, `replace`, `search`, and `split`. For a quick test to see if there is a match you can use the regular expression object's `test` function.

```js
const petRegex = /(dog)|(cat)|(bird)/gim;
const text = 'Both cats and dogs are pets, but not rocks.';

text.match(petRegex);
// RETURNS: ['cat', 'dog']

text.replace(petRegex, 'animal');
// RETURNS: Both animals and animals are pets, but not rocks.

petRegex.test(text);
// RETURNS: true
```






## JavaScript rest and spread

### Rest

Sometimes you want a function to take an unknown number of parameters. For example, if you want to write a funciton that checks to see if some number in a list is equal to a given number, you could write this using an array.
```js
function hasNumber(test, numbers) {
  return numbers.some((i) => i === test);
}

const a = [1, 2, 3];
hasNumber(2, a);
// RETURNS: true
```

But sometimes you don't have an array to work with, so you need to create one.
```js
function hasTwo(a, b, c) {
  return hasNumber(2, [a, b, c]);
}
```

But JS provides the `rest` syntax to make this easier. It is like a parameter that contains the `rest` of the parameters. To turn the last parameter of any function into a `rest` parameter, you prefix it with three periods. You can call it with any number of parameters and they are automatically combined into an array.
```js
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
```

NOTE: you can only make the last parameter into a `rest` parameter. Otherwise, JS would not know which parameters to combine into the array.
- `rest` allows JS to provide variadic functions

### Spread

Spread does the opposite of rest. It take an object that is iterable (e.g. array or string) and expands it into a function's parameters. Consider the following.
```js
function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}

const p = person(...['Ryan', 'Dahl']);
console.log(p);
// OUTPUT: {first: 'Ryan', last: 'Dahl'}
```






## JavaScript exceptions

JS supports exception handling using the `try catch` and `throw` syntax. An exception can be triggered whenever your code generates an exception using the `throw` keyword, or whenver and exception is generated by the JS runtime, for example, when an undefined variable is used.

To catch a thrown exception, you wrap a code block with the `try` keyword, and follow the try block with a `catch` block. If within the try block, including any functions that block calls, and exception is thrown then all the code after is ignored, call stack is unwound, and catch block is called.

On top of a catch block, you can speicfy a `finally` block that is always called whenever the `try` block is exited regardless if an exception was ever thrown.

The basic syntax looks like the following.
```js
try {
  // normal execution code
} catch (err) {
  // exception handling code
} finally {
  // always called code
}
```

For example:
```js
function connectDatabase() {
  throw new Error('connection error');
}

try {
  connectDatabase();
  console.log('never executed');
} catch (err) {
  console.log(err);
} finally {
  console.log('always executed');
}

// OUTPUT: Error: connection error
//         always executed
```

### Fallbacks

The fallback pattern is commonly implemented using exception handling. To implement the fallback pattern you put the normal feature path in a try block and then provide a fallback implementation in the catch block.

For example, normally you would get the high scores for a game by making a network request, but if the netwrok is not available then a locally cached version of the last available scores is used. By providing a fallback, you can always return something, even if the desired feature is temporarily unavailable.

```js
function getScores() {
  try {
    const scores = scoringService.getScores();
    // store the scores so that we can use them later if the network is not available
    window.localStorage.setItem('scores', scores);
    return scores;
  } catch {
    return window.localStorage.getItem('scores');
  }
}
```





## JavaScript destructuring

Destructuring, not to be confused with destructing, is the process of pulling individual items out of an existing one, or removing structure. You can do this with either arrays or objects. This is helpful when you only care about a few items in the original structure.

An example of destructuring arrays looks like the following.

```js
const a = [1, 2, 4, 5];

// destructure the first two items from a, into the new variables b and c
const [b, c] = a;

console.log(b, c);
// OUTPUT: 1, 2
```

NOTE: even though it looks like you are declaring an array with the syntax on the left side of the expression, it is only specifying that you want to destructure those values out of the array.

You can also combine multiple items from the original object using rest syntax.

```js
const [b, c, ...others] = a;

console.log(b, c, others);
// OUTPUT: 1, 2, [4,5]
```

This works in a similar manner for objects, except with arrays, the assignment of the associated value was assumed by the positions in the two arrays. When destructuring objects, you explicitly specify the properties you want to pull from the source object.

```js
const o = { a: 1, b: 'animals', c: ['fish', 'cats'] };

const { a, c } = o;

console.log(a, c);
// OUTPUT 1, ['fish', 'cats']
```

You can also map the names to new variables instead of just using the original property names.

```js
const o = { a: 1, b: 'animals', c: ['fish', 'cats'] };

const { a: count, b: type } = o;

console.log(count, type);
// OUTPUT 1, animals
```

Default values may also be provided for missing ones.

```js
const { a, b = 22 } = {};
const [c = 44] = [];

console.log(a, b, c);
// OUTPUT: undefined, 22, 44
```

Note that all of the above examples created new constant variables, but you can also use destructuring to reassign existing variables.

```js
let a = 22;

[a] = [1, 2, 3];

console.log(a);
// OUTPUT: 1
```






## Scope

Scope is the variables that are visible in the current context of execution. JS has four different types of scope:
1. Global - visible to all code
2. Module - visible to all code running in a module
3. Function - visible within a function
4. Block - visible within a block of code delimited by curly braces

### Var

Initially JS used the keywords `var` to declar a variable, but the problem with it was that unline `const` or `let`, is that it ignores block scope. Variables declared with the `var` are always logically hoisted to the top of the function.

For example, the code below shows the same variable name being used within different enclosing scopes. But, because var ignores block scope the for loop is simply assigning a new value to `x` rather than declaring a new variable that has the same name.

```js
var x = 10;
console.log('start', x);

for (var x = 0; x < 1; x++) {
  console.log('middle', x);
}

console.log('end', x);

// OUTPUT: start 10
//         middle 0
//         end 1
```

### This

They keyword `this` represents a variable that points to an object that contains the context within the scope of the currently executing line of code. The `this` variable is automatically declared and you can reference `this` anywhere in a JS program. Because the value of `this` depends on the context in which it is referenced, there are three different contexts to which this can refer:
1. Global - When `this` is referenced outside a function or object it refers to the `globalThis` object (this represents the context for runtime environment). For example, when running in a browser, globalThis refers to the browser's window object.
2. Function - When `this` is refernced in a function it refers to the object that owns the function. That is either an object you defined or globalThis if the function is defined outside of an object. When running in JS strict mode, a global function's this variable is undefined instead of globalThis.
3. Object - When `this` is referenced in an object it refers to the object.

```js
'use strict';

// global scope
console.log('global:', this);
console.log('globalThis:', globalThis);

// function scope for a global function
function globalFunc() {
  console.log('globalFunctionThis:', this);
}
globalFunc();

// object scope
class ScopeTest {
  constructor() {
    console.log('objectThis:', this);
  }

  // function scope for an object function
  objectFunc() {
    console.log('objectFunctionThis:', this);
  }
}

new ScopeTest().objectFunc();
```

Running the above code in a browser results in the following.
```js
global: Window
globalThis: Window
globalFunctionThis: undefined
objectThis: ScopeTest
objectFunctionThis: ScopeTest
```
Note that if we were not using JavaScript strict mode then globalFunctionThis would refer to Window.

### Closure

A closure is defined as a function and its surrounding state. This means whatever variables are accessible when a function is created are available inside that function. This is true even if you pass the function outside of the scope of its original creation.

Here is an example of a function that is created as part of an object. That means that function has access to the object's `this` pointer.

```js
globalThis.x = 'global';

const obj = {
  x: 'object',
  f: function () {
    console.log(this.x);
  },
};

obj.f();
// OUTPUT: object
```

Arrow functions are a bit different because they inherit the `this` pointer of their creation context. So if we change our previous example to return an arrow function, then the `this` pointer at the time of creation will be globalThis.

```js
globalThis.x = 'global';

const obj = {
  x: 'object',
  f: () => console.log(this.x),
};

obj.f();
// OUTPUT: global
```

However, if we make function in our object that returns an arrow function, then the `this` pointer will be the object's `this` pointer since that was the active context at the time the arrow function was created.

```js
globalThis.x = 'global';

const obj = {
  x: 'object',
  make: function () {
    return () => console.log(this.x);
  },
};

const f = obj.make();
f();
// OUTPUT: object
```




## Javascript modules

JS modules allow for the partitioning and sharing of code. Node.js, server side JS execution app, introduced the concept of modules in order to support the impoorting of packages of JS from third party providers.

Node.js modules are called CommonJS modules, and JavaScript modules are called ES modules.

Modules create a file based scope for the code they represent, so you must explicitly `export` the objects fro one file and then `import` them into another file. Below is an example of a simple module that exports a function that displays an alert.

```js
export function alertDisplay(msg) {
  alert(msg);
}
```

You can import the module's exported function into another module using the import keyword.
```js
import { alertDisplay } from './alert.js';

alertDisplay('called from main.js');
```

### ES Modules in the browser

When you use ES modules in the browser via HTML script references, things get complicated. The key thing to understand is that modules can only be called from other modules. You cannot access JS contained in a module from the global scope that your non-module JS is executing in.

From your HTML, you can specify that you are using an ES module by including a `type` attribute with the value of `module` in the `script` element. You can then import an use other modules.

```js
<script type="module">
  import { alertDisplay } from './alert.js';
  alertDisplay('module loaded');
</script>
```

If you want to use a module in the global scope that our HTML and other non module JS is executing in, then we must leak it into the glboal scope. We do this by either attaching an event handler or explicitly adding a function to the global window object. In the example below, we expose the `alertDisplay` imported module function by attaching it to the global JavaScript `window` object so that it can then be called from the button `onclick` handler. We also expose the module function by attaching a `keypress` event.
```js
<html>
  <body>
    <script type="module">
      import { alertDisplay } from './alert.js';
      window.btnClick = alertDisplay;

      document.body.addEventListener('keypress', function (event) {
        alertDisplay('Key pressed');
      });
    </script>
    <button onclick="btnClick('button clicked')">Press me</button>
  </body>
</html>
```

Now, if the button is pushed or a key is pressed our ES module function will be called.

### Modules with web frameworks

Fortunately, when you use a web framework bundler, discussed in later instruction, to generate your web application distribution code, you usually don't have to worry about differentiating between global scope and ES module scope. The bundler will inject all the necessary syntax to connect your HTML to your modules. Historically, this was done by removing the modules and placing all of the JavaScript in a namespaced global partition. Now that ES Modules are supported on most browsers, the bundler will expose the ES module directly.







## Document Object Model (DOM)

The DOM is an object representation of the HTML elements that the browser uses to render the display. The browser also exposes the DOM to external code so that you can write programs that dynamically manipulate the HTML.

The browser provides access to the DOM through a global variable named `document` that points to the root element of the DOM. If you open the browser's debugger console window and type the variable name `document` you will see the DOM for the document the browser is currently rendering.

```html
> document

<html lang="en">
  <body>
    <p>text1 <span>text2</span></p>
    <p>text3</p>
  </body>
</html>
```
```css
p {
  color: red;
}
```

For everything in an HTML document there is a node in the DOM. This includes elements, attributes, text, comments, and whitespace. All of these form a big tree with the document node at the top.
![domexample](/pics/DOMexample.png)

### Accessing the DOM

Every element in an HTML document implements the DOM element interface, which is derived from the DOM node interface. The DOM element interface provides the means for iterating child elements, accessing the parent element, and manipulating the element's attributes. From your JS code, you can start with the `document` variable and walk through every element in the tree.

```js
function displayElement(el) {
  console.log(el.tagName);
  for (const child of el.children) {
    displayElement(child);
  }
}

displayElement(document);
```

You can provide a CSS selector to the `querySelectorAll` function in order to select elements from the document. The `textContent` property contains all of the element's text. You can even access a textual representation of an element's HTML content with the `innerHTML` property.

```js
const listElements = document.querySelectorAll('p');
for (const el of listElements) {
  console.log(el.textContent);
}
```

### Modifying the DOM

The DOM supports the ability to insert, modify, or delete the elements in the DOM. To create a new element you first create the element on the DOM document. You then insert the new element into the DOM tree  by appending it to an existing element in the tree.

```js
function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}

insertChild('#courses', 'new course');
```

To delete elements, call the `removeChild` function on the parent element.
```js
function deleteElement(elementSelector) {
  const el = document.querySelector(elementSelector);
  el.parentElement.removeChild(el);
}

deleteElement('#courses div');
```

### Injecting HTML

The DOM also allows yo uto inject entire blocks of HTML into an element. The following code finds the first `div` element in the DOM and replaces all the HTML it contains.

```js
const el = document.querySelector('div');
el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';
```

However, directly injecting HTML as a block of text is a common attack vector for hackers. If an untrusted party can inject JS anywhere in your application then that JS can represent itself as the current user of the application. The attacker can then make requests for sensitive data, monitor activity, and steal credentials. The example below shows how the img element can be used to launch an attack as soon as the page is loaded.

```html
<img src="bogus.png" onerror="console.log('All your base are belong to us')" />
```

If you are injecting HTML, make sure that it cannot be manipulated by a user. Common injection paths include HTML input controls, URL parameters, and HTTP headers. Either sanitize any HTML that contains variables, or simply use DOM manipulation functions instead of `innerHTML`.

### Event Listeners

All DOM elements support the ability to attach a function that gets called when an event occurs on the element. These functions are called event listeners. Here is an example of an event listener that gets called when an element gets clicked.

```js
const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});
```

There are a lot of possible events that you can add a listener to. This includes tings like mouse, keyboard, scrolling, animation, video, audio, WebSocket, and clipboard events.

| Event Category | Description           |
| -------------- | --------------------- |
| Clipboard      | Cut, copied, pasted   |
| Focus          | An element gets focus |
| Keyboard       | Keys are pressed      |
| Mouse          | Click events          |
| Text selection | When text is selected |

You can also add event listeners directly in the HTML. For example, here is an `onclick` handler that is attached to a button.
```js
<button onclick='alert("clicked")'>click me</button>
```






## Local Storage

The browser's `localStorage` API provides the ability to persistently store and retrieve data (scores, usernames, etc.) on a user's browser across user sessions and HTML page renderings. For example, your frontend JS code could store a user's name on one HTML page, and then retrieve the name later when a different HTML page is loaded. The user's name will also be available in local storage the next time the same browser is used to access the same website.

In addition to persisting application data between page renderings, `localStorage` is also used as a cache for when data cannot be obtained from the server. For example, your frontend JS could store the last high scores obtained from the service, and then display those scores in the future if the service is not available.

### How to use it

There are four main functions that can be used with localStorage

| Function             | Meaning                                      |
| -------------------- | -------------------------------------------- |
| setItem(name, value) | Sets a named item's value into local storage |
| getItem(name)        | Gets a named item's value from local storage |
| removeItem(name)     | Removes a named item from local storage      |
| clear()              | Clears all items in local storage            |

A local storage value must be of type `string`, `number`, or `boolean`. If you want to store a JS object or array then you first need to convert it to a JSON string with `JSON.stringify()` on insertion, and parse it back so JS with `JSON.parse()` when retrieved.








## Promises

The rendering process of your HTMl executes on a single thread, meaning that you cannot take a long time processing JS on the main rendering thread. Long running, or blocking tasks, should be executed with the use of a JS `promise`. The execution of a promise allows the main rendering thread to continue while some action is executed in the background.

Create a promise by calling the promise object constructor and passing it an executor function that runs the asynchornous operation. Executing asynchronously means that promise constructor may return before the promise executor function runs. State of the promise execution is always in one of three possible states:
1. pending - currently running asynchronously
2. fulfilled - completed successfully
3. rejected - failed to complete

Demonstrate asynchronous execution by using standard JS `setTimeout` function to create a delay in the execution of the code. This function takes the number of milliseconds to wait and a function to call after that amount of time has expired. Call the delay function in a for loop in the promise executor and also in a for loop outside the promise so both code blocks are running in parallel.

```js
const delay = (msg, wait) => {
  setTimeout(() => {
    console.log(msg, wait);
  }, 1000 * wait);
};

new Promise((resolve, reject) => {
  // Code executing in the promise
  for (let i = 0; i < 3; i++) {
    delay('In promise', i);
  }
});

// Code executing after the promise
for (let i = 0; i < 3; i++) {
  delay('After promise', i);
}

// OUTPUT:
//   In promise 0
//   After promise 0
//   In promise 1
//   After promise 1
//   In promise 2
//   After promise 2
```

### Resolving and rejecting

The promise executor function takes two functions as parameters, `resolve` and `reject`. Calling `resolve` sets the promise to the `fulfilled` state and calling `reject` sets the promise to the `rejected` state.

Consider the following "coin toss" promise that waits ten seconds and then has a fifty percent chance of resolving or rejecting.

```js
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('success');
    } else {
      reject('error');
    }
  }, 10000);
});
```

If you log the coinToss promise object to the console immediately after calling the constructor, it will display that it is in the `pending` state.

```js
console.log(coinToss);
// OUTPUT: Promise {<pending>}
```

If you wait ten seconds and then log the coinToss promise object again, the state will either show as `fulfilled` or `rejected` depending upon the way the coin landed.

```js
console.log(coinToss);
// OUTPUT: Promise {<fulfilled>}
```

### Then, catch, finally

To generically do something with the result of a promise after it resolves, we use functionality similar to exception handling. The promise object has three functions: `then`, `catch`, and `finally`. The `then` function is called if the promise is fulfilled, `catch` is called if the promise is `rejected`, and `finally` is always called after all the processing is completed.

You can rework the coinToss example and make it so 10% of the time the coin falls off the table and resolves to the rejected state. Otherwise the promise resolves to fulfilled with a result of either `heads` or `tails`.

```js
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});
```

We then chain the `then`, `catch`, and `finally` functions to the coinToss object in order to handle each of the possible results.

```js
coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed
```








## JavaScript Async/Await

JS Promise objects are great for asynchronous execution, but as developers began to build large systems with promises they wanted more concise representation. This was implemented with `async/await` syntax.
- The `await` keyword wraps the execution of a promise and removed the need to chain functions.
- The `await` expression will block until the promise state moves to `fulfilled`, or throws an exception if the state moves to `rejected`.

For example, if we have a function that returns a coin toss promise:
```js
const coinToss = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(Math.random() > 0.5 ? 'heads' : 'tails');
      } else {
        reject('fell off table');
      }
    }, 1000);
  });
};
```

We can create equivalent executions with either a promise `then/catch` chain, or an `await` with a `try/catch` block.

**then/catch chain version**

```js
coinToss()
  .then((result) => console.log(`Toss result ${result}`))
  .catch((err) => console.error(`Error: ${err}`))
  .finally(() => console.log(`Toss completed`));
```

**async, try/catch version**

```js
try {
  const result = await coinToss();
  console.log(`Toss result ${result}`);
} catch (err) {
  console.error(`Error: ${err}`);
} finally {
  console.log(`Toss completed`);
}
```

### async

An important restriction for working with `await` is you cannot call await unless it is called at the top level of the JS, or is in a function that is defined with the `async` keyword.

Applying the `async` keyword transforms the function so that it returns a promise that will resolve to the value that was previously returned by the function. Basically, this turns any function into an asynchronous function, so that it can make asynchronous requests.

This can be demonstrated with a function that makes animal noises. Notice that the return value is a simple string.

```js
function cow() {
  return 'moo';
}
console.log(cow());
// OUTPUT: moo
```

If we designate the function to be asynchronous then the return value becomes a promise that is immediately resolved and has a value that is the return value of the function.

```js
async function cow() {
  return 'moo';
}
console.log(cow());
// OUTPUT: Promise {<fulfilled>: 'moo'}
```

We then change the cow function to explicitly create a promise instead of the automatically generated promise that the await keyword generates.

```js
async function cow() {
  return new Promise((resolve) => {
    resolve('moo');
  });
}
console.log(cow());
// OUTPUT: Promise {<pending>}
```

You can see that the promise is in the pending state because the promise's execution function has not yet resolved.

### await

The `async` keyword declares that a function returns a promise. The `await` keyword wraps a call to the `async` function, blocks execution until the promise has resolved, and then returns the result of the promise.

We can demonstrate `await` in action with the cow promise above. If we log the output from invoking `cow` then we see that the return value is a promise. However, if we prefix the call to the function with the await keyword, execution will stop until the promise has resolved, at which point the result of the promise is returned instead of the actual promise object.

```js
console.log(cow());
// OUTPUT: Promise {<pending>}

console.log(await cow());
// OUTPUT: moo
```

By combining `async`, to define functions that return promises, with `await`, to wait on the promise, you can create code that is asynchronous, but still maintains the flow of the code without explicitly using callbacks.

### putting it together

You can see the benefit for `async`/`await` clearly by considering a case where multiple promises are required. For example, when calling the `fetch` web API on an endpoint that returns JSON, you would need to resolve two promises. One for the network call, and one for converting the result to JSON. A promise implementation would look like the following.

```js
const httpPromise = fetch('https://simon.cs260.click/api/user/me');
const jsonPromise = httpPromise.then((r) => r.json());
jsonPromise.then((j) => console.log(j));
console.log('done');

// OUTPUT: done
// OUTPUT: {email: 'bud@mail.com', authenticated: true}
```

With async/await, you can clarify the code intent by hiding the promise syntax, and also make the execution block until the promise is resolved.

```js
const httpResponse = await fetch('https://simon.cs260.click/api/user/me');
const jsonResponse = await httpResponse.json();
console.log(jsonResponse);
console.log('done');

// OUTPUT: {email: 'bud@mail.com', authenticated: true}
// OUTPUT: done
```









## Debugging JavaScript

### Console debugging

One of the simplest ways to debug you JS code is to insert `console.log` functions that output the state of the code as it executes. You can also use the debugger console window in a browser to inspect variables without using the `console.log` function from your code.

### Browser debugging

`console.log` debugging is great for times when you just need to quickly see what is going on in your code. Select the source tab in the inspect tool on a browser. This displays the source files that compromise the currently rendered content.

You can select index.js from the source view (or press `CTRL-P` or `COMMAND-P` on a mac then select index.js from the list). Then set a breakpoint on a line by clicking the line number on the left. This makes the execution code pause when that line is executed.

When the browser is paused, you can move your mouse over a variable to see its value, see what variables are in scope, set watches on variables, or use the console to interact with code.







## Node.js

First successful application for deploying JS outside of a browser, on a server. JS can power your entire technology stack.

### Installing NVM and Node.js

Production environmetn server comes with it already installed. To install in development environment is install Node Version Manager (NVM) first and use it to install and manage Node.js.

### Running programs

You can execute a line of JS with Node.js from your console with the `-e` parameter.

```sh
node -e "console.log(1+1)"
```

However, to do real work you need to execute an entire project composed of dozens or even hundreds of JS files. Do this by creating a single starting JS file, such as index.js, that references the code found in the rest of the project. Then execute the code by running `node` with `index.js` as a parameter. Example:

```sh
node index.js
Counting ... 1
Counting ... 2
Counting ... 3
Counting ... 4
Counting ... 5
```

You can also run `node` in interpretive mode by executing it without any parameters and then typing your JavaScript code directly into the interpreter.

```sh
➜ node
Welcome to Node.js v16.15.1.
> 1+1
2
> console.log('hello')
hello
```

### Node package manager

While you could write all of the JavaScript for everything you need, it is always helpful to use preexisting packages of JavaScript for implementing common tasks. To load a package using Node.js you must take two steps. First install the package locally on your machine using the Node Package Manager (NPM), and then include a `require` statement in your code that references the package name. NPM is automatically installed when you install Node.js.

NPM knows how to access a massive repository of preexisting packages. You can search for packages on the NPM website. However, before you start using NPM to install packages you need to initialize your code to use NPM. This is done by creating a directory that will contain your JavaScript and then running `npm init`. NPM will step you through a series of questions about the project you are creating. You can press the return key for each of questions if you want to accept the defaults. If you are always going to accept all of the defaults you can use `npm init -y` and skip the Q&A.

```sh
mkdir npmtest
cd npmtest
npm init -y
```

### Package.json

If you list the files in the directory you will notice that it has created a file named `package.json`. This file contains three main things:
1. Metadata about your project such as its name and the default entry JavaScript file
2. Commands (scripts) that you can execute to do things like run, test, or distribute your code
3. packages that this project depends upon.

The following shows what your `package.json` looks like currently. It has some default metadata and a simple placeholder script that just runs the echo command when you execute `npm run test` from the console.

```json
{
  "name": "npmtest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

With NPM initialized to work with your project, you can now use it to install a node package. As a simple example, we will install a package that knows how to tell jokes. This package is called `give-me-a-joke`. You can search for it on the NPM website, see how often it is installed, examine the source code, and learn about who created it. You install the package using `npm install` followed by the name of the package.

```sh
npm install give-me-a-joke
```

If you again examine the contents of the `package.json` file you will see a reference to the newly installed package dependency. If you decide you no longer want a package dependency you can always remove it with the `npm uninstall <package name here>` console command.

With the dependency added, the unnecessary metadata removed, the addition of a useful script to run the program, and also adding a description, the `package.json` file should look like this:

```json
{
  "name": "npmtest",
  "version": "1.0.0",
  "description": "Simple Node.js demo",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "dev": "node index.js"
  },
  "dependencies": {
    "give-me-a-joke": "^0.5.1"
  }
}
```

Note: when you begin installing package dependencies, NPM will create an additional file name `package-lock.json` and a directory named `node_modules` in your project directory.
- `node_modules` directory has the actual JS files for the package and all of its dependent packages. Do not want this in your source control system. Include `node_modules` in your `.gitignore` file.

If you clone your source code from github to a new location, you should run `npm install` in the project directory. This will cause NPM to download all the previously installed packages and recreate the `node_modules` directory.

The `package-lock.json` file tracks the version of the package that you installed. that way if you rebuilt your modules directory you will have the version of the package you initially installed.

With NPM and the joke packaed installed, you can now use that package in a JS file by referencing the package name as a parameter to the `require` function. This is then followed by a call to the joke object's `getRandomDadJoke` function to actually generate a joke.

Example:

**index.js**

```js
const giveMeAJoke = require('give-me-a-joke');
giveMeAJoke.getRandomDadJoke((joke) => {
  console.log(joke);
});
```

If you run this code using `node.js` you should get a result similar to the following.

```sh
➜  node index.js
What do you call a fish with no eyes? A fsh.
```

Main steps:
1. Create your project directory
1. Initialize it for use with NPM by running `npm init -y`
1. Make sure `.gitignore` file contains `node_modules`
1. Install any desired packages with `npm install <package name here>`
1. Add `require('<package name here>')` to your application's JavaScript
1. Use the code the package provides in your JavaScript
1. Run your code with `node index.js`





## Debugging Node.js

Now that we are writing JS that runs using Node.js, we need a way to launch and debug our code that runs outside of the browser. One way is to use the debugging tools built into VS code. To debug JS in VS code, you first need some JS to debug. Execute the `Start Debugging` command by pressing `F5`. First time you run it, VS code will ask what debugger you want to use, choose `Node.js`.

Code will execute and the debug console window will automatically open to show you the debugger output where you can see the results of the `console.log` statements.

You can pause executions of the code by setting a breakpoint. You can see values of variables when it pauses by looking at the variable window on the elft or hovering over the variable you want to inspect.

Continue execution of the code after a pause by pressing `F10` to step to the next line, `F11` to step into a function call, or `F5` to continue running from the current line. When the last line of code executes the debugger will automatically exit. Use `SHIFT-F5` to debug at any time.
