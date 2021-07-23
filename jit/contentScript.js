const STORAGE_NAME = 'JT_Templates';

(async function() {
    let storage = await this.getStorage();

    document.getElementById("create-menu").addEventListener("click", () => {
        console.log(">>> storage", storage);
        console.log(">>> hello 1");

        const interval = setInterval(() => {
            
            const item = document.querySelector("#description");
            if (item) {
                item.innerText = "hello world!";
                clearInterval(interval);
            }
        }, 200);
    })
})()

async function getStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(STORAGE_NAME, (items) => {
            if (chrome.runtime.lastError) {
              return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
};
