# Vercel Deployment Rule

The user's primary live website is hosted at: `https://lawfirm-nine-ashy.vercel.app/`

To ensure all future changes are automatically deployed to this URL, you MUST always commit and push the code to the GitHub repository (`Harshit2603/lawfirm`) after completing any tasks.

Due to environment configuration, standard `git` may not be available in the system PATH. To execute git commands, you MUST use the following explicit path:
`& "C:\Users\codeb\AppData\Local\GitHubDesktop\app-3.6.2\resources\app\git\cmd\git.exe"`

Example:
`& "C:\Users\codeb\AppData\Local\GitHubDesktop\app-3.6.2\resources\app\git\cmd\git.exe" add . ; & "C:\Users\codeb\AppData\Local\GitHubDesktop\app-3.6.2\resources\app\git\cmd\git.exe" commit -m "update" ; & "C:\Users\codeb\AppData\Local\GitHubDesktop\app-3.6.2\resources\app\git\cmd\git.exe" push origin main`
