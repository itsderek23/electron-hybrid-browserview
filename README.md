# Example ElectronJS Hybrid App

This is an example app that uses `BrowserView` to remotely load contents into an ElectronJS window. Submitting the form sends an event via IPC, which the main process listens for, then sends a new event with the greeting. `preload.js` listens for the greeting event and renders the greeting beneath the form.

![screen](https://user-images.githubusercontent.com/7880/67238861-1b384180-f40b-11e9-85ab-10031fd3429b.png)

Start via `npm start`.

See [this blog post](https://smilesql.com/blog/hybrid-electron-app-example/) for more background.
