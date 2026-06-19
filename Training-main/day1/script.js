// 1. Select Elements
const heading = document.getElementById("heading");
const button = document.getElementById("btn");
const input = document.getElementById("name");
const container = document.getElementById("container");

// 2. Change Content
heading.innerHTML = "DOM Manipulation Example";

// 3. Change Style
heading.style.color = "blue";
heading.style.fontSize = "30px";

// 4. Button Click Event
button.addEventListener("click", function () {

    // Get Input Value
    let userName = input.value;

    // Create New Element
    let para = document.createElement("p");
    para.innerHTML = "Hello " + userName;

    // Add Element to Page
    container.appendChild(para);

    // Add CSS Class
    para.classList.add("message");

    // Toggle Background Color
    document.body.classList.toggle("dark-mode");
});

// 5. Remove Element After 5 Seconds
setTimeout(() => {
    let firstPara = container.querySelector("p");

    if (firstPara) {
        firstPara.remove();
    }
}, 5000);

// 6. Mouse Event
heading.addEventListener("mouseover", () => {
    heading.style.color = "red";
});

// 7. Keyboard Event
input.addEventListener("keyup", (event) => {
    console.log("You typed: " + event.target.value);
});

// 8. Query Selector Example
const allParagraphs = document.querySelectorAll("p");

allParagraphs.forEach((p) => {
    console.log(p.textContent);
});