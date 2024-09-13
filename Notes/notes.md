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