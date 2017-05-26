require('./server.electron.js')

const {
	app,
	BrowserWindow,
	Menu,
	Tray,
	shell
} = require('electron')

const path = require('path')
const url  = require('url')

// Start page
let index_page_url = url.format({
	pathname: path.join(__dirname, 'index.html'),
	protocol: 'file:',
	slashes:  true
})

// Electron server url
index_page_url = 'http://localhost:9999'

// Start page - dev server
if (process.env.dev) {
	index_page_url = 'http://localhost:9999'
}

let mainWindow

function createWindow () {
	mainWindow = new BrowserWindow({
		icon: path.join(__dirname, 'assets/icons/icon-128.png'),
		width: 800, height: 600
	})


	mainWindow.loadURL(index_page_url)

	mainWindow.on('closed', () => { mainWindow = null })

	// Open links in browser
	let handleRedirect = (e, url) => {
		if (url.indexOf('accounts.google.com')==-1 && url != mainWindow.webContents.getURL()) {
			e.preventDefault()
			shell.openExternal(url)
		}
	}
	mainWindow.webContents.on('will-navigate', handleRedirect)
	mainWindow.webContents.on('new-window',    handleRedirect)

	// DevTools
	if (process.env.dev) {
		// mainWindow.webContents.executeJavaScript(`
		// 	window.location = 'http://localhost:9999'
		// `)

		mainWindow.webContents.openDevTools()
	}



	// minimize to tray
	const trayIcon = new Tray(path.join(__dirname, 'assets/icons/icon-38.png'))
	trayIcon.setToolTip('Dao.Casino')
	trayIcon.setContextMenu(Menu.buildFromTemplate([
		{ label: 'Show App', click:() => {
			mainWindow.show()
		} },
		{ label: 'Quit', click:() => {
			app.isQuiting = true
			app.quit()

		} }
	]))
	trayIcon.on('click', () => {
		mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
	})

	mainWindow.on('minimize', event => {
		event.preventDefault()
		mainWindow.hide()
	})
	mainWindow.on('close', event => {
		if(!app.isQuiting){
			event.preventDefault()
			mainWindow.hide()
		}
		return false
	})
}

app.on('ready', createWindow)

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
