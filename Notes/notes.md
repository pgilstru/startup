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