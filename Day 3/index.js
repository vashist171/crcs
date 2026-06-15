function addTask() {
    let task = document.getElementById("task").value.trim();
    if (!task) return;

    let li = document.createElement("li");
    
    // Create a span to hold the task text
    let span = document.createElement("span");
    span.innerText = task;
    li.appendChild(span);
    
    // Create a delete button next to the task
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = function() {
        deleteTask(li);
    };
    li.appendChild(deleteBtn);
    
    document.getElementById("list").appendChild(li);
    document.getElementById("task").value = ""; // Clear the input field
}

function test() {
    let query = document.getElementById("test-input").value.trim().toLowerCase();
    let resultEl = document.getElementById("test-result") || document.getElementById("test");

    if (!query) {
        if (resultEl) {
            let msg = "Please enter a search term";
            if (resultEl.tagName === "UL") {
                resultEl.innerHTML = "";
                let li = document.createElement("li");
                li.innerText = msg;
                li.style.color = "orange";
                resultEl.appendChild(li);
            } else {
                resultEl.innerText = msg;
                resultEl.style.color = "orange";
            }
        }
        return;
    }

    let listItems = document.getElementById("list").getElementsByTagName("li");
    let found = false;

    for (let li of listItems) {
        let taskText = "";
        let span = li.querySelector("span");
        if (span) {
            taskText = span.innerText;
        } else {
            // Fallback: extract text node children only, skipping button tags
            for (let node of li.childNodes) {
                if (node.nodeType === 3) { // Text node
                    taskText += node.textContent;
                }
            }
        }

        if (taskText.trim().toLowerCase() === query) {
            found = true;
            break;
        }
    }

    if (resultEl) {
        let text = found ? `Found: "${query}" is in the list!` : `Not found: "${query}"`;
        let color = found ? "green" : "red";
        
        if (resultEl.tagName === "UL") {
            resultEl.innerHTML = "";
            let li = document.createElement("li");
            li.innerText = text;
            li.style.color = color;
            resultEl.appendChild(li);
        } else {
            resultEl.innerText = text;
            resultEl.style.color = color;
        }
    }
}

function deleteTask(liElement) {
    liElement.remove();
}