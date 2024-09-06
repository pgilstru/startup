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