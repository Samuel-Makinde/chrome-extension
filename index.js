
let myLeads = [];
const input = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deletebtn = document.getElementById("del-btn")
const saveBtn = document.getElementById("save-btn")
// to set the local storage to display on the page
const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadFromLocalStorage){
    myLeads = leadFromLocalStorage
    render(myLeads)
}

// to work with the save button
saveBtn.addEventListener("click", function(){
    // using API to fetch save all button 
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, 
        function(tabs){
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        }
    )
    
})
function render(leads) {
    let listItem = "";
    for (let i = 0; i < leads.length; i++){
    listItem += `
    <li>
    <a target='_blank' href='${leads[i]}'> ${leads[i]} </a>
    </li>
    `;
}
    ulEl.innerHTML =  listItem;
}

// to make the delete button work
deletebtn.addEventListener("dblclick", function() {
    localStorage.clear;
    myLeads = [];
    render(myLeads);
})

inputBtn.addEventListener("click", function () {
    myLeads.push(input.value);
    // to clear the value from the box after clicking save button
    input.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})
