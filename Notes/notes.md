# CS 260 Notes

# The Console

## Viewing the file system

One of the primary purposes of a console application is to view the files on the computer. The files on a computer are organized into a tree structure of nodes called directories. At any given point in time your console is located at one of the directories in the file system. You can see which directory you are in with the `pwd` (present working directory) command.

```sh
➜  pwd

/Users/student/byu//webprogramming260
```

You can list all of the files in the directory with `ls` (list files). Most command line applications take parameters that are specified after you type the application name. For example, `ls` can list all files (even hidden ones) in a long format if you provide the parameter `-la`.

```sh
➜ ls -la

total 16
-rw-r--r--  1 lee  staff   1.0K Nov 19 08:47 LICENSE
-rw-r--r--  1 lee  staff    82B Nov 19 08:47 README.md
drwxr-xr-x  4 lee  staff   128B Nov 19 08:48 profile
drwxr-xr-x  4 lee  staff   128B Nov 19 08:47 react
```

## Executing commands

The other primary purpose of the console is to execute commands. You already did this in the previous section when you executed commands for working with the file system. However, console commands can perform many different operations. Here are some basic commands that you show experiment with.

- **echo** - Output the parameters of the command
- **cd** - Change directory
- **mkdir** - Make directory
- **rmdir** - Remove directory
- **rm** - Remove file(s)
- **mv** - Move file(s)
- **cp** - Copy files
- **ls** - List files
- **curl** - Command line client URL browser
- **grep** - Regular expression search
- **find** - Find files
- **top** - View running processes with CPU and memory usage
- **df** - View disk statistics
- **cat** - Output the contents of a file
- **less** - Interactively output the contents of a file
- **wc** - Count the words in a file
- **ps** - View the currently running processes
- **kill** - Kill a currently running process
- **sudo** - Execute a command as a super user (admin)
- **ssh** - Create a secure shell on a remote computer
- **scp** - Securely copy files to a remote computer
- **history** - Show the history of commands
- **ping** - Check if a website is up
- **tracert** - Trace the connections to a website
- **dig** - Show the DNS information for a domain
- **man** - Look up a command in the manual

You can also chain the input and output of commands using special characters

- `|` - Take the output from the command on the left and _pipe_, or pass, it to the command on the right
- `>` - Redirect output to a file. Overwrites the file if it exists
- `>>` - Redirect output to a file. Appends if the file exists

For example, you can list the files in a directory, pipe it into `grep` to search for files created in Nov, and then pipe that into `wc` to count the number of files found with a date of Nov.

```
ls -l | grep ' Nov ' | wc -l
```

There are also keystrokes that have special meaning in the console.

- `CTRL-R` - Use type ahead to find previous commands
- `CTRL-C` - Kill the currently running command





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

### The box model <a name="cssBoxModel"></a>

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





## CSS Flexbox <a name="cssFlexbox"></a>

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









# Midterm Questions

1. In the following code, what does the link element do?
    - Usually defines the relationship between the current document and an external resource. Usually links external style sheets or add a favicon to websites. It is an empty element, it contains attributes only. (e.g. <link rel=”stylesheet” href=”styles.css”>
2. In the following code,  what does a div tag do?
    - Block division of content: it defines a division or a section in an html document. It is used as a container for html elements, and is easily styled by using the class or id attribute. Any type of content can be inside it.
3. In the following code, what is the difference between the #title and .grid selector?
    - #title is an id selector and .grid is a class selector
4. In the following code, what is the difference between padding and margin?
    - Padding is the second innermost box, which will inherit things like the background color. Margin is the last and outermost box that represents white space as it is considered external to the actual styling of the box.
5. Given this HTML and this CSS how will the images be displayed using flex?
    - [CSS Flexbox](#cssFlexbox)
6. What does the following padding CSS do?
    - [CSS Box Model](#cssBoxModel)
7. What does the following code using arrow syntax function declaration do?
8. What does the following code using map with an array output?
9. What does the following code output using getElementByID and addEventListener?
10. What does the following line of Javascript do using a # selector?
11. Which of the following are true? (mark all that are true about the DOM)
12. By default, the HTML span element has a default CSS display property value of: 
    - inline
13. How would you use CSS to change all the div elements to have a background color of red?
    ```css
    div {
		    background-color: red;
		}
    ```
14. How would you display an image with a hyperlink in HTML?
    ```html
    <a href="default.asp">
      <img src="smiley.gif" alt="HTML tutorial" style="width:42px;height:42px;">
    </a>
    ```
15. In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
    - content, padding, border, margin
16. Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?
    ```html
    <p>This is double <span class="green-text">trouble</span>!</p>
    ```
    ```css
    .green-text {
      color: green;
    }
    ```
17. What will the following code output when executed using a for loop and console.log?
18. How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
19. What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
    - `<p>`, `<ol>`, `<ul>`, `<h2>`, `<h1>`, `<h3>`
20. How do you declare the document type to be html?
    ```html
    <!DOCTYPE html>
    ```
21. What is valid javascript syntax for if, else, for, while, switch statements?
    ```js
    if (condition) {
      // Code to execute if condition is true
    } else if (anotherCondition) {
      // Code to execute if the second condition is true
    } else {
      // Code to execute if both conditions are false
    }
    ```
    ```js
    for (initialization; condition; increment/decrement) {
      // Code to execute in each iteration
    while (condition) {
      // Code to execute while the condition is true
    }
    switch (expression) {
      case value1:
        // Code to execute if expression === value1
        break;
      case value2:
        // Code to execute if expression === value2
        break;
      default:
        // Code to execute if no cases match
    }
    do {
      // Code to execute at least once
    } while (condition);
    ```
22. What is the correct syntax for creating a javascript object?
    - const or let (avoid var)
23. Is it possible to add new properties to javascript objects?
    - yes (use dot or brackets or add them dynamically)
24. If you want to include JavaScript on an HTML page, which tag do you use?
    - script
    ```html
    <script src="script.js"></script>
    ```
25. Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
26. Which of the following correctly describes JSON?
27. What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
    - chmod: change mode, changes file permissions (r, w, e) for file's owner, group, or others. `chmod 755 filename`
    - pwd: print working directory, displays the current working directory. Outputs full path of your directory.
    - cd: change directory
    - ls: list files
    - vim: opens the vim text editor to create or edit text files 
    - nano: text editor to create or edit files; simpler than vim and easier to use
    - mkdir: creates new directory
    - mv: move files or rename 
    - rm: remove files
    - man: look up command in the manual
    - ssh: create a secure shell on a remote computer
    - ps: view the currently running processes
    - wget: web get, downloads files from the web through http, https, or ftp.
    - sudo: super user do, executes a command as a super user (admin)
28. Which of the following console command creates a remote shell session?
    ```sh
    ssh user@remote_host
    ```
29. Which of the following is true when the -la parameter is specified for the ls console command?
    - displays a detailed list (file permissions, owner, size, etc.) and lists all files including hidden ones (starting with `.`).
30. Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
    - top: .click
    - sub: fruit is sub of bozo.click, and banana is sub of fruit.bozo.click
    - root: bozo.click
31. Is a web certificate is necessary to use HTTPS.
    - Yes, not for http though.
32. Can a DNS A record can point to an IP address or another A record.
    - just to an IP address, ot another A record.
33. Port 443, 80, 22 is reserved for which protocol?
    - 443: HTTPS
    - 80: HTTP
    - 22: SSH
34. What will the following code using Promises output when executed?
















# Web Frameworks

Web frameworks make the job of writing web apps easier by providing tools for completing common app tasks, such as modularizing code, creating single page apps, simplifying reactivity, and supporting diverse hardware devices.

Some frameworks takes things beyond the standard technologies and create new hybrid file formats that combine things such as HTML and JS into a single file (e.g. React JSX, Vue SFC, and Svelte files). Abstracting away the core web file formats puts the focus on functional components rather than files.

Things to consider are how easy the framework is to learn, how it impacts productivity, how performant it is, how long it takes to build, and how actively the framework is evolving.

## Hello World Examples

How major frameworks would render a simple hello world app.

### Vue

Combines HTML, CSS, and JS into a single file. HTML is represented by a `template` element that can be aggregated into other templates. 

**SFC**

```html
<script>
  export default {
    data() {
      return {
        name: 'world',
      };
    },
  };
</script>

<style>
  p {
    color: green;
  }
</style>

<template>
  <p>Hello {{ name }}!</p>
</template>
```

### Svelte

Like Vue, it combines HTML, CSS, and JS into a single file. The difference here is that Svelte requires a transpiler to generate browser ready code, instead of a runtime virtual DOM.

**Svelte file**

```html
<script>
  let name = 'world';
</script>

<style>
  p {
    color: green;
  }
</style>

<p>Hello {name}!</p>
```

### React

Combines JS and HTML into its component format, CSS must be declared outside of the JSX file. Component itself leverages the functionality of JS and can be represented as a function or class.

**JSX**

```jsx
import 'hello.css';

const Hello = () => {
  let name = 'world';

  return <p>Hello {name}</p>;
};
```

**CSS**

```css
p {
  color: green;
}
```

### Angular Component

An angular component defines what JS, HTML, and CSS are combined together. This keeps a fairly strong separation of files that are usually grouped together in a directory rather than using the single file representation.

**JS**

```js
@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css'],
})
export class HelloWorldComponent {
  name: string;
  constructor() {
    this.name = 'world';
  }
}
```

**HTML**

```html
<p>hello {{name}}</p>
```

**CSS**

```css
p {
  color: green;
}
```



## React

React, and its associated projects, provide a powerful web programming framework. The name React comes from its focus on making reactive web page components that automatically update based on user interactions or changes in the underlying data.

React abstracts HTML into a JavaScript variant called JSX. JSX is converted into valid HTML and JavaScript using a preprocessor called Babel. For example, the following is a JSX file. Notice that it mixes both HTML and JavaScript into a single representation.

```jsx
const i = 3;
const list = (
  <ol class='big'>
    <li>Item {i}</li>
    <li>Item {3 + i}</li>
  </ol>
);
```

Babel will convert that into valid JavaScript:

```js
const i = 3;
const list = React.createElement(
  'ol',
  { class: 'big' },
  React.createElement('li', null, 'Item ', i),
  React.createElement('li', null, 'Item ', 3 + i)
);
```

The `React.createElement` function will then generate DOM elements and monitor the data they represent for changes. When a change is discovered, React will trigger dependent changes.






## Components

React components allow you to modularize the functionality of your application. This allows the underlying code to directly represent the components that a user interacts with. It also enables code reuse as common application components often show up repeatedly.

### Render function

One of the primary purposes of a component is to generate the user interface. This is done with the component's `render` function. Whatever is returned from the `render` function is inserted into the component HTML element.

As a simple example, a JSX file contianing a React component element named `Demo` would cause react to load the `Demo` component, call the `render` function, and insert the result into the place of the `Demo` element.

**JSX**

```jsx
<div>
  Component: <Demo />
</div>
```

Notice that Demo is not a valid HTML element. The transpiler will replace this tag with the resulting rendered HTML.

**React component**

```js
function Demo() {
  const who = 'world';
  return <b>Hello {who}</b>;
}
```

Resulting HTML

```html
<div>Component: <b>Hello world</b></div>
```

### Properties

React components also allow you to pass info to them in the form of element properties. The component receives the properties in its constructor and then can display them when it renders.

**JSX**

```jsx
<div>Component: <Demo who="Walke" /><div>
```

**React component**

```jsx
function Demo(props) {
  return <b>Hello {props.who}</b>;
}
```

**Resulting HTML**

```html
<div>Component: <b>Hello Walke</b></div>
```

### State

In addition to properties, a component can have internal state. Component state is created by calling the `React.useState` hook function. The `useState` function returns a variable that contains the current state and a function to update the state. The following example creates a state variable called `clicked` and toggles the click state in the `updateClicked` function that gets called wehn the paragraph text is clicked.

```jsx
const Clicker = () => {
  const [clicked, updateClicked] = React.useState(false);

  const onClicked = (e) => {
    updateClicked(!clicked);
  };

  return <p onClick={(e) => onClicked(e)}>clicked: {`${clicked}`}</p>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```

Note that you can use JSX even without a function. Simple variable representing JSX will work anyplace you would otherwise provide a component.

```jsx
const hello = <div>Hello</div>;

ReactDOM.render(hello, document.getElementById('root'));
```

### Class style components

In addition to the preferred `function style` components demonstrated above, React also supports `class style` components. Note that the React team is moving away from the class style representation, and therefore you should not use it. You are likely to see class style components and so you should be aware of the syntax. Below is the equivalent class style component for the `Clicker` component that we created above.

The major difference is that properties are loaded on the contructor and state is set using a `setState` function on the component object.

```jsx
class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }
  onClicked() {
    this.setState({
      clicked: !this.state.clicked,
    });
  }
  render() {
    return <p onClick={(e) => this.onClicked(e)}>clicked: {`${this.state.clicked}`}</p>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```

### Reactivity

Component's properties and state are used by the React framework to determine the reactivity of the interface. Reactivity controls how a component reacts to actions taken by the user or events that happen within the applicaiton. Whenever a component's state or properties change, the `render` function for the component and all of its dependent component `render` functions are called.








## React Hooks

React hooks allow React function style components to be able to do everything that a class style component can do and more. Additionally, as new features are added they are including them as hooks. This makes function style components the preferred way of doing things in React. Below is the use of hooks to declare and update state in a function component with the `useState` hook.

```jsx
function Clicker({initialCount}) {
  const [count, updateCount] = React.useState(initialCount);
  return <div onClick={() => updateCount(count + 1)}>Click count: {count}</div>;
}

ReactDOM.render(<Clicker initialCount={3} />, document.getElementById('root'));
```

### useEffect hook

The `useEffect` hook allows you to represent lifecycle events. For example, if you want to run a function every time the component completes rendering, you could do the following:

```jsx
function UseEffectHookDemo() {
  React.useEffect(() => {
    console.log('rendered');
  });

  return <div>useEffectExample</div>;
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```

You can also take action when the component cleans up by returning a cleanup function from the function registered with the `useEffect`. In the following example, every time the component is clicked, the state changes and so the component is rerendered. This causes both the cleanup function to be called in addition to the hook function. If the function was not rerendered then only the cleanup function would be called.

```jsx
function UseEffectHookDemo() {
  const [count, updateCount] = React.useState(0);
  React.useEffect(() => {
    console.log('rendered');

    return function cleanup() {
      console.log('cleanup');
    };
  });

  return <div onClick={() => updateCount(count + 1)}>useEffectExample {count}</div>;
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```

This is useful when you want to create side effects for things such as tracking when a component is displayed or hidden, or creating and disposing of resources.

### Hook dependencies

You can control what triggers a `useEffect` hook by specifying its dependencies. In the following exammple we have two state variables, but we only want the `useEffect` hook to be called when the compoennt is initially called and when the first variable is clicked. To accomplish this you pass on array of dependencies as a second parameter to the `useEffect` call.

```jsx
function UseEffectHookDemo() {
  const [count1, updateCount1] = React.useState(0);
  const [count2, updateCount2] = React.useState(0);

  React.useEffect(() => {
    console.log(`count1 effect triggered ${count1}`);
  }, [count1]);

  return (
    <ol>
      <li onClick={() => updateCount1(count1 + 1)}>Item 1 - {count1}</li>
      <li onClick={() => updateCount2(count2 + 1)}>Item 2 - {count2}</li>
    </ol>
  );
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```

If you specify an empty array `[]` as the hook dependency then it is only called when the component is first rendered.

Hooks can only be used in function style components and must be called at the top scope of the function. That means a hook cannot be called inside of a loop or conditional. This restriction ensures that hooks are always called int he same order when a component is rendered.



## Router

A web framework router provides essential functionality for single page apps. With a multiple webpage app the headers, footers, nav, and common components must be either duplicated in each html page or injected before the server sends the page to the browser. With a single page app, the browser only loads one HTML page then JS is used to manipulate the DOM and give it the appearance of multiple pages. Router defines the routes a user can take through the app and automatically manipulates the DOM to display the appropriate framework components.

React does not have a standard router package, and there are many you can choose from. Simplified routing functionality of React-router-dom derives from the project react-router for its core functionality. Do not confuse the two, or versions of react-router-dom before v6 when reading documentation.

A basic implementation of the router consists of a `BrowserRouter` component that encapsulates the entire app and controls the routing action. The `Link`, or `NavLink`, component captures user nav events and modifies what is rendered by the `Routes` component by matching up the `to` and `path` attributes.

```jsx
// Inject the router into the application root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // BrowserRouter component that controls what is rendered
  // NavLink component captures user navigation requests
  // Routes component defines what component is routed to
  <BrowserRouter>
    <div className='app'>
      <nav>
        <NavLink to='/'>Home</Link>
        <NavLink to='/about'>About</Link>
        <NavLink to='/users'>Users</Link>
      </nav>

      <main>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/about' element={<About />} />
          <Route path='/users' element={<Users />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
```





## Reactivity

Making the UI react to changes in user input or data, is one of the architectural foundations of React. React enables reactivity with three major pieces of a React component: `props`, `state`, and `render`.

When a component's JSX is rendered, React parses it and creates a list of any references to the component's `state` or `prop` objects. React then monitors those objects and if it detects that they have changed it will call the component's `render` function so the impact of the change is visualized.

The following example contains two components: a parent `<Survey/>` component and a child `<Question/>` component. The Survey has a state named `color`. The Question has a property named `answer`. The Survey passes its `color` state to the Question as a property. This means any change to the Survey's color will also be reflected in the Question's color (Parent controls a child's functionality).

Be careful about assumptions when a state is updated. Just because you call `updateState` doesn't mean that you can access the updated state on the next line of code. Update happens asynchronously, and therefore you never really know when it is going to happen.

```jsx
const Survey = () => {
  const [color, updateColor] = React.useState('#737AB0');

  // When the color changes update the state
  const onChange = (e) => {
    updateColor(e.target.value);
  };

  return (
    <div>
      <h1>Survey</h1>

      {/* Pass the Survey color  as a parameter to the Question.
          When the color changes the Question parameter will also be updated and rendered. */}
      <Question answer={color} />

      <p>
        <span>Pick a color: </span>
        {/* Set the Survey color state as a the value of the color picker.
            When the color changes, the value will also be updated and rendered. */}
        <input type='color' onChange={(e) => onChange(e)} value={color} />
      </p>
    </div>
  );
};

// The Question component
const Question = ({ answer }) => {
  return (
    <div>
      {/* Answer rerendered whenever the parameter changes */}
      <p>Your answer: {answer}</p>
    </div>
  );
};

ReactDOM.render(<Survey />, document.getElementById('root'));
```






## Toolchains

As web programming becomes more and more complex it becomes necessary to abstract away some of that complexity with a series of tools. Some common functional pieces in a web app tool chain include:

- **Code repository** - Stores code in a shared, versioned location.
- **Linter** - Removes, or warns of, non-idiomatic code usage.
- **Prettier** - Formats code according to a shared standard.
- **Transpiler** - Compiles code into a different format. For example, from JSX to JavaScript, TypeScript to JavaScript, or SCSS to CSS.
- **Polyfill** - Generates backward compatible code for supporting old browser versions that do not support the latest standards.
- **Bundler** - Packages code into bundles for delivery to the browser. This enables compatibility (for example with ES6 module support), or performance (with lazy loading).
- **Minifier** - Removes whitespace and renames variables in order to make code smaller and more efficient to deploy.
- **Testing** - Automated tests at multiple levels to ensure correctness.
- **Deployment** - Automated packaging and delivery of code from the development environment to the production environment.

The toolchain we use for our React project consists of:
- `GitHub` as the code repo
- `Vite` for JSX, TS, development and debugging support
- `ESBuild` for converting to ES6 modules and transpiling (with Babel under)
- `Rollup` for bundling and tree shaking
- `PostCSS` for CSS transpiling
- a simple bash script (deployReact.sh) for deployment.




## Vite

Extend our usage of React to include a full web framework toolchain that allows us to use JSX, minification, polyfills, and bundling for our Simon and startup applications. Use a CLI to set up a web app, saving you trouble of configuring the toolchain parameters and gets you quickly started with a default app.

We use Vite for our toolchain. Vite bundles code quickly, has great debug support, and allows you to easily support JSX, TypeScript, and different CSS flavors. To get started with Vite, build a simple web app.

To create a new React-based web app using Vite, open your console and run the following commands:

```
npm create vite@latest demoVite -- --template react
cd demoVite
npm install
npm run dev
```

This creates a new web app in the `demoVite` directory, download the required 3rd party packages and start up the app using a local HTTP debugging server. You can tell Vite to open your browser to the URL that is hosting your app by pressing `o`, or press `h` to see all of the Vite CLI options. Stop Vite from hosting the app by pressing `q`.


### Generated project

Now, let's explore the application files that Vite created. From the console, use VS Code (`code .`) to open the project directory and take a look at the files.

| Directory    | File              | Purpose                                                                                                                   |
| ------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ./           |                   |                                                                                                                                |
|              | index.html        | Primary page for the application. This is the starting point to load all of the JSX components beginning with `main.jsx`. |
|              | package.json      | NPM definition for package dependencies and script commands. This is what maps `npm run dev` to actually start up Vite.   |
|              | package-lock.json | Version constraints for included packages (do not edit this).                                                             |
|              | vite.config.js    | Configuration setting for Vite. Specifically this sets up React for development.                                          |
| ./public     |                   |                                                                                                                           |
|              | vite.svg          | Vite logo for use as favicon and for display in the app.                                                                  |
| ./src        |                   |                                                                                                                           |
|              | main.jsx          | Entry point for code execution. This simply loads the App component found in `App.jsx`.                                   |
|              | index.css         | CSS for the entire application.                                                                                           |
|              | App.jsx           | JSX for top level application component. This displays the logs and implements the click counter.                         |
|              | App.css           | CSS for the top level application component.                                                                              |
| ./src/assets |                   |                                                                                                                           |
|              | react.svg         | React logo for display in the app.                                                                                        |

The main files in the application are `index.html`, `main.jsx`, and `App.jsx`. The browser loads `index.html` which provides the HTML element (`#root`) that the React application will be injected into. It also includes the script element to load `main.jsx`.

`main.jsx` creates the React application by associating the `#root` element with the `App` component found in `App.jsx`. This causes all of the component render functions to execute and the generated HTML, CSS, and JavaScript to be executed in `index.html`.

### JSX vs JS

The `Vite` CLI uses the `.jsx` extension for JSX files instead of the JavaScript `.js` extension. The Babel transpiler will work with either one, but some editor tools will work differently based on the extension. For this reason, you should prefer `.jsx` for files that contain JSX.

### Building a production release

When you execute `npm run dev` you are bundling the code to a temporary directory that the Vite debug HTTP server loads from.

When you want to bundle your application so that you can deploy to a production environment you need to run `npm run build`. This executes the `build` script found in your `package.json` and invokes the `Vite` CLI. `vite build` transpiles, minifies, injects the proper JS, and then outputs everything to a deployment ready version contained in a distribution subdirectory named `dist`.

### Deploying a production release

The deployment script for Simon React (`deployReact.sh`) creates a production distribution by calling `npm run build` and then copying the resulting `dist` directory to your production server.

Take some time to build a production release by running `npm run build`. Then examine what Vite actually builds by examining the `dist` directory. For example, if you look at the `dist/assets` directory you will see the bundled and minified JavaScript and CSS files.







## Simon React Phase 1: HTML/CSS

This deliverable ddemos using JS for user interaction, React as a web framework, and Vite as frontend tooling. This helps with tasks such as building modular components, providing reactive UI elements, supporting sessions, lazy loading, and reducing (minifying) the size of your app.

As part of the move to React, we convert Simon from a multi-page app (MPA) to a single HTML file (index.html), and then we use JS to interactively change the rendered content and components. This is a significant architectural shift to the app and will require you to reorganize your code to fit in single-page, component driven, model.

We are going to move to React in two phases.
1. **Phase 1**: convert the Simon HTML/CSS code into a modern web app using Vite and React. This will introduce routing, modularize the code, and remove redundancy.
2. **Phase 2**: introduce JS necessary to make Simon interactive and funcitonally complete.

### Porting process steps

The following section discusses the general steps taken to convert the Simon application from a simple HTML/CSS application to a React application. You don't necessarily have to go through this process with the Simon demonstration application, but it is a safe place to try since you have both the starting version (simon-css) and the ending version (simon-react) to reference.

We begin by introducing `vite`, our frontend tooling. The HTML and CSS is then reworked into React components. The React components are then reworked to take advantage of functionality that React provides. This includes function style components, modularization, reactive interactions, and a React representation of Bootstrap.

Here is a complete list of all the steps involved to convert Simon to a React application. When you port your startup to React you will want to commit your changes as you complete each step in the process.

1. Install and configure Vite
1. Reorganize the code
1. Convert to React Bootstrap
1. Enable React
1. Create app component
1. Create view components
1. Create the router
1. Convert HTML to React components
1. Replace deployment script

### Install and configure Vite

While in the project root directory, setup NPM and install Vite as a development dependency by running:

```sh
npm init -y
npm install vite@latest -D
```

Then insert/replace the `scripts` found in the newly created `package.json` file located in your project root directory to include the commands for running Vite. You can also clean up the description field and remove other unused fields.

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
```

⚠ Make sure you add `node_modules` to your `.gitignore` file so that you don't commit the imported NPM code.

This script is similar to the previous script, but it includes a step [???]

### Reorganize the code

We start with the simon-css code that currently looks like this:

```sh
├─ LICENSE
├─ README.md
├─ about.css
├─ about.html
├─ deployFiles.sh
├─ favicon.ico
├─ index.html
├─ main.css
├─ placeholder.jpg
├─ play.css
├─ play.html
└─ scores.html
```

Create a `public` directory that is going to hold all the application image and sound assets. After we create the folder we move the `placeholder.jpg` and `favicon.jpg` files into it. We then add new files that represent the sounds we want to use as we play the game.

Next we create a `src` directory where we will put all of the React code. Under the `src` directory we create a folder for each of the view components that represent the major functionality of the Simon application.

Finally rename `main.css` to `app.css` and move it to the `src` directory. This will contain all the styles that are shared across the application. You will need to tweak the `body` rule set to use the `.body` selector since our SPA works on components within the body element. This change should look like the following.

```css
.body {
  display: flex;
  flex-direction: column;
  min-width: 375px;
}
```

When we are done it will look like this.

```sh
├─ public                      # Static assets used in the app
│   ├─ button-bottom-left.mp3
│   ├─ button-bottom-right.mp3
│   ├─ button-top-left.mp3
│   ├─ button-top-right.mp3
│   ├─ error.mp3
│   ├─ favicon.ico
│   └─ placeholder.jpg
└─ src                         # Frontend React code
    ├─ app.css                 # Top level styles
    ├─ about                   # About component
    ├─ login                   # Login component
    ├─ play                    # Game play component
    └─ scores                  # Scores component

```

### Convert to React Bootstrap


There is an NPM package called React Bootstrap that wraps the Bootstrap CSS framework in React components. This allows you to treat the Bootstrap widgets, such as Button and Modal, as a React component instead of just imported CSS and JavaScript.

To use the React version of Bootstrap, import the NPM package.

```sh
npm install bootstrap react-bootstrap
```

Now, in the components where you want to refer to the Bootstrap styles, you can import the Bootstrap style sheet from the
imported NPM package just like you would other CSS files.

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

To use a React Bootstrap component, you would import and reference the specific component you want to use. Here is an example of using the `Button` component.

```jsx
import Button from 'react-bootstrap/Button';

export function NavButton({ text, url }) {
  const navigate = useNavigate();
  return (
    <Button variant='primary' onClick={() => navigate({ url })}>
      {text}
    </Button>
  );
}
```

For Simon we converted the modal dialog and button implementations to use the React Bootstrap components.

## Enabling React

We now have everything set up to start using React for the application. To make this happen, we need to install the React components for the basic functionality, DOM manipulation, and request routing to display individual components. React is installed by running the following console command:

```sh
npm install react react-dom react-router-dom
```

### `index.html` and `index.jsx`

With React we have a single HTML file that dynamically loads all of the other application components into its DOM using JavaScript. We rename the existing `index.html` to `login.html`, since that is what it really is anyway, and create a new `index.html` that represents the React SPA entry point.

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />

    <title>Simon React</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/index.jsx"></script>
  </body>
</html>
```

Notice that the div with an ID of `root` is where all the content will be injected. The script reference for `index.jsx` causes the injection of the top level component named `App`. To hook the `index.html` to our top level `App` component, we create the following `index.jsx` file.

**`index.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Create App Component

To begin the transformation to using React components in our application, we create a top-level component, stored in `src/app.jsx`, and add some placeholder content that will get replaced later. In order for the styling to show up, we include Bootstrap, move the `main.css` content into a file named `src/app.css`, and import the CSS file into the `app.jsx` file. Because we don't have a `body` element in our `App` component, we modify the `app.css` so that the selector for the `body` element is changed to a class selector `.body`.

**app.jsx**

```jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className='body bg-dark text-light'>App will display here</div>;
}
```

You should be able to view the results of these changes by running `npm run dev` from the console and pressing the `o` key to open it in the browser. The result won't be very exciting, but this successfully demonstrates the first visible step towards moving to React. When you reach this point with your startup, make sure that you commit your changes.

![First React component](firstReactComponent.png)

To make `app.jsx` represent the actual Simon content, we enhance the `app.jsx` file to contain the header and footer HTML found in each of our previous HTML files, including it in the return value for the `App()` component function. Next, we rename the `class` attribute to be `className` so that it doesn't conflict with the JavaScript `class` keyword. The `className` keyword will get transpiled to valid HTML by our toolchain. When completed, the `App` component should look like this:

**app.jsx**

```jsx
export default function App() {
  return (
    <div className='body bg-dark text-light'>
      <header className='container-fluid'>
        <nav className='navbar fixed-top navbar-dark'>
          <div className='navbar-brand'>
            Simon<sup>&reg;</sup>
          </div>
          <menu className='navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link' href='index.html'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='play.html'>
                Play
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='scores.html'>
                Scores
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='about.html'>
                About
              </a>
            </li>
          </menu>
        </nav>
      </header>

      <main>App components go here</main>

      <footer className='bg-dark text-white-50'>
        <div className='container-fluid'>
          <span className='text-reset'>Author Name(s)</span>
          <a className='text-reset' href='https://github.com/webprogramming260/simon-react'>
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}
```

This will display the header, navigation elements, placeholder content, and the footer. When you reach this point with your startup, make sure that you commit your changes.

### Create view components

We now create React component files `login.jsx`, `play.jsx`, `scores.jsx`, and `about.jsx` to represent each of the application views. To begin with, these are just stubs that we will soon begin populating as we port code from the requisitie `.html` files and which we will further develop with javascript functionality in part 2. We place each of the stubbed components in a separate directory (e.g. `src/login/login.jsx`) so that we can keep all of the component files together.

Here is the `login.jsx` stub before any code is converted over. The other components are similar.

```jsx
import React from 'react';

export function Login() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>login displayed here</div>
    </main>
  );
}
```

## Create the router

With `app.jsx` containing the header and footer, and all the application view component stubs created, we can now create the router that will display each component as the navigation UI requests it. The router controls the whole application by determining what component to display based upon what navigation the user chooses.

To implement the router, we import the router component into the `App` component along with all of our view components.

```jsx
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';
```

Next we wrap all of the `App` component's previous elements with the `BrowserRouter` component so that the browser router can control links and rendered components for all of its child elements.

```jsx
export default function App() {
  return (
    <BrowserRouter>
      <!-- The previous component elements go here -->
    </BrowserRouter>
  );
}
```

### Navigating routes

We then we replace the `a` elements with the router's `NavLink` component. The anchor element's `href` attribute is replaced with the router's `to` attribute. The `.html` file reference is replaced with a route name. Here is what the conversion for the Play component looks like.

```jsx
<a className="nav-link" href="play.html">Play</a>

// to

<NavLink className='nav-link' to='play'>Play</NavLink>
```

The `NavLink` component prevents the browser's default navigation functionality and instead handles it by replacing the currently displayed component. Once we have converted all the links, the `nav` element's code now looks like the following.

```jsx
<nav className='navbar fixed-top navbar-dark'>
  <div className='navbar-brand'>
    Simon<sup>&reg;</sup>
  </div>
  <menu className='navbar-nav'>
    <li className='nav-item'>
      <NavLink className='nav-link' to=''>
        Login
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='play'>
        Play
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='scores'>
        Scores
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='about'>
        About
      </NavLink>
    </li>
  </menu>
</nav>
```

### Injecting the routed component

The router definitions are then inserted so that the router knows what component to display for a given path. The router changes the rendered component; it appears in the place of the `Routes` element. The `Routes` element replaces the `main` element in the component HTML.

```jsx
 <main>App components go here</main>

 // to

<Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/play' element={<Play />} />
  <Route path='/scores' element={<Scores />} />
  <Route path='/about' element={<About />} />
  <Route path='*' element={<NotFound />} />
</Routes>
```

Notice that the `*` (default matcher) was added to handle the case where an unknown path is requested. We handle this by creating a component for a path that is not found. We place this component at the bottom of our `src/app.jsx` file.

```js
function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
```

At this point the application should support navigating to the different components.

## Converting to React components

The code for each of the HTML pages needs to now be converted to the different React components. Each of the components is a bit different, and so you want to review them to determine what they look like as a React component.

The basic steps for converting the component include the following.

- Copy the `main` element HTML over and put it in the return value of the component. Don't copy the header and footer HTML since they are now represented in `app.jsx`.
- Rename the `class` to `className` so that it doesn't conflict with the JavaScript keyword `class`.
- Move the CSS over to the component directory and use an `import` statement to bring it into the component's `jsx` file.

In order for you to have a feel for how this is done we will demonstrate how this is done with the `Scores` component.

### Convert `Scores` component

Open the `scores.html` file and copy out the **main** element from the HTML. Paste it over the **main** element in the `scores.jsx` file. Rename the `class` attribute to `className`. Move the `scores.css` file to the `src/scores` component directory and import the css into the `scores.jsx` component file.

```jsx
import './scores.css';
```

Then delete the `scores.html` file. When this is all done the scores component should now render the same thing the old CSS deliverable rendered.

![Scores CSS version](scoresCssVersion.png)

### Convert the other components

Using the scores component as an example we convert the login, about, and play components. You can review the resulting code in the simon-react repository to see how that was done.

## Deployment script

Now that we are using Vite to bundle our code we need a different deployment script. Delete the `deployFiles.sh` script and create a new file named `deployReact.sh` with the following contents.

```sh
while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployReact.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying React bundle $service to $hostname with $key\n"

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf build
mkdir build
npm install # make sure vite is installed so that we can bundle
npm run build # build the React front end
cp -rf dist/* build # move the React front end to the target distribution

# Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
ENDSSH

# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r -i "$key" build/* ubuntu@$hostname:services/$service/public

# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf build
rm -rf dist
```

## Port complete

At this point we are done porting the CSS deliverable to React.  The final Simon project structure looks like the following.

```sh
├─ LICENSE
├─ README.md
├─ deployReact.sh              # React specific deployment
├─ index.html                  # Single HTML file for the App
├─ index.jsx                   # Loads the top level component
├─ package.json                # Defines dependent modules
├─ public                      # Static assets used in the app
│   ├─ button-bottom-left.mp3
│   ├─ button-bottom-right.mp3
│   ├─ button-top-left.mp3
│   ├─ button-top-right.mp3
│   ├─ error.mp3
│   ├─ favicon.ico
│   └─ placeholder.jpg
└─ src                         # Frontend React code
    ├─ app.jsx                 # Top level component
    ├─ app.css
    ├─ about                   # About component
    │   ├─ about.css
    │   └─ about.jsx
    ├─ login                   # Login component
    │   └─ login.jsx
    ├─ play                    # Game play component
    │   ├─ play.jsx
    │   └─ play.css
    └─ scores                  # Scores component
        ├─ scores.css
        └─ scores.jsx
```

Notice how much better structured the code is and how we have leveraged Vite and React not only to build a reactive SPA but also to modularize the code.








# The Internet

The internet globally connects independent networks and computing devices. In a simplistic way, you can think of the internet as a massive redundant collection of wires that connect up all the computers in the world. A lot of those wires are wireless (WiFi, satellite, or cell), and not all of the computers in the whole world are connected, but generally that is what the internet is. The deeper your mental model of the internet is, the more effectively you will be able to create web applications.

## Making connections

When one device wants to talk to another it must have an IP address. Usually, human users prefer a symbolic name over an IP address. The symbolic name is called a domain name. Domain names are converted to IP address by doing a lookup in the Domain Name System (DNS). You can look up the IP address for any domain name using the `dig` console utility.

```sh
➜  dig byu.edu

byu.edu.		5755	IN	A	128.187.16.184
```

Once you have the IP address, you connect to the device it represents by first asking for a connection route to the device. A connection route consists of many hops across the network until the destination is dynamically discovered and the connection established. With the connection the transport and application layers start exchanging data.

### Traceroute

You can determine the hops in a connection using the `traceroute` console utility. In the following example, we trace the route between a home computer and BYU. In the result you see the first address `192.168.1.1`. This is the addy of the network router the home computer is connected to. From there it goes through a couple devices that do not identify themselves and then hits the Google Fiber gateway. Google Fiber is the internet service provider, or ISP, for the requesting device. Then we jump through a few more unidentified devices before finally arriving at BYU (`128.187.16.184`).

```sh
➜  traceroute byu.edu

traceroute to byu.edu (128.187.16.184), 64 hops max, 52 byte packets
 1  192.168.1.1 (192.168.1.1)  10.942 ms  4.055 ms  4.694 ms
 2  * * *
 3  * * *
 4  192-119-18-212.mci.googlefiber.net (192.119.18.212)  5.369 ms  5.576 ms  6.456 ms
 5  216.21.171.197 (216.21.171.197)  6.283 ms  6.767 ms  5.532 ms
 6  * * *
 7  * * *
 8  * * *
 9  byu.com (128.187.16.184)  7.544 ms !X *  40.231 ms !X

```

If I run traceroute again I might see a slightly different route since every connection through the internet is dynamically calculated. The ability to discover a route makes the internet resilient when network devices fail or disappear from the network.

## Network internals

The actual sending of data across the internet uses the TCP/IP model. This is a layered architecture that covers everything from the physical wires to the data that a web application sends. At the top of the TCP/IP protocol is the application layer. It represents user functionality, such as the web (HTTP), mail (SMTP), files (FTP), remote shell (SSH), and chat (IRC). Underneath that is the transport layer which breaks the application layer's information into small chunks and sends the data. The actual connection is made using the internet layer. This finds the device you want to talk to and keeps the connection alive. Finally, at the bottom of the model is the link layer which deals with the physical connections and hardware.

### TCP/IP layers

| Layer       | Example         | Purpose                               |
| ----------- | --------------- | ------------------------------------- |
| Application | HTTPS           | Functionality like web browsing       |
| Transport   | TCP             | Moving connection information packets |
| Internet    | IP              | Establishing connections              |
| Link        | Fiber, hardware | Physical connections                  |





# Web Servers

A web server is a computing device that is hosting a web service that knows how to accept incoming internet connections and speak the HTTP application protocol

## Monolithic web servers

In the early days of web programming, you would buy a massive, complex, expensive, software program that spoke HTTP and installed on a hardware server. The package of server and software was considered the web server because the web service software was the only thing running on the server.

When Berners-Lee wrote his first web server it only served up static HTML files. This soon advanced so that they allowed dynamic functionality, including the ability to generate all the HTML on demand in response to a users interaction. That facilitated what we now know as modern web applications.

## Combining web and app services

Today, most modern programming languages include libraries that provide the ability to make connections and serve up HTTP.

Being able to easily create web services makes it easy to completely drop the monolithic web server concept and just build web services right into your web application.

## Web service gateways

Since it is so easy to build web services it is common to find multiple web services running on the same computing device. The trick is exposing the multiple services in a way that a connection can be made to each of them. Every network device allows for separate network connections by referring to a unique port number. Each service on the device starts up on a different port. In the example above, the go web service was using port 80. So you could just have a user access each service by referring to the port it was launched on. However, this makes it difficult for the user of the services to remember what port matches to which service. To resolve this we introduce a service gateway, or sometimes called a reverse proxy, that is itself a simple web service that listens on the common HTTPS port 443. The gateway then looks at the request and maps it to the other services running on a different ports.

Our web server will use the application `Caddy` as the gateway to our services. The details of how Caddy works will be given later.

## Microservices

Web services that provide a single functional purpose are microservices. By partitioning functionality into small logical chunks, you can develop and manage them independently from other functionality in a larger system.

They can also handle large fluctuations in user demand by simply running more and more stateless copies of the microservice from multiple virtual servers hosted in a dynamic cloud environment.

## Serverless

The idea of microservices naturally evolved into the world of `serverless` functionality where the server is conceptually removed from the architecture and you just write a function that speaks HTTP. That function is loaded through an gateway that maps a web request to the function. The gateway automatically scales the hardware needed to host the serverless function based on demand. This reduces what the web application developer needs to think about down to a single independent function.




# Domain names

You can get the IP address for any domain using the `dig` console utility. Notice that in the following example there are actually multiple IP addresses associated with the domain name `amazon.com`. This allows for redundancy in case one of the IP addresses fails to successfully resolve to a valid connection because the server listening at that IP address is not responding.

```sh
➜  dig amazon.com

amazon.com.		126	IN	A	205.251.242.103
amazon.com.		126	IN	A	52.94.236.248
amazon.com.		126	IN	A	54.239.28.85
```

A domain name is simply a text string that follows a specific naming convention and is listed in a special database called the domain name registry.

Domain names are broken up into a root domain, with one or more possible subdomain prefixes. The root domain is represented by a secondary level domain and a top level domain. The top level domain (TLD) represent things like `com`, `edu`, or `click`. So a root domain would look something like `byu.edu`, `google.com`, or `cs260.click`. The possible list of TLDs is controlled by ICANN, one of the governing boards of the internet.

The owner of a root domain can create any number of subdomains off the root domain. Each subdomain may resolve to a different IP address. So the owner of `cs260.click` can have subdomains for travel (`travel.cs260.click`), finance (`finance.cs260.click`), or a blog (`blog.cs260.click`).

You can get information about a domain name from the domain name registry using the `whois` console utility.

```yaml
➜  whois byu.edu

Domain Name: BYU.EDU

Registrant:
	Brigham Young University
	3009 ITB
	2027 ITB
	Provo, UT 84602
	USA

Administrative Contact:
	Mark Longhurst
	Brigham Young University
	Office of Information Technology
	1208 ITB
	Provo, UT 84602
	USA
	+1.8014220488
	markl@byu.edu

Technical Contact:
	Brent Goodman
	Brigham Young University
	Office of Information Technology
	1203J ITB
	Provo, UT 84602
	USA
	+1.8014227782
	dnsmaster@byu.edu

Domain record activated:    19-Jan-1987
Domain record last updated: 11-Jul-2022
Domain expires:             31-Jul-2025
```

This provides information such as a technical contact to talk to if there is a problem with the domain, and an administrative contact to talk to if you want to buy the domain. Maybe we should talk to Mark and see if he is willing to sell.

## DNS

Once a domain name is in the registry it can be listed with a domain name system (DNS) server and associated with an IP address. Of course you must also lease the IP address before you can use it to uniquely identify a device on the internet, but that is a topic for another time. Every DNS server in the world references a few special DNS servers that are considered the `authoritative name servers` for associating a domain name with an IP address.

The DNS database records that facilitate the mapping of domain names to IP addresses come in several flavors. The main ones we are concerned with are the `address` (`A`) and the `canonical name` (`CNAME`) records. An `A` record is a straight mapping from a domain name to IP address. A `CNAME` record maps one domain name to another domain name. This acts as a domain name alias. You would use a CNAME to do things like map `byu.com` to the same IP address as `byu.edu` so that either one could be used.

When you enter a domain name into a browser, the browser first checks to see if it has the name already in its cache of names. If it does not, it contacts a DNS server and gets the IP address. The DNS server also keeps a cache of names. If the domain name is not in the cache, it will request the name from an `authoritative name server`. If the authority does not know the name then you get an unknown domain name error. If the process does resolve, then the browser makes the HTTP connection to the associated IP address.

As you can see, there is a lot of levels of name caching. This is done for performance reasons, but it also can be frustrating when you are trying to update the information associated with your domain name. This is where the `time to live` (`TTL`) setting for a domain record comes into play. You can set this to be something short like 5 minutes or as long as several days. The different caching layers should then honor the TTL and clear their cache after the requested period has passed.

## Leasing a domain name

You can pay to lease an unused domain name for a specific period of time. Before the lease expires, you have the right to extend the lease for an additional amount of time. The cost to buy the domain varies from something like $3 to $200 a year. Buying, or sub-leasing, an existing domain name from a private party can be very expensive, and so you are better off buying something obscure like `idigfor.gold` (currently available for only $101). This is one reason why companies have such strange names these days.



# Web Services Introduction


Up to this point, your entire application is loaded from your web server and runs on the user's browser. It starts when the browser requests the `index.html` file from the web server. The `index.html`, in turn, references other HTML, CSS, JavaScript, or image files. All of these files, that are running on the browser, comprise the `frontend` of your application.

Notice that when the frontend requests the application files from the web server it is using the HTTPS protocol. All web programming requests between devices use HTTPS to exchange data.

From our frontend JavaScript we can make requests to external services running anywhere in the world. This allows us to get external data, such as an inspirational quote, that we then inject into the DOM for the user to read. To make a web service request, we supply the URL of the web service to the `fetch` function that is built into the browser.

The next step in building a full stack web application, is to create our own web service. Our web service will provide the static frontend files along with functions to handle `fetch` requests for things like storing data persistently, providing security, running tasks, executing application logic that you don't want your user to be able to see, and communicating with other users. The functionality provided by your web service represents the `backend` of your application.

Generally the functions provided by a web service are called `endpoints`, or sometimes APIs. You access the web service endpoints from your frontend JavaScript with the fetch function. In the picture below, the backend web service is not only providing the static files that make up the frontend, but also providing the web service endpoints that the frontend calls to do things like get a user, create a user, or get high scores.

The backend web service can also use `fetch` to make requests to other web services. For example, in the image below the frontend uses `fetch` to request the user's data from the backend web service. The backend then uses `fetch` to call two other web services, one to get the user's data from the database, and another one to request subway routes that are near the user's home. That data is then combined together by the backend web service and returned to the frontend for display in the browser.

In following instruction we will discuss how to use fetch, HTTP, and URLs, and build a web service using the Node.js application. With all of this in place your application will be a full stack application comprised of both a frontend and a backend.




# URL

The Uniform Resource Locator (URL) represents the location of a web resource. A web resource can be anything, such as a web page, font, image, video stream, database record, or JSON object. It can also be completely ephemeral, such as a visitation counter, or gaming session.

Looking at the different parts of a URL is a good way to understand what it represents. Here is an example URL that represents the summary of accepted CS 260 BYU students that is accessible using secure HTTP.

```js
https://byu.edu:443/cs/260/student?filter=accepted#summary
```

The URL syntax uses the following convention. Notice the delimiting punctuation between the parts of the URL. Most parts of the URL are optional. The only ones that are required are the scheme, and the domain name.

```yaml
<scheme>://<domain name>:<port>/<path>?<parameters>#<anchor>
```

| Part        | Example                              | Meaning                                                                                                                                                                                                                                                                             |
| ----------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scheme      | https                                | The protocol required to ask for the resource. For web applications, this is usually HTTPS. But it could be any internet protocol such as FTP or MAILTO.                                                                                                                            |
| Domain name | byu.edu                              | The domain name that owns the resource represented by the URL.                                                                                                                                                                                                                      |
| Port        | 3000                                 | The port specifies the numbered network port used to connect to the domain server. Lower number ports are reserved for common internet protocols, higher number ports can be used for any purpose. The default port is 80 if the scheme is HTTP, or 443 if the scheme is HTTPS.     |
| Path        | /school/byu/user/8014                | The path to the resource on the domain. The resource does not have to physically be located on the file system with this path. It can be a logical path representing endpoint parameters, a database table, or an object schema.                                                    |
| Parameters  | filter=names&highlight=intro,summary | The parameters represent a list of key value pairs. Usually it provides additional qualifiers on the resource represented by the path. This might be a filter on the returned resource or how to highlight the resource. The parameters are also sometimes called the query string. |
| Anchor      | summary                              | The anchor usually represents a sub-location in the resource. For HTML pages this represents a request for the browser to automatically scroll to the element with an ID that matches the anchor. The anchor is also sometimes called the hash, or fragment ID.                     |

Technically you can also provide a user name and password before the domain name. This was used historically to authenticate access, but for security reasons this is deprecated. However, you will still see this convention for URLs that represent database connection strings.

## URL, URN, and URI

You will sometimes hear the use of URN or URI when talking about web resources. A Uniform Resource Name (URN) is a unique resource name that does not specify location information. For example, a book URN might be `urn:isbn:10,0765350386`. A Uniform Resource Identifier (URI) is a general resource identifier that could refer to either a URL or a URN. With web programming you are almost always talking about URLs and therefore you should not use the more general URI.





# Ports

When you connect to a device on the internet you need both an IP address and a numbered port. Port numbers allow a single device to support multiple protocols (e.g. HTTP, HTTPS, FTP, or SSH) as well as different types of services (e.g. search, document, or authentication). The ports may be exposed externally, or they may only be used internally on the device. For example, the HTTPS port (443) might allow the world to connect, the SSH port (22) might only allow computers at your school, and a service defined port (say 3000) may only allow access to processes running on the device.

The internet governing body, IANA, defines the standard usage for port numbers. Ports from 0 to 1023 represent standard protocols. Generally a web service should avoid these ports unless it is providing the protocol represented by the standard. Ports from 1024 to 49151 represent ports that have been assigned to requesting entities. However, it is very common for these ports to be used by services running internally on a device. Ports from 49152 to 65535 are considered dynamic and are used to create dynamic connections to a device.

Here is a list of common port numbers that you might come across.

| Port | Protocol                                                                                           |
| ---- | -------------------------------------------------------------------------------------------------- |
| 20   | File Transfer Protocol (FTP) for data transfer                                                     |
| 22   | Secure Shell (SSH) for connecting to remote devices                                                |
| 25   | Simple Mail Transfer Protocol (SMTP) for sending email                                             |
| 53   | Domain Name System (DNS) for looking up IP addresses                                               |
| 80   | Hypertext Transfer Protocol (HTTP) for web requests                                                |
| 110  | Post Office Protocol (POP3) for retrieving email                                                   |
| 123  | Network Time Protocol (NTP) for managing time                                                      |
| 161  | Simple Network Management Protocol (SNMP) for managing network devices such as routers or printers |
| 194  | Internet Relay Chat (IRC) for chatting                                                             |
| 443  | HTTP Secure (HTTPS) for secure web requests                                                        |

## Your ports

As an example of how ports are used we can look at your web server. When you built your web server you externally exposed port 22 so that you could use SSH to open a remote console on the server, port 443 for secure HTTP communication, and port 80 for unsecure HTTP communication.

Your web service, Caddy, is listening on ports 80 and 443. When Caddy gets a request on port 80, it automatically redirects the request to port 443 so that a secure connection is used. When Caddy gets a request on port 443 it examines the path provided in the HTTP request (as defined by the URL) and if the path matches a static file, it reads the file off disk and returns it. If the HTTP path matches one of the definitions it has for a gateway service, Caddy makes a connection on that service's port (e.g. 3000 or 4000) and passes the request to the service.

Internally on your web server, you can have as many web services running as you would like. However, you must make sure that each one uses a different port to communicate on. You run your Simon service on port 3000 and therefore **cannot** use port 3000 for your startup service. Instead you use port 4000 for your startup service. It does not matter what high range port you use. It only matters that you are consistent and that they are only used by one service.







# HTTP

Hypertext Transfer Protocol (`HTTP`) is how the web talks. When a web browser makes a request to a web server it does it using the HTTP protocol. In previous instruction we discussed how to use HTTP. Now, we will talk about the internals of HTTP. Just like becoming fluent in a foreign language makes a visit to another country more enjoyable, understanding how to speak HTTP helps you communicate effectively when talking on the web.

When a web client (e.g. a web browser) and a web server talk they exchange HTTP requests and responses. The browser will make an HTTP request and the server will generate an HTTP response. You can see the HTTP exchange by using the browser's debugger or by using a console tool like `curl`. For example, in your console you can use `curl` to make the following request.

```sh
curl -v -s http://info.cern.ch/hypertext/WWW/Helping.html
```

### Request

The HTTP request for the above command would look like the following.

```http
GET /hypertext/WWW/Helping.html HTTP/1.1
Host: info.cern.ch
Accept: text/html
```

An HTTP request has this general syntax.

```yaml
<verb> <url path, parameters, anchor> <version>
[<header key: value>]*
[

  <body>
]
```

The first line of the HTTP request contains the `verb` of the request, followed by the path, parameters, and anchor of the URL, and finally the version of HTTP being used. The following lines are optional headers that are defined by key value pairs. After the headers you have an optional body. The body start is delimited from the headers with two new lines.

In the above example, we are asking to `GET` a resource found at the path `/hypertext/WWW/Helping.html`. The version used by the request is `HTTP/1.1`. This is followed by two headers. The first specifies the requested host (i.e. domain name). The second specifies what type of resources the client will accept. The resource type is always a MIME type as defined by internet governing body IANA. In this case we are asking for HTML.

### Response

The response to the above request looks like this.

```yaml
HTTP/1.1 200 OK
Date: Tue, 06 Dec 2022 21:54:42 GMT
Server: Apache
Last-Modified: Thu, 29 Oct 1992 11:15:20 GMT
ETag: "5f0-28f29422b8200"
Accept-Ranges: bytes
Content-Length: 1520
Connection: close
Content-Type: text/html

<TITLE>Helping -- /WWW</TITLE>
<NEXTID 7>
<H1>How can I help?</H1>There are lots of ways you can help if you are interested in seeing
the <A NAME=4 HREF=TheProject.html>web</A> grow and be even more useful...
```

An HTTP response has the following syntax.

```yaml
<version> <status code> <status string>
[<header key: value>]*
[

  <body>
]
```

You can see that the response syntax is similar to the request syntax. The major difference is that the first line represents the version and the status of the response.

Understanding the meaning of the common HTTP verbs, status codes, and headers is important for you to understand, as you will use them in developing a web application. Take some time to internalize the following common values.

## Verbs

There are several verbs that describe what the HTTP request is asking for. The list below only describes the most common ones.

| Verb    | Meaning                                                                                                                                                                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET     | Get the requested resource. This can represent a request to get a single resource or a resource representing a list of resources.                                                                                                                        |
| POST    | Create a new resource. The body of the request contains the resource. The response should include a unique ID of the newly created resource.                                                                                                             |
| PUT     | Update a resource. Either the URL path, HTTP header, or body must contain the unique ID of the resource being updated. The body of the request should contain the updated resource. The body of the response may contain the resulting updated resource. |
| DELETE  | Delete a resource. Either the URL path or HTTP header must contain the unique ID of the resource to delete.                                                                                                                                              |
| OPTIONS | Get metadata about a resource. Usually only HTTP headers are returned. The resource itself is not returned.                                                                                                                                              |

## Status codes

It is important that you use the standard HTTP status codes in your HTTP responses so that the client of a request can know how to interpret the response. The codes are partitioned into five blocks.

- 1xx - Informational.
- 2xx - Success.
- 3xx - Redirect to some other location, or that the previously cached resource is still valid.
- 4xx - Client errors. The request is invalid.
- 5xx - Server errors. The request cannot be satisfied due to an error on the server.

Within those ranges here are some of the more common codes. See the MDN documentation for a full description of status codes.

| Code | Text                                                                                 | Meaning                                                                                                                           |
| ---- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| 100  | Continue                                                                             | The service is working on the request                                                                                             |
| 200  | Success                                                                              | The requested resource was found and returned as appropriate.                                                                     |
| 201  | Created                                                                              | The request was successful and a new resource was created.                                                                        |
| 204  | No Content                                                                           | The request was successful but no resource is returned.                                                                           |
| 304  | Not Modified                                                                         | The cached version of the resource is still valid.                                                                                |
| 307  | Permanent redirect                                                                   | The resource is no longer at the requested location. The new location is specified in the response location header.               |
| 308  | Temporary redirect                                                                   | The resource is temporarily located at a different location. The temporary location is specified in the response location header. |
| 400  | Bad request                                                                          | The request was malformed or invalid.                                                                                             |
| 401  | Unauthorized                                                                         | The request did not provide a valid authentication token.                                                                         |
| 403  | Forbidden                                                                            | The provided authentication token is not authorized for the resource.                                                             |
| 404  | Not found                                                                            | An unknown resource was requested.                                                                                                |
| 408  | Request timeout                                                                      | The request takes too long.                                                                                                       |
| 409  | Conflict                                                                             | The provided resource represents an out of date version of the resource.                                                          |
| 418  | I'm a teapot | The service refuses to brew coffee in a teapot.                                                                                   |
| 429  | Too many requests                                                                    | The client is making too many requests in too short of a time period.                                                             |
| 500  | Internal server error                                                                | The server failed to properly process the request.                                                                                |
| 503  | Service unavailable                                                                  | The server is temporarily down. The client should try again with an exponential back off.                                         |

## Headers

HTTP headers specify metadata about a request or response. This includes things like how to handle security, caching, data formats, and cookies. Some common headers that you will use include the following.

| Header                      | Example                              | Meaning                                                                                                                                                                        |
| --------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization               | Bearer bGciOiJIUzI1NiIsI             | A token that authorized the user making the request.                                                                                                                           |
| Accept                      | image/\*                             | The format the client accepts. This may include wildcards.                                                                                                            |
| Content-Type                | text/html; charset=utf-8             | The format of the content being sent. These are described using standard MIME types. |
| Cookie                      | SessionID=39s8cgj34; csrftoken=9dck2 | Key value pairs that are generated by the server and stored on the client.                                                                                                     |
| Host                        | info.cern.ch                         | The domain name of the server. This is required in all requests.                                                                                                               |
| Origin                      | cs260.click                          | Identifies the origin that caused the request. A host may only allow requests from specific origins.                                                                           |
| Access-Control-Allow-Origin | https://cs260.click                  | Server response of what origins can make a request. This may include a wildcard.                                                                                               |
| Content-Length              | 368                                  | The number of bytes contained in the response.                                                                                                                                 |
| Cache-Control               | public, max-age=604800               | Tells the client how it can cache the response.                                                                                                                                |
| User-Agent                  | Mozilla/5.0 (Macintosh)              | The client application making the request.                                                                                                                                     |

## Body

The format of the body of an HTTP request or response is defined by the `Content-Type` header. For example, it may be HTML text (text/html), a binary image format (image/png), JSON (application/json), or JavaScript (text/javascript). A client may specify what formats it accepts using the `accept` header.

## Cookies

HTTP itself is stateless. This means that one HTTP request does not know anything about a previous or future request. However, that does not mean that a server or client cannot track state across requests. One common method for tracking state is the `cookie`. Cookies are generated by a server and passed to the client as an HTTP header.

```http
HTTP/2 200
Set-Cookie: myAppCookie=tasty; SameSite=Strict; Secure; HttpOnly
```

The client then caches the cookie and returns it as an HTTP header back to the server on subsequent requests.

```http
HTTP/2 200
Cookie: myAppCookie=tasty
```

This allows the server to remember things like the language preference of the user, or the user's authentication credentials. A server can also use cookies to track, and share, everything that a user does. However, there is nothing inherently evil about cookies; the problem comes from web applications that use them as a means to violate a user's privacy or inappropriately monetize their data.

## HTTP Versions

HTTP continually evolves in order to increase performance and support new types of applications. You can read about the evolution of HTTP on MDN.

| Year | Version | Features                                        |
| ---- | ------- | ----------------------------------------------- |
| 1990 | HTTP0.9 | one line, no versions, only get                 |
| 1996 | HTTP1   | get/post, header, status codes, content-type    |
| 1997 | HTTP1.1 | put/patch/delete/options, persistent connection |
| 2015 | HTTP2   | multiplex, server push, binary representation   |
| 2022 | HTTP3   | QUIC for transport protocol, always encrypted   |





# Fetch
The ability to make HTTP requests from JavaScript is one of the main technologies that changed the web from static content pages (Web 1.0) to one of web applications (Web 2.0) that fully interact with the user. Microsoft introduced the first API for making HTTP requests from JavaScript with the `XMLHttpRequest` API.

Today, the `fetch API` is the preferred way to make HTTP requests. The `fetch` function is built into the browser's JavaScript runtime. This means you can call it from JavaScript code running in a browser.

The basic usage of fetch takes a URL and returns a promise. The promise `then` function takes a callback function that is asynchronously called when the requested URL content is obtained. If the returned content is of type `application/json` you can use the `json` function on the response object to convert it to a JavaScript object.

The following example makes a fetch request to get and display an inspirational quote. If the request method is unspecified, it defaults to GET.

```js
fetch('https://quote.cs260.click')
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```

**Response**

```js
{
  author: 'Kyle Simpson',
  quote: "There's nothing more permanent than a temporary hack."
}
```

To do a POST request you populate the options parameter with the HTTP method and headers.

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'test title',
    body: 'test body',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```










# Node web service

With JavaScript we can write code that listens on a network port (e.g. 80, 443, 3000, or 8080), receives HTTP requests, processes them, and then responds. We can use this to create a simple web service that we then execute using Node.js.

First create your project.

```sh
➜ mkdir webservicetest
➜ cd webservicetest
➜ npm init -y
```

Now, open VS Code and create a file named `index.js`. Paste the following code into the file and save.

```js
const http = require('http');
const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Hello Node.js! [${req.method}] ${req.url}</h1>`);
  res.end();
});

server.listen(8080, () => {
  console.log(`Web service listening on port 8080`);
});
```

This code uses the Node.js built-in `http` package to create our HTTP server using the `http.createServer` function along with a callback function that takes a request (`req`) and response (`res`) object. That function is called whenever the server receives an HTTP request. In our example, the callback always returns the same HTML snippet, with a status code of 200, and a Content-Type header, no matter what request is made. Basically this is just a simple dynamically generated HTML page. A real web service would examine the HTTP path and return meaningful content based upon the purpose of the endpoint.

The `server.listen` call starts listening on port 8080 and blocks until the program is terminated.

We execute the program by going back to our console window and running Node.js to execute our index.js file. If the service starts up correctly then it should look like the following.

```sh
➜ node index.js
Web service listening on port 8080
```

You can now open your browser and point it to `localhost:8080` and view the result.

Use different URL paths in the browser and note that it will echo the HTTP method and path back in the document. You can kill the process by pressing `CTRL-C` in the console.

Note that you can also start up Node and execute the `index.js` code directly in VS Code. To do this open index.js in VS Code and press the 'F5' key. This should ask you what program you want to run. Select `node.js`. This starts up Node.js with the `index.js` file, but also attaches a debugger so that you can set breakpoints in the code and step through each line of code.

⚠ Make sure you complete the above steps. For the rest of the course you will be executing your code using Node.js to run your backend code and serve up your frontend code to the browser. This means you will no longer be using the `VS Code Live Server extension` to serve your frontend code in the browser.


## Debugging a Node.js web service

In order to debug a web service running under Node.js we first need to write our code. Replace the code in your `main.js` file with the following.

```js
const express = require('express');
const app = express();

app.get('/*', (req, res) => {
  res.send({ url: req.originalUrl });
});

const port = 8080;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
```

Switch to your console application and run `npm init -y` and `npm install express` from your code directory so that we can use the Express package to write a simple web service.

Now we are ready to debug again. Set a breakpoint on the getStore endpoint callback (line 5) and the `app.listen` call (line 9). Start debugging by pressing `F5`. The debugger should stop on the `listen` call where you can inspect the `app` variable. Press `F5` again to continue running. Now open up your browser and set the location to `localhost:8080`. This should hit the breakpoint on the endpoint. Take some time to inspect the `req` object. You should be able to see what the HTTP method is, what parameters are provided, and what the path currently is. Press `F5` to continue.

Your browser should display the JSON object, containing the URL, that you returned from your endpoint. Now change the URL in the browser to include a path and some query parameters. Requesting that URL should cause your breakpoint to hit again where you can see the URL changes reflected in the req object.

Now, instead of pressing `F5` to continue, press `F11` to step into the `res.send` function. This will take you out of your code and into the Express code that handles sending a response. Because you installed the Express package using NPM, all of Express's source code is sitting in the `node_modules` directory. You can also set breakpoints there, examine variables, and step into functions. Debugging into popular packages is a great way to learn how to code by seeing how really good programmers do things. Take some time to walk around Holowaychuk's code and see if you can understand what it is doing.

## Nodemon

Once you start writing complex web applications you will find yourself making changes in the middle of debugging sessions and you would like to have `node` restart automatically and update the browser as the changes are saved. This seems like a simple thing, but over the course of hundreds of changes, every second you can save really starts to add up.

The Nodemon package is basically a wrapper around `node` that watches for files in the project directory to change. When it detects that you saved something it will automatically restart `node`.

If you would like to experiment with this then take the following steps. First install Nodemon globally so that you can use it to debug all of your projects.

```sh
npm install -g nodemon
```

Then, because VS Code does not know how to launch Nodemon automatically, you need create a VS Code launch configuration. In VS Code press `CTRL-SHIFT-P` (on Windows) or `⌘-SHIFT-P` (on Mac) and type the command `Debug: Add configuration`. This will then ask you what type of configuration you would like to create. Type `Node.js` and select the `Node.js: Nodemon setup` option. In the launch configuration file that it creates, change the program from `app.js` to `main.js` (or whatever the main JavaScript file is for your application) and save the configuration file.

Now when you press `F5` to start debugging it will run Nodemon instead of Node.js, and your changes will automatically update your application when you save.







# Express

In the previous instruction you saw how to use Node.js to create a simple web server. This works great for little projects where you are trying to quickly serve up some web content, but to build a production-ready application you need a framework with a bit more functionality for easily implementing a full web service. This is where the Node package `Express` come in. Express provides support for:

1. Routing requests for service endpoints
1. Manipulating HTTP requests with JSON body content
1. Generating HTTP responses
1. Using `middleware` to add functionality

Everything in Express revolves around creating and using HTTP routing and middleware functions.

You create an Express application by using NPM to install the Express package and then calling the `express` constructor to create the Express application and listen for HTTP requests on a desired port.

```sh
➜ npm install express
```

```js
const express = require('express');
const app = express();

app.listen(8080);
```

With the `app` object you can now add HTTP routing and middleware functions to the application.

## Defining routes

HTTP endpoints are implemented in Express by defining routes that call a function based upon an HTTP path. The Express `app` object supports all of the HTTP verbs as functions on the object. For example, if you want to have a route function that handles an HTTP GET request for the URL path `/store/provo` you would call the `get` method on the app.

```js
app.get('/store/provo', (req, res, next) => {
  res.send({name: 'provo'});
});
```

The `get` function takes two parameters, a URL path matching pattern, and a callback function that is invoked when the pattern matches. The path matching parameter is used to match against the URL path of an incoming HTTP request.

The callback function has three parameters that represent the HTTP request object (`req`), the HTTP response object (`res`), and the `next` routing function that Express expects to be called if this routing function wants another function to generate a response.

The Express `app` compares the routing function patterns in the order that they are added to the Express `app` object. So if you have two routing functions with patterns that both match, the first one that was added will be called and given the next matching function in the `next` parameter.

In our example above we hard coded the store name to be `provo`. A real store endpoint would allow any store name to be provided as a parameter in the path. Express supports path parameters by prefixing the parameter name with a colon (`:`). Express creates a map of path parameters and populates it with the matching values found in the URL path. You then reference the parameters using the `req.params` object. Using this pattern you can rewrite our getStore endpoint as follows.

```js
app.get('/store/:storeName', (req, res, next) => {
  res.send({name: req.params.storeName});
});
```

If we run our JavaScript using `node` we can see the result when we make an HTTP request using `curl`.

```sh
➜ curl localhost:8080/store/orem
{"name":"orem"}
```

If you wanted an endpoint that used the POST or DELETE HTTP verb then you just use the `post` or `delete` function on the Express `app` object.

The route path can also include a limited wildcard syntax or even full regular expressions in path pattern. Here are a couple route functions using different pattern syntax.

```js
// Wildcard - matches /store/x and /star/y
app.put('/st*/:storeName', (req, res) => res.send({update: req.params.storeName}));

// Pure regular expression
app.delete(/\/store\/(.+)/, (req, res) => res.send({delete: req.params[0]}));
```

Notice that in these examples the `next` parameter was omitted. Since we are not calling `next` we do not need to include it as a parameter. However, if you do not call `next` then no following middleware functions will be invoked for the request.

## Using middleware

The standard Mediator/Middleware design pattern has two pieces: a mediator and middleware. Middleware represents componentized pieces of functionality. The mediator loads the middleware components and determines their order of execution. When a request comes to the mediator it then passes the request around to the middleware components. Following this pattern, Express is the mediator, and middleware functions are the middleware components.

Express comes with a standard set of middleware functions. These provide functionality like routing, authentication, CORS, sessions, serving static web files, cookies, and logging. Some middleware functions are provided by default, and other ones must be installed using NPM before you can use them. You can also write your own middleware functions and use them with Express.

A middleware function looks very similar to a routing function. That is because routing functions are also middleware functions. The only difference is that routing functions are only called if the associated pattern matches. Middleware functions are always called for every HTTP request unless a preceding middleware function does not call `next`. A middleware function has the following pattern:

```js
function middlewareName(req, res, next)
```

The middleware function parameters represent the HTTP request object (`req`), the HTTP response object (`res`), and the `next` middleware function to pass processing to. You should usually call the `next` function after completing processing so that the next middleware function can execute.

### Creating your own middleware

As an example of writing your own middleware, you can create a function that logs out the URL of the request and then passes on processing to the next middleware function.

```js
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
```

Remember that the order that you add your middleware to the Express app object controls the order that the middleware functions are called. Any middleware that does not call the `next` function after doing its processing, stops the middleware chain from continuing.

### Builtin middleware

In addition to creating your own middleware functions, you can use a built-in middleware function. Here is an example of using the `static` middleware function. This middleware responds with static files, found in a given directory, that match the request URL.

```js
app.use(express.static('public'));
```

Now if you create a subdirectory in your project directory and name it `public` you can serve up any static content that you would like. For example, you could create an `index.html` file that is the default content for your web service. Then when you call your web service without any path the `index.html` file will be returned.

### Third party middleware

You can also use third party middleware functions by using NPM to install the package and including the package in your JavaScript with the `require` function. The following uses the `cookie-parser` package to simplify the generation and access of cookies.

```sh
➜ npm install cookie-parser
```

```js
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.post('/cookie/:name/:value', (req, res, next) => {
  res.cookie(req.params.name, req.params.value);
  res.send({cookie: `${req.params.name}:${req.params.value}`});
});

app.get('/cookie', (req, res, next) => {
  res.send({cookie: req.cookies});
});
```

It is common for middleware functions to add fields and functions to the `req` and `res` objects so that other middleware can access the functionality they provide. You see this happening when the `cookie-parser` middleware adds the `req.cookies` object for reading cookies, and also adds the `res.cookie` function in order to make it easy to add a cookie to a response.

## Error handling middleware

You can also add middleware for handling errors that occur. Error middleware looks similar to other middleware functions, but it takes an additional `err` parameter that contains the error.

```js
function errorMiddlewareName(err, req, res, next)
```

If you wanted to add a simple error handler for anything that might go wrong while processing HTTP requests you could add the following.

```js
app.use(function (err, req, res, next) {
  res.status(500).send({type: err.name, message: err.message});
});
```

We can test that our error middleware is getting used by adding a new endpoint that generates an error.

```js
app.get('/error', (req, res, next) => {
  throw new Error('Trouble in river city');
});
```

Now if we use `curl` to call our error endpoint we can see that the response comes from the error middleware.

```sh
➜ curl localhost:8080/error
{"type":"Error","message":"Trouble in river city"}
```

## Putting it all together

Here is a full example of our web service built using Express.

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Third party middleware - Cookies
app.use(cookieParser());

app.post('/cookie/:name/:value', (req, res, next) => {
  res.cookie(req.params.name, req.params.value);
  res.send({cookie: `${req.params.name}:${req.params.value}`});
});

app.get('/cookie', (req, res, next) => {
  res.send({cookie: req.cookies});
});

// Creating your own middleware - logging
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// Built in middleware - Static file hosting
app.use(express.static('public'));

// Routing middleware
app.get('/store/:storeName', (req, res) => {
  res.send({name: req.params.storeName});
});

app.put('/st*/:storeName', (req, res) => res.send({update: req.params.storeName}));

app.delete(/\/store\/(.+)/, (req, res) => res.send({delete: req.params[0]}));

// Error middleware
app.get('/error', (req, res, next) => {
  throw new Error('Trouble in river city');
});

app.use(function (err, req, res, next) {
  res.status(500).send({type: err.name, message: err.message});
});

// Listening to a network port
const port = 8080;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
```







# SOP and CORS

Security should always be on your mind when you are working with the web. The ability to provide services to a global audience makes the information on the web very valuable, and therefore an attractive target for nefarious parties. When website architecture and browser clients were still in their infancy they allowed JavaScript to make requests from one domain while displaying a website from a different domain. These are called cross-origin requests.

Consider the following example. An attacker sends out an email with a link to a hacker website (`byu.iinstructure.com`) that is similar to the real course website. Notice the additional `i`. If the hacker website could request anything from the real website then it could make itself appear and act just like the real education website. All it would have to do is request images, html, and login endpoints from the course's website and display the results on the hacker website. This would give the hacker access to everything the user did.

To combat this problem the `Same Origin Policy` (SOP) was created. Simply stated SOP only allows JavaScript to make requests to a domain if it is the same domain that the user is currently viewing. A request from `byu.iinstructure.com` for service endpoints that are made to `byu.instructure.com` would fail because the domains do not match. This provides significant security, but it also introduces complications when building web applications. For example, if you want build a service that any web application can use it would also violate the SOP and fail. In order to address this, the concept of Cross Origin Resource Sharing (CORS) was invented.

CORS allows the client (e.g. browser) to specify the origin of a request and then let the server respond with what origins are allowed. The server may say that all origins are allowed, for example if they are a general purpose image provider, or only a specific origin is allowed, for example if they are a bank's authentication service. If the server doesn't specify what origin is allowed then the browser assumes that it must be the same origin.

Going back to our hacker example, the HTTP request from the hacker site (`byu.iinstructure.com`) to the course's authentication service (`byu.instructure.com`) would look like the following.

```http
GET /api/auth/login HTTP/2
Host: byu.instructure.com
Origin: https://byu.iinstructure.com
```

In response the course website would return:

```http
HTTP/2 200 OK
Access-Control-Allow-Origin: https://byu.instructure.com
```

The browser would then see that the actual origin of the request does not match the allowed origin and so the browser blocks the response and generates an error.

Notice that with CORS, it is the browser that is protecting the user from accessing the course website's authentication endpoint from the wrong origin. CORS is only meant to alert the user that something nefarious is being attempted. A hacker can still proxy requests through their own server to the course website and completely ignore the `Access-Control-Allow-Origin` header. Therefore the course website needs to implement its own precautions to stop a hacker from using its services inappropriately.

## Using third party services

When you make requests to your own web services you are always on the same origin and so you will not violate the SOP. However, if you want to make requests to a different domain than the one your web application is hosted on, then you need to make sure that domain allows requests as defined by the `Access-Control-Allow-Origin` header it returns. For example, if I have JavaScript in my web application loaded from `cs260.click` that makes a fetch request for an image from the website `i.picsum.photos` the browser will fail the request with an HTTP status code of 403 and an error message that CORS has blocked the request.

That happens because `i.picsum.photos` does not return an `Access-Control-Allow-Origin` header. Without a header the browser assumes that all requests must be made from the same origin.

If your web application instead makes a service request to `icanhazdadjoke.com` to get a joke, that request will succeed because `icanhazdadjoke.com` returns an `Access-Control-Allow-Origin` header with a value of `*` meaning that any origin can make requests to this service.

```http
HTTP/2 200
access-control-allow-origin: *

Did you hear about the bread factory burning down? They say the business is toast.
```

This would have also succeeded if the HTTP header had explicitly listed your web application domain. For example, if you make your request from the origin `cs260.click` the following response would also satisfy CORS.

```http
HTTP/2 200
access-control-allow-origin: https://cs260.click

I’ll tell you something about German sausages, they’re the wurst
```

This all means that you need to test the services you want to use before you include them in your application. Make sure they are responding with `*` or your calling origin. If they do not then you will not be able to use them.






# Service Design

Web services provide the interactive functionality of your web app. They commonly authenticate users, track their session state, provide, store, and analyze data, connect peers and aggregate user info. Making your web service easy to use, performant, and extensible are factors that determine the success of your app. A good design will result in increase productivity, satisfied users, and lower processing costs.

## Model and sequence diagrams

When first considering your service design it is helpful to model the application's primary objects and the interactions of the objects. You should attempt to stay as close to the model that is in your user's mind as possible. Avoid introducing a model that focuses on programming constructs and infrastructure. For example, a chat program should model participants, conversations, and messages. It should not model user devices, network connections, and data blobs.

Once you have defined your primary objects you can create sequence diagrams that show how the objects interact with each other. This will help clarify your model and define the necessary endpoints. You can use a simple tool like `SequenceDiagram.org` to create and share diagrams.

## Leveraging HTTP

Web services are usually provided over HTTP, and so HTTP greatly influences the design of the service. The HTTP verbs such as GET, POST, PUT, and DELETE often mirror the designed actions of a web service. For example, a web service for managing comments might list the comments (GET), create a comment (POST), update a comment (PUT), and delete a comment (DELETE). Likewise, the MIME content types defined by IANA are a natural fit for defining the types of content that you want to provide (e.g. HTML, PNG, MP3, and MP4). 

The goal is to leverage those technologies as much as possible so that you don't have to recreate the functionality they provide and instead take advantage of the significant networking infrastructure built up around HTTP. This includes caching servers that increase your performance, edge servers that bring your content closer, and replication servers that provide redundant copies of your content and make your application more resilient to network failures.

## Endpoints

A web service is usually divided up into multiple service endpoints. Each endpoint provides a single functional purpose. All of the criteria that you would apply to creating well designed code functions also applies when exposing service endpoints.

⚠ Note that service endpoints are often called an Application Programming Interface (API). This is a throwback to old desktop applications and the programming interfaces that they exposed. Sometimes the term API refers to the entire collection of endpoints, and sometimes it is used to refer to a single endpoint.

Here are some things you should consider when designing your service's endpoints.

- **Grammatical** - With HTTP everything is a resource (think noun or object). You act on the resource with an HTTP verb. For example, you might have an order resource that is contained in a store resource. You then create, get, update, and delete order resources on the store resource.
- **Readable** - The resource you are referencing with an HTTP request should be clearly readable in the URL path. For example, an order resource might contain the path to both the order and store where the order resource resides: `/store/provo/order/28502`. This makes it easier to remember how to use the endpoint because it is human readable.
- **Discoverable** - As you expose resources that contain other resources you can provide the endpoints for the aggregated resources. This makes it so someone using your endpoints only needs to remember the top level endpoint and then they can discover everything else. For example, if you have a store endpoint that returns information about a store you can include an endpoint for working with a store in the response.

  ```http
  GET /store/provo  HTTP/2
  ```

  ```json
  {
    "id": "provo",
    "address": "Cougar blvd",
    "orders": "https://cs260.click/store/provo/orders",
    "employees": "https://cs260.click/store/provo/employees"
  }
  ```

- **Compatible** - When you build your endpoints you want to make it so that you can add new functionality without breaking existing clients. Usually this means that the clients of your service endpoints should ignore anything that they don't understand. Consider the two following JSON response versions.

  **Version 1**

  ```js
  {
    "name": "John Taylor"
  }
  ```

  **Version 2**

  ```js
  {
    "name": "John Taylor",
    "givenName": "John",
    "familyName": "Taylor"
  }
  ```

  By adding a new representation of the `name` field, you provide new functionality for clients that know how to use the new fields without harming older clients that ignore the new fields and simply use the old representation. This is all done without officially versioning the endpoint.

  If you are fortunate enough to be able to control all of your client code you can mark the `name` field as depreciated and in a future version remove it once all of the clients have upgraded. Usually you want to keep compatibility with at least one previous version of the endpoint so that there is enough time for all of the clients to migrate before compatibility is removed.

- **Simple** - Keeping your endpoints focused on the primary resources of your application helps to avoid the temptation to add endpoints that duplicate or create parallel access to primary resources. It is very helpful to write some simple class and sequence diagrams that outline your primary resources before you begin coding. These resources should focus on the actual resources of the system you are modeling. They should not focus on the data structure or devices used to host the resources. There should only be one way to act on a resource. Endpoints should only do one thing.

- **Documented** - The Open API Specification is a good example of tooling that helps create, use, and maintain documentation of your service endpoints. It is highly suggested that you make use of such tools in order to provide client libraries for your endpoints and a sandbox for experimentation. Creating an initial draft of your endpoint documentation before you begin coding will help you mentally clarify your design and produce a better final result. Providing access to your endpoint documentation along with your production system helps with client implementations and facilitates easier maintenance of the service. 

There are many models for exposing endpoints. We will consider three common ones, RPC, REST, and GraphQL.

## RPC

Remote Procedure Calls (RPC) expose service endpoints as simple function calls. When RPC is used over HTTP it usually just leverages the POST HTTP verb. The actual verb and subject of the function call is represented by the function name. For example, `deleteOrder` or `updateOrder`. The name of the function is either the entire path of the URL or a parameter in the POST body.

```http
POST /updateOrder HTTP/2

{"id": 2197, "date": "20220505"}
```

or

```http
POST /rpc HTTP/2

{"cmd":"updateOrder", "params":{"id": 2197, "date": "20220505"}}
```

One advantage of RPC is that it maps directly to function calls that might exist within the server. This could also be considered a disadvantage as it directly exposes the inner workings of the service, and thus creates a coupling between the endpoints and the implementation.

## REST

Representational State Transfer (REST) attempts to take advantage of the foundational principles of HTTP. This is not surprising considering the principle author of REST, Roy Fielding, was also a contributor to the HTTP specification. REST HTTP verbs always act upon a resource. Operations on a resource impact the state of the resource as it is transferred by a REST endpoint call. This allows for the caching functionality of HTTP to work optimally. For example, GET will always return the same resource until a PUT is executed on the resource. When PUT is used, the cached resource is replaced with the updated resource.

With REST the updateOrder endpoint would look like the following.

```http
PUT /order/2197 HTTP/2

{"date": "20220505"}
```

Where the proper HTTP verb is used and the URL path uniquely identifies the resource. These seem like small differences, but maximizing HTTP pays dividends by making it easy for HTTP infrastructure, such as caching, to work properly.

There are several other pieces of `Fielding's dissertation` on REST, such as hypermedia, that are often quoted as being required for a truly "restful" implementation, and these are just as often ignored.

## GraphQL

GraphQL focuses on the manipulation of data instead of a function call (RPC) or a resource (REST). The heart of GraphQL is a query that specifies the desired data and how it should be joined and filtered. GraphQL was developed to address frustration concerning the massive number of REST, or RPC calls, that a web application client needed to make in order to support even a simple UI widget.

Instead of making a call for getting a store, and then a bunch of calls for getting the store's orders and employees, GraphQL would send a single query that would request all of that information in one big JSON response. The server would examine the query, join the desired data, and then filter out anything that was not wanted.

Here is an example GraphQL query.

```graphql
query {
  getOrder(id: "2197") {
    orders(filter: {date: {allofterms: "20220505"}}) {
      store
      description
      orderedBy
    }
  }
}
```

GraphQL helps to remove a lot of the logic for parsing endpoints and mapping requests to specific resources. Basically in GraphQL there is only one endpoint. The query endpoint.

The downside of that flexibility is that the client now has significant power to consume resources on the server. There is no clear boundary on what, how much, or how complicated the aggregation of data is. It also is difficult for the server to implement authorization rights to data as they have to be baked into the data schema. However, there are standards for how to define a complex schema. Common GraphQL packages provide support for schema implementations along with database adaptors for query support.










# Simon service

Here we add a backend web service that serves up the frontend, handles HTTP endpoint requests, and stores information in memory on the server. The web service provides endpoints for getting and updating the scores. The ap also uses a couple third party endpoints to display inspirational quotes on the about page and show a random header image.

Using Node.js and Express to create the HTTP service.

## Service endpoint definitions

Here is our design, documented using `curl` commands, for the endpoints that the Simon web service provides. Note that the auth endpoints are using authorization tokens in the HTTP body. During the Login deliverable we will change this over to use HTTP cookies.

**CreateAuth** - Create a new user.

```sh
curl -X POST $host/api/auth/create -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}'

# Response 200
{"token":"6b2ab581-05ca-4df0-8897-5671e7febdd8"}
```

**GetAuth** - Login an existing user.

```sh
curl -X POST $host/api/auth/login -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}'

# Response 200
{"token":"6b2ab581-05ca-4df0-8897-5671e7febdd8"}
```

**DeleteAuth** - Logout a user

```sh
curl -v -X DELETE $host/api/auth/logout -
H 'Content-Type: application/json' -d '{"token":"6b2ab581-05ca-4df0-8897-5671e7febdd8"}'

# Response 204
```

**GetScores** - Get the latest high scores.

```sh
curl $host/api/scores

# Response
{ "scores":[
  {"name":"Harvey", "score":"337", "date":"2022/11/20"},
  {"name":"도윤 이", "score":"95", "date":"2019/05/20"}
]}
```

**SubmitScore** - Submit a score for consideration in the list of high scores.

```sh
curl -X POST $host/api/score  -H 'Content-Type: application/json' -d '{"name":"Harvey", "score":"337", "date":"2022/11/20"}'

# Response
[
  {"name":"Harvey", "score":"337", "date":"2022/11/20"},
  {"name":"도윤 이", "score":"95", "date":"2019/05/20"}
]
```

## Steps to add the backend service

We create our service with a new directory in the root of the project named `service`. To initialize the service code we open up a command console window and setup the NPM project and install **Express**.

```sh
mkdir service && cd service
npm init -y
npm install express
```

In that directory create a file named `index.js` in the root of the project. This is the entry point that **node.js** will call when you run your web service.

Add the basic Express JavaScript code needed to make a service.

```js
const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.get('*', (_req, res) => {
  res.send({ msg: 'Simon service' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

Now we can run the application with `node index.js` and hit the service with Curl.

```sh
node index.js &
curl localhost:3000

{"msg":"Simon service"}

# use fg to foreground and kill the process
```

### Add the endpoints

Now that we have the service up and running, we want to add the Simon backend service endpoints. To support our endpoints we do the following:

1. **Install UUID**. The service represents its tokens with a universally unique ID (UUID) and so we need to import that NPM package using `npm install uuid` and then import it into the code.

   ```js
   const uuid = require('uuid');
   ```

1. **Parse JSON**. All of our endpoints use JSON and so we want Express to automatically parse that for us.

   ```js
   app.use(express.json());
   ```

1. **Create the memory data structures**. Add data structures for both the users and the scores. That means whenever the service is restarted the users and scores will be lost. When we introduce the database in a later deliverable, the data will be persistent there.

   ```js
   let users = {};
   let scores = [];
   ```

1. **Set up a router path for the endpoints**. We want all of our endpoints to have a path prefix of `/api` so that we can distinguish them from requests to load the front end files. This is done with a `express.Router` call.

   ```js
   var apiRouter = express.Router();
   app.use(`/api`, apiRouter);
   ```

1. **Delete the placeholder endpoint**. Delete the placeholder endpoint `app.get('*' ...` that we created to demonstrate that the service was working.

1. **Add the service endpoints**. Add all of the code for the different Simon endpoints.

   ```js
   // CreateAuth a new user
   apiRouter.post('/auth/create', async (req, res) => {
     const user = users[req.body.email];
     if (user) {
       res.status(409).send({ msg: 'Existing user' });
     } else {
       const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
       users[user.email] = user;

       res.send({ token: user.token });
     }
   });

   // GetAuth login an existing user
   apiRouter.post('/auth/login', async (req, res) => {
     const user = users[req.body.email];
     if (user) {
       if (req.body.password === user.password) {
         user.token = uuid.v4();
         res.send({ token: user.token });
         return;
       }
     }
     res.status(401).send({ msg: 'Unauthorized' });
   });

   // DeleteAuth logout a user
   apiRouter.delete('/auth/logout', (req, res) => {
     const user = Object.values(users).find((u) => u.token === req.body.token);
     if (user) {
       delete user.token;
     }
     res.status(204).end();
   });

   // GetScores
   apiRouter.get('/scores', (_req, res) => {
     res.send(scores);
   });

   // SubmitScore
   apiRouter.post('/score', (req, res) => {
     scores = updateScores(req.body, scores);
     res.send(scores);
   });

   // updateScores considers a new score for inclusion in the high scores.
   function updateScores(newScore, scores) {
     let found = false;
     for (const [i, prevScore] of scores.entries()) {
       if (newScore.score > prevScore.score) {
         scores.splice(i, 0, newScore);
         found = true;
         break;
       }
     }

     if (!found) {
       scores.push(newScore);
     }

     if (scores.length > 10) {
       scores.length = 10;
     }

     return scores;
   }
   ```

Now we can start the service up by pressing `F5` inside of VS code and then open a command console window to execute some Curl commands.

```sh
host=http://localhost:3000

curl -X POST $host/api/score  -H 'Content-Type: application/json' -d '{"name":"Harvey", "score":"337", "date":"2022/11/20"}'

curl $host/api/scores
```

### Serving the frontend static file

In addition to serving up endpoints, we also use the Simon service to serve the static files generated when we bundled the React frontend. Our endpoints will be services on the `/api` path and everything else will look in the `public` directory of the service. If it finds a match, for `index.html` for example, then that file is returned.

To make this happen, we only need to add the Express middleware to serve static files from the the `public` directory.

```js
app.use(express.static('public'));
```

However, we don't have a `public` directory with the frontend files in it. This will happen when we deploy to our web server in AWS. For now, you can test that it is working by creating a simple index.html file in the `service/public` directory and then requesting it with curl. Once you have done this delete the test `service/public` directory so that we don't leave any cruft around.

### Configuring Vite for debugging

When running in production, the Simon web service running under Node.js on port 3000 serves up the bundled Simon React application code when the browser requests `index.html`. The service pulls those files from the application's static HTML, CSS, and JavaScript files located in the `public` directory as described above.

However, when the application is running in debug mode in your development environment, we actually need two HTTP servers running: one for the Node.js backend HTTP server, and one for the Vite frontend HTTP server. This allows us to develop and debug both our backend and our frontend while viewing the results in the browser.

By default, Vite uses port 5173 when running in development mode. Vite starts up the debugging HTTP server when we run `npm run dev`. That means the browser is going to send network requests to port 5173. We can configure the Vite HTTP server to proxy service HTTP to the Node.js HTTP server by creating a configuration file named `vite.config.js` in the root of the project with the following contents (later, we will modify this file to allow proxying of WebSocket requests as well).

```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
```

When running in this configuration, the network requests now flow as shown below. Without this you will not be able to debug your React application in your development environment.

With the backend service running, and our files in the place where Vite expects them, we can test that everything still works. You can start Vite in dev mode with the command `npm run dev`, followed by pressing the `o` key to open the application in the browser. When you reach this point with your startup, make sure that you commit your changes.

## Frontend changes

Now that we have the service endpoints all set up we need to call them from the frontend code. This happens when we want to save and retrieve scores, as well as when we want to register or login a user.

### Saving scores

The `play/simonGame.jsx` file is modified to store scores by making a fetch request to the Simon service.

```jsx
async function saveScore(score) {
  const date = new Date().toLocaleDateString();
  const newScore = { name: userName, score: score, date: date };

  await fetch('/api/score', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newScore),
  });

  // Let other players know the game has concluded
  GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);
}
```

The scores are loaded in `scores/scores.jxs` where we use a React useEffect hook to reactively display the scores once they are loaded from the service.

```jsx
React.useEffect(() => {
  fetch('/api/scores')
    .then((response) => response.json())
    .then((scores) => {
      setScores(scores);
    });
}, []);
```

Now you can shutdown the frontend and restart it without losing your scoring data.

### Registering and logging in users

We follow a similar process for handling users. This is done by altering `login/unauthenticated.jsx` to contain code that handles register and login requests.

```jsx
async function loginOrCreate(endpoint) {
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  } else {
    const body = await response.json();
    setDisplayError(`⚠ Error: ${body.msg}`);
  }
}
```

Likewise, `login/authenticated.jsx` is altered to handle the logout event.

```jsx
function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  })
    .catch(() => {
      // Logout failed. Assuming offline
    })
    .finally(() => {
      localStorage.removeItem('userName');
      props.onLogout();
    });
}
```

### Remove localstorage usage

Since we now persist scores in the service we no longer need to persistent them in local storage. We can remove that code from both `simonGame.jsx` and `scores.jsx`.

## Third party endpoints

The `about.jsx` file contains code for making calls to third party endpoints using `fetch`. The requests are triggered by the React useEffect hook. We make one call to `picsum.photos` to get a random picture and another to `quote.cs260.click` to get a random quote. Once the endpoint asynchronously returns, the React state variables are updated. Here is an example of the quote endpoint call.

```js
React.useEffect(() => {
  const random = Math.floor(Math.random() * 1000);
  fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#picture');

      const width = containerEl.offsetWidth;
      const height = containerEl.offsetHeight;
      const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
      setImageUrl(apiUrl);
    })
    .catch();

  fetch('https://quote.cs260.click')
    .then((response) => response.json())
    .then((data) => {
      setQuote(data.quote);
      setQuoteAuthor(data.author);
    })
    .catch();
}, []);
```









# Startup service

## Service endpoint definitions

Here is the design documented using `curl` commands, for the endpoints that the grocerease web service provides. Note that the auth endpoints are using auth tokens in the HTTP body. During the Login deliverable we will change this over to use HTTP cookies.

**CreateAuth** - Create a new user.

```sh
curl -X POST $host/api/auth/create -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}'

# Response 200
{"token":"6b2ab581-05ca-4df0-8897-5671e7febdd8"}
```

**GetAuth** - Login an existing user.

```sh
curl -X POST $host/api/auth/login -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}'

# Response 200
{"token":"6b2ab581-05ca-4df0-8897-5671e7febdd8"}
```

**DeleteAuth** - Logout a user

```sh
curl -v -X DELETE $host/api/auth/logout -H 'Content-Type: application/json' -d '{"token":"6b2ab581-05ca-4df0-8897-5671e7febdd8"}'

# Response 204
```

**GetItems** - Get the items currently on the grocery list

```sh
curl $host/api/items

#response
{ "items":[
  {"_id":"65fcdbf4383d7e28d4492238",
  "UserId": "118357264224651885571",
  "Text":"eggs",
  "Done":"false"}
]}
```

**AddItem** - Add a new grocery list item to the grocery list.

```sh
curl -X POST $host/api/item -H 'Content-Type: applicatoin/json' -d '{"Text":"eggs", "Done":false}'

#response
[
  {"UserId": "118357264224651885571",
  "Text":"eggs",
  "Done":"false",
  "_id":"65fcdbf4383d7e28d4492238"}
]
```

### Note: how to test!

run `npm run dev` in the project directory, then `node index.js` in the backend (service directory). Then from terminal, curl.


# Service daemons - PM2

When you run a program from the console, the program will automatically terminate when you close the console or if the computer restarts. In order to keep programs running after a shutdown you need to register it as a `daemon`. The term daemon comes from the idea of something that is always there working in the background. Hopefully you only have good daemons running in your background.

We want our web services to continue running as a daemon. We would also like an easy way to start and stop our services. That is what `Process Manager 2` (PM2) does.

PM2 is already installed on your production server as part of the AWS AMI that you selected when you launched your server. Additionally, the deployment scripts found with the Simon projects automatically modify PM2 to register and restart your web services. That means you should not need to do anything with PM2. However, if you run into problems such as your services not running, then here are some commands that you might find useful.

You can SSH into your server and see PM2 in action by running the following command.

```sh
pm2 ls
```

This should print out the two services, simon and startup, that are configured to run on your web server.

You can try some of the other commands, but only if you understand what they are doing. Using them incorrectly could cause your web services to stop working.

| Command                                                    | Purpose                                                                          |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **pm2 ls**                                                 | List all of the hosted node processes                                            |
| **pm2 monit**                                              | Visual monitor                                                                   |
| **pm2 start index.js -n simon**                            | Add a new process with an explicit name                                          |
| **pm2 start index.js -n startup -- 4000**                  | Add a new process with an explicit name and port parameter                       |
| **pm2 stop simon**                                         | Stop a process                                                                   |
| **pm2 restart simon**                                      | Restart a process                                                                |
| **pm2 delete simon**                                       | Delete a process from being hosted                                               |
| **pm2 delete all**                                         | Delete all processes                                                             |
| **pm2 save**                                               | Save the current processes across reboot                                         |
| **pm2 restart all**                                        | Reload all of the processes                                                      |
| **pm2 restart simon --update-env**                         | Reload process and update the node version to the current environment definition |
| **pm2 update**                                             | Reload pm2                                                                       |
| **pm2 start env.js --watch --ignore-watch="node_modules"** | Automatically reload service when index.js changes                               |
| **pm2 describe simon**                                     | Describe detailed process information                                            |
| **pm2 startup**                                            | Displays the command to run to keep PM2 running after a reboot.                  |
| **pm2 logs simon**                                         | Display process logs                                                             |
| **pm2 env 0**                                              | Display environment variables for process. Use `pm2 ls` to get the process ID    |

## Registering a new web service

If you want to setup another subdomain that accesses a different web service on your web server, you need to follow these steps.

1. Add the rule to the Caddyfile to tell it how to direct requests for the domain.
2. Create a directory and add the files for the web service.
3. Configure PM2 to host the web service.

### Modify Caddyfile

SSH into your server.

Copy the section for the startup subdomain and alter it so that it represents the desired subdomain and give it a different port number that is not currently used on your server. For example:

```sh
tacos.cs260.click {
  reverse_proxy _ localhost:5000
  header Cache-Control none
  header -server
  header Access-Control-Allow-Origin *
}
```

This tells Caddy that when it gets a request for tacos.cs260.click it will act as a proxy for those requests and pass them on to the web service that is listening on the same machine (localhost), on port 5000. The other settings tell Caddy to return headers that disable caching, hide the fact that Caddy is the server (no reason to tell hackers anything about your server), and to allow any other origin server to make endpoint requests to this subdomain (basically disabling CORS). Depending on what your web service does you may want different settings.

Restart Caddy to cause it to load the new settings.

```sh
sudo service caddy restart
```

Now Caddy will attempt to proxy the requests, but there is no web service listening on port 5000 and so you will get an error from Caddy if you make a request to tacos.cs260.click.

### Create the web service

Copy the `~/services/startup` directory to a directory that represents the purpose of your service. For example:

```sh
cp -r ~/services/startup ~/services/tacos
```

If you list the directory you should see an `index.js` file that is the main JavaScript file for your web service. It has the code to listen on the designated network port and respond to requests. The following is the JavaScript that causes the web service to listen on a port that is provided as an argument to the command line.

```js
const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

There is also a directory named `public` that has static HTML/CSS/JavaScript files that your web service will respond with when requested. The `index.js` file enables this with the following code:

```js
app.use(express.static('public'));
```

You can start up the web service, listening on port 5000, using Node as follows.

```sh
node index.js 5000
```

You can now access your web service through the browser, or `curl`.

```sh
curl https://tacos.cs260.click
```

Caddy will receive the request and map the subdomain name, tacos.cs260.click, to a request for http://localhost:5000. Your web service is listening on port 5000 and so it receives the request and responds.

Stop your web service by pressing CTRL-C in the SSH console that you used to start the service. Now your browser request for your subdomain should return an error again.

### Configure PM2 to host the web service

The problem with running your web service from the console with `node index.js 5000`, is that as soon as you close your SSH session it will terminate all processes you started in that session, including your web service. Instead you need something that is always running in the background to run your web service. This is where daemons come into play. The daemon we use to do this is called PM2.

From your SSH console session run:

```sh
pm2 ls
```

This will list the web services that you already have registered with PM2. To run your newly created web service under PM2, make sure you are in your service directory, and run the command similar to the following, with the service name and port substituted to your desired values:

```sh
cd ~/services/tacos
pm2 start index.js -n tacos -- 5000
pm2 save
```

If you run `pm2 ls` again you should see your web service listed. You can now access your subdomain in the browser and see the proper response. PM2 will keep running your service even after you exit your SSH session.












# Development and production environments

When working on a commercial web application, it is critical to separate where you develop your application, from where the production release of your application is made publicly available. Often times there are more environments than this, such as staging, internal testing, and external testing environments. If your company is seeking third party security certification (such as SOC2 compliance) they will require that these environments are strictly separated from each other. A developer will not have access to the production environment in order to prevent a developer from nefariously manipulating an entire company asset. Instead, automated integration processes, called continuous integration (`CI`) processes, checkout the application code, lint it, build it, test it, stage it, test it more, and then finally, if everything checks out, **deploy** the application to the production environment, and notify the different departments in the company of the release.

For our work, you will use and manage both your _development environment_ (your personal computer) and your _production environment_ (your AWS server). However, you should never consider your production environment as a place to develop, or experiment with, your application. You may shell into the production environment to configure your server or to debug a production problem, but the deployment of your application should happen using an automated CI process. For our CI process, we will use a very simple console shell script.

## Automating your deployment

The advantage of using an automated deployment process is that it is reproducible. You don't accidentally delete a file, or misconfigure something with an stray keystroke. Also, having a automated script encourages you to iterate quickly because it is so much easier to deploy your code. You can add a small feature, deploy it out to production, and get feedback within minutes from your users.

Our deployment scripts change with each new technology that we have to deploy. Initially, they just copy up a directory of HTML files, but soon they include the ability to modify the configuration of your web server, run transpiler tools, and bundle your code into a deployable package.

You run a deployment script from a console window in your development environment with a command like the following.

```sh
./deployService.sh -k ~/prod.pem -h yourdomain.click -s simon
```

The `-k` parameter provides the credential file necessary to access your production environment. The `-h` parameter is the domain name of your production environment. The `-s` parameter represents the name of the application you are deploying (either `simon` or `startup`).

This will make more sense as we gradually build up our technologies but we can discuss our simon-service deployment script as an example of what they will do. It isn't critical that you deeply understand everything in the script, but the more you do understand the easier it will be for you to track down and fix problems when they arise.


The first part of the script simply parses the command line parameters so that we can pass in the production environment's security key (or PEM key), the hostname of your domain, and the name of the service you are deploying.

```sh
while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployService.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying $service to $hostname with $key\n"
```

Next the script copies all of the applicable source files into a distribution directory (`dist`) in preparation for copying that directory to your production server.

```sh
# Step 1
printf "\n----> Build the distribution package\n"
rm -rf dist
mkdir dist
cp -r application dist
cp *.js dist
cp package* dist
```

The target directory on your production environment is deleted so that the new one can replace it. This is done by executing commands remotely using the secure shell program (`ssh`).

```sh
# Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i $key ubuntu@$hostname << ENDSSH
rm -rf services/${service}
mkdir -p services/${service}
ENDSSH
```

The distribution directory is then copied to the production environment using the secure copy program (`scp`).

```sh
# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r -i $key dist/* ubuntu@$hostname:services/$service
```

We then use `ssh` again to execute some commands on the production environment. This installs the node packages with `npm install` and restarts the service daemon (`PM2`) that runs our web application in the production environment.

```sh
# Step 4
printf "\n----> Deploy the service on the target\n"
ssh -i $key ubuntu@$hostname << ENDSSH
cd services/${service}
npm install
pm2 restart ${service}
ENDSSH
```

Finally we clean up our development environment by deleting the distribution package.

```sh
# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf dist
```

Can you imagine if you had to do all of that by hand every time? You would dread deploying and would most likely make several time consuming mistakes during the process.

A deployment script exists for each of the Simon projects and you can use them, as is, for your startup application as long as you are doing similar types of deployment actions.







# Uploading files

Web applications often need to upload one or more files from the frontend application running in the browser to the backend service. We can accomplish this by using the HTML `input` element of type `file` on the frontend, and the `Multer` NPM package on the backend.

## Frontend code

The following frontend code registers and event handler for when the selected file changes and only accepts files of type `.png, .jpeg, or .jpg`. We also create an `img` placeholder element that will display the uploaded image once it has been stored on the server.

```html
<html lang="en">
  <body>
    <h1>Upload an image</h1>
    <input
      type="file"
      id="fileInput"
      name="file"
      accept=".png, .jpeg, .jpg"
      onchange="uploadFile(this)"
    />
    <div>
      <img style="padding: 2em 0" id="upload" />
    </div>
    <script defer src="frontend.js"></script>
  </body>
</html>
```

The frontend JavaScript handles the uploading of the file to the server and then uses the filename returned from the server to set the `src` attribute of the image element in the DOM. If an error happens then an alert is displayed to the user.

```js
async function uploadFile(fileInput) {
  const file = fileInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      document.querySelector('#upload').src = `/file/${data.file}`;
    } else {
      alert(data.message);
    }
  }
}
```

## Backend code

In order to build storage support into our server, we first install the `Multer` NPM package to our project. There are other NPM packages that we can chose from, but Multer is commonly used. From your project directory, run the following console command.

```sh
npm install multer
```

Multer handles reading the file from the HTTP request, enforcing the size limit of the upload, and storing the file in the `uploads` directory. Additionally our service code does the following:

- Handles requests for static files so that we can serve up our frontend code.
- Handles errors such as when the 64k file limit is violated.
- Provides a `GET` endpoint to serve up a file from the uploads directory.

```js
const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.static('public'));

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const filetype = file.originalname.split('.').pop();
      const id = Math.round(Math.random() * 1e9);
      const filename = `${id}.${filetype}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 64000 },
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send({
      message: 'Uploaded succeeded',
      file: req.file.filename,
    });
  } else {
    res.status(400).send({ message: 'Upload failed' });
  }
});

app.get('/file/:filename', (req, res) => {
  res.sendFile(__dirname + `/uploads/${req.params.filename}`);
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(413).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Where you store your files

You should take serious thought about where you store your files. Putting files on your server is not a very good production level solution for the following reasons.

1. You only have so much available space. Your server only has 8 GB by default. Once you use up all your space then your server will fail to operate correctly and you may need to rebuild your server.
1. In a production system, servers are transient and are often replaced as new versions are released, or capacity requirements change. That means you will lose any state that you store on your server.
1. The server storage is not usually backed up. If the server fails for any reason, you will lose your customer's data.
1. If you have multiple application servers then you can't assume that the server you uploaded the data to is going to be the one you request a download from.

Instead you want to use a dedicated storage service that has durability guarantees, is not tied to your compute capacity, and can be accessed by multiple application servers.






# Storage services

Web applications commonly need to store files associated with the application or the users of the application. This includes files such as images, user uploads, documents, and movies. Files usually have an ID, some metadata, and the bytes representing the file itself. These can be stored using a database service, but usually that is overkill and a simpler solution will be cheaper.

It might be tempting to store files directly on your server. This is usually a bad idea for several reasons.

1. Your server has limited drive space. If you server runs out of drive space your entire application will fail.
1. You should consider your server as being ephemeral, or temporary. It can be thrown away and replaced by a copy at any time. If you start storing files on the server, then your server has state that cannot be easily replaced.
1. You need backup copies of your application and user files. If you only have one copy of your files on your server, then they will disappear when your server disappears, and you must always assume that your server will disappear.

Instead you want to use a storage service that is specifically designed to support production storage and delivery of files.

## AWS S3

There are many such solutions out there, but one of the most popular ones is [AWS S3](https://aws.amazon.com/s3/). S3 provides the following advantages:

1. It has unlimited capacity
1. You only pay for the storage that you use
1. It is optimized for global access
1. It keeps multiple redundant copies of every file
1. You can version the files
1. It is performant
1. It supports metadata tags
1. You can make your files publicly available directly from S3
1. You can keep your files private and only accessible to your application

In this course we will not be using any storage services for the Simon project. If, however, you want to use S3 as the storage service for your Startup application, then you need to learn how to use the AWS SDK. You can find detailed information about using AWS S3 with Node.js on the [AWS website](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html). Generally, the steps you need to take include:

1. Creating a S3 bucket to store your data in.
1. Getting credentials so that your application can access the bucket.
1. [Using](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) the credentials in your application.
1. Using the [SDK](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html) to write, list, read, and delete files from the bucket.

⚠ Make sure that you do not include your credentials in your code. If you check your credentials into your GitHub repository they will immediately be stolen and used by hackers to take over your AWS account. This may result in significant monetary damage to you.










# Data Services

Web applications commonly need to store application and user data persistently. The data can be many things, but it is usually a representation of complex interrelated objects. This includes things like a user profile, organizational structure, game play information, usage history, billing information, peer relationship, library catalog, and so forth.

Historically, SQL databases have served as the general purpose data service solution, but starting around 2010, specialty data services that better support document, graph, JSON, time, sequence, and key-value pair data began to take significant roles in applications from major companies. These data services are often called NoSQL solutions because they do not use the general purpose relational database paradigms popularized by SQL databases. However, they all have very different underlying data structures, strengths, and weaknesses. That means that you should not simply split all of the possible data services into two narrowly defined boxes, SQL and NoSQL, when you are considering the right data service for your application.

Here is a list of some of the popular data services that are available.

| Service       | Specialty             |
| ------------- | --------------------- |
| MySQL         | Relational queries    |
| Redis         | Memory cached objects |
| ElasticSearch | Ranked free text      |
| MongoDB       | JSON objects          |
| DynamoDB      | Key value pairs       |
| Neo4J         | Graph based data      |
| InfluxDB      | Time series data      |

## Mongo DB

For the projects in this course that require data services, we will use `MongoDB`. Mongo increases developer productivity by using JSON objects as its core data model. This makes it easy to have an application that uses JSON from the top to the bottom of the technology stack. A mongo database is made up of one or more collections that each contain JSON documents. You can think of a collection as a large array of JavaScript objects, each with a unique ID. The following is a sample of a collection of houses that are for rent.

```js
[
  {
    _id: '62300f5316f7f58839c811de',
    name: 'Lovely Loft',
    summary: 'A charming loft in Paris',
    beds: 1,
    last_review: {
      $date: '2022-03-15T04:06:17.766Z',
    },
    price: 3000,
  },
  {
    _id: '623010b97f1fed0a2df311f8',
    name: 'Infinite Views',
    summary: 'Modern home with infinite views from the infinity pool',
    property_type: 'House',
    beds: 5,
    price: 250,
  },
];
```

Unlike relational databases that require a rigid table definition where each column must be strictly typed and defined beforehand, Mongo has no strict schema requirements. Each document in the collection usually follows a similar schema, but each document may have specialized fields that are present, and common fields that are missing. This allows the schema of a collection to morph organically as the data model of the application evolves. To add a new field to a Mongo collection you just insert the field into the documents as desired. If the field is not present, or has a different type in some documents, then the document simply doesn't match the query criteria when the field is referenced.

The query syntax for Mongo also follow a JavaScript-inspired flavor. Consider the following queries on the houses for rent collection that was shown above.

```js
// find all houses
db.house.find();

// find houses with two or more bedrooms
db.house.find({ beds: { $gte: 2 } });

// find houses that are available with less than three beds
db.house.find({ status: 'available', beds: { $lt: 3 } });

// find houses with either less than three beds or less than $1000 a night
db.house.find({ $or: [(beds: { $lt: 3 }), (price: { $lt: 1000 })] });

// find houses with the text 'modern' or 'beach' in the summary
db.house.find({ summary: /(modern|beach)/i });
```

### Using MongoDB in your application

The first step to using Mongo in your application is to install the `mongodb` package using NPM.

```sh
➜ npm install mongodb
```

With that done, you then use the `MongoClient` object to make a client connection to the database server. This requires a username, password, and the hostname of the database server.

```js
const { MongoClient } = require('mongodb');

const userName = 'holowaychuk';
const password = 'express';
const hostname = 'mongodb.com';

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
```

With the client connection you can then get a database object and from that a collection object. The collection object allows you to insert, and query for, documents. You do not have to do anything special to insert a JavaScript object as a Mongo document. You just call the `insertOne` function on the collection object and pass it the JavaScript object. When you insert a document, if the database or collection does not exist, Mongo will automatically create them for you. When the document is inserted into the collection it will automatically be assigned a unique ID.

```js
const collection = client.db('rental').collection('house');

const house = {
  name: 'Beachfront views',
  summary: 'From your bedroom to the beach, no shoes required',
  property_type: 'Condo',
  beds: 1,
};
await collection.insertOne(house);
```

To query for documents you use the `find` function on the collection object. Note that the find function is asynchronous and so we use the `await` keyword to wait for the promise to resolve before we write them out to the console.

```js
const cursor = collection.find();
const rentals = await cursor.toArray();
rentals.forEach((i) => console.log(i));
```

If you do not supply any parameters to the `find` function then it will return all documents in the collection. In this case we only get back the single document that we previously inserted. Notice that the automatically generated ID is returned with the document.

**Output**

```js
[
  {
    _id: new ObjectId('639a96398f8de594e198fc13'),
    name: 'Beachfront views',
    summary: 'From your bedroom to the beach, no shoes required',
    property_type: 'Condo',
    beds: 1,
  },
];
```

You can provide a query and options to the `find` function. In the example below we query for a `property_type` of Condo that has less than two bedrooms. We also specify the options to sort by descending price, and limit our results to the first 10 documents.

```js
const query = { property_type: 'Condo', beds: { $lt: 2 } };

const options = {
  sort: { price: -1 },
  limit: 10,
};

const cursor = collection.find(query, options);
const rentals = await cursor.toArray();
rentals.forEach((i) => console.log(i));
```

The query matches the document that we previously inserted and so we get the same result as before.

## Managed services

Historically each application development team would have developers that managed the data service. Those developers would acquire hardware, install the database software, monitor the memory, cpu, and disk space, control the data schema, and handle migrations and upgrades. Much of this work has now moved to services that are hosted and managed by a 3rd party. This relieves the development team from much of the day-to-day maintenance. The team can instead focus more on the application and less on the infrastructure. With a managed data service you simply supply the data and the service grows, or shrinks, to support the desired capacity and performance criteria.

### MongoDB Atlas

All of the major cloud providers offer multiple data services. For this class we will use the data service provided by MongoDB called `Atlas`.

⚠ This [video tutorial](https://www.youtube.com/watch?v=daIH4o75KE8) will step you through the process of creating your account and setting up your database. You really want to watch this video. Note that some of the Atlas website interface may be slightly different, but the basic concepts should all be there in some shape or form. The main steps you need to take are:

1. Create your account.
1. Create a database cluster.
1. Create your root database user credentials. Remember these for later use.
1. ⚠ Set network access to your database to be available from anywhere.
1. Copy the connection string and use the information in your code.
1. Save the connection and credential information in your production and development environments as instructed above.

You can always find the connection string to your Atlas cluster by pressing the `Connect` button from your Database > DataServices view.

## Keeping your keys out of your code

You need to protect your credentials for connecting to your Mongo database. One common mistake is to check them into your code and then post it to a public GitHub repository. Instead you can load your credentials when the application executes. One common way to do that is to have a JSON configuration file that contains the credentials that you dynamically load into the JavaScript that makes the database connection. You then use the configuration file in your development environment and deploy it to your production environment, but you **never** commit it to GitHub.

In order to accomplish this do the following:

1. Create a file named `dbConfig.json` in the same directory as the database JavaScript (e.g. `database.js`) that you use to make database requests.
1. Insert your Mongo DB credentials into the `dbConfig.json` file in JSON format using the following example:

   ```json
   {
     "hostname": "cs260.abcdefg.mongodb.net",
     "userName": "myMongoUserName",
     "password": "toomanysecrets"
   }
   ```
1. Import the `dbConfig.json` content into your `database.js` file using a Node.js require statement and use the data that it represents to create the connection URL.

   ```js
   const config = require('./dbConfig.json');
   const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
   ```

⚠ Make sure you include `dbConfig.json` in your `.gitignore` file so that it does not get pushed up to GitHub.

### Testing the connection on startup

It is nice to know that your connection string is correct before your application attempts to access any data. We can do that when the application starts by making an asynchronous request to ping the database. If that fails then either the connection string is incorrect, the credentials are invalid, or the network is not working. The following is an example of testing the connection.

```js
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});
```

If your server is not starting, then check your logs for this exception being thrown.

## Using Mongo from your code

With that all done, you should be good to use Atlas from both your development and production environments. You can test that things are working correctly with the following example.


```js
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

async function main() {
  // Connect to the database cluster
  const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  const client = new MongoClient(url);
  const db = client.db('rental');
  const collection = db.collection('house');

  // Test that you can connect to the database
  (async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

  // Insert a document
  const house = {
    name: 'Beachfront views',
    summary: 'From your bedroom to the beach, no shoes required',
    property_type: 'Condo',
    beds: 1,
  };
  await collection.insertOne(house);

  // Query the documents
  const query = { property_type: 'Condo', beds: { $lt: 2 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };

  const cursor = collection.find(query, options);
  const rentals = await cursor.toArray();
  rentals.forEach((i) => console.log(i));
}

main().catch(console.error);
```

To execute the above example, do the following:

1. Create a directory called `mongoTest`
1. Save the above content to a file named `index.js`
1. Create a file named `dbConfig.json` that contains your database credentials
1. Run `npm init -y`
1. Run `npm install mongodb`
1. Run `node index.js`.

This should output something like the following if everything is working correctly.

```js
{
_id: new ObjectId("639b51b74ef1e953b884ca5b"),
name: 'Beachfront views',
summary: 'From your bedroom to the beach, no shoes required',
property_type: 'Condo',
beds: 1
}
```










# Authorization services

If your application is going to remember a user's data then it will need a way to uniquely associate the data with a particular credential. That usually means that you `authenticate` a user by asking for information, such as an email address and password. You then remember, for some period of time, that the user has authenticated by storing an `authentication token` on the user's device. Often that token is stored in a `cookie` that is passed back to your web service on each request. The service can now associate data that the user supplies with a unique identifier that corresponds to their authorization token.

Determining what a user is `authorized` to do in your application is also important. For example, you might have different roles in your application such as Administrators, Editors, and Customers. Once you have the ability to authenticate a user and store information about that user, you can also store the authorization for the user. A simple application might have a single field that represents the role of the user. The service code would then use that role to allow, limit, or prevent what a service endpoint does. A complex web application will usually have very powerful authorization representation that controls the user's access to every part of the application. For example, an Editor role might have authorization only to work on content that they created or were invited to.

As you might imagine, authentication and authorization can become very complex, very quickly. It is also a primary target for a hacker. If they can bypass the authentication or escalate what they are authorized to do, then they can gain control of your application. Additionally, constantly forcing users to authenticate in a secure way causes users to not want to use an application. This creates opposing priorities: keep the system secure or make it easy to use.

In an attempt to remove the complexity of authentication and authorization from your application, many service providers and package developers have created solutions that you can use. Assuming that you are using a trusted, well-tested service this is an attractive option because it removes the cost of building, testing, and managing that critical infrastructure yourself.

Authorization services often use standard protocols for authenticating and authorizing. These include standards such as [OAuth](https://en.wikipedia.org/wiki/OAuth), [SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language), and [OIDC](https://en.wikipedia.org/wiki/OpenID). Additionally, they usually support concepts like `Single Sign On` (SSO) and Federated Login. Single sign on allows a user to use the same credentials for multiple web applications. For example, you can log in to GitHub using your Google credentials. Federated login allows a user to log in once, and then the authentication token is reused to automatically log the user in to multiple websites. For example, logging in to Gmail allows you to also use Google Docs and YouTube without logging in again.

For this course we will implement our own authentication using a simple email/password design. Knowing how to implement a simple authentication design will help you appreciate what authentication services provide. If you want to experiment with different authorization services you might consider `AWS Cognito`, or `Google Firebase`.
