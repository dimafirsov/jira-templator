const STORAGE_NAME = 'JT_Templates';

(async function() {
    let storage = await this.getStorage();
    let node = document.getElementById("createGlobalItem");
    const node1 = document.querySelector("span[data-test-id='ak-spotlight-target-profile-spotlight']");

    setTimeout(() => {
        node = document.getElementById("createGlobalItem");
        console.log(">>> READY");

        document.getElementById("createGlobalItem").addEventListener("click", () => {
            console.log(">>> storage", storage);
            console.log(">>> hello 1");
    
            const interval = setInterval(() => {
                const item = document.querySelector("#summary");
                if (item) {
                    item.value = "hello world!";
                    clearInterval(interval);
                }
            }, 200);
        })

    }, 2500)
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
