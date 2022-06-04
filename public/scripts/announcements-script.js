const selected = document.querySelector(".selected");
const listofmessages = document.getElementById("message-list");
items = listofmessages.getElementsByTagName("li");
const anntextheader = document.querySelector(".announcement-text-header");
const anntext = document.querySelector(".announcement-text");

for (let i of items) {
    i.addEventListener("click", announcementActivate);
}

function announcementActivate(e) {
    const msgtextheader = this.querySelector(".mess-header");
    const msgtext = this.querySelector(".mess-par");
    anntextheader.innerHTML=msgtextheader.innerHTML;
    anntext.innerHTML=msgtext.innerHTML;

    for (let i of items) {
        const header = i.querySelector(".mess-header");
        header.classList.remove("active");
    }
    msgtextheader.classList.add("active");

}