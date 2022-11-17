let exec = require('child_process').exec
window.electronApi = require('electron').ipcRenderer;
window.isElectron = true;
window.isTerminal = true;
window.shutdown = function (cmd) {
    console.log('on shutdown')
    var res = 'shutdown /s /t 0'
    let p = new Promise(
        (resolve) => {
            exec('shutdown /s', (a, b, c) => {
                res = a + b + c
                resolve(b)
            })
        }
    )
    return p

}

window.closeApp = function (){
    window.close()
}
