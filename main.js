// select calc screen (input)
let screen = document.querySelector(".screen");
// validate any character to ensure it can be calculated
screen.oninput = function () {
  screen.value = validateNum(screen.value);
};
// select numbers and operators to loop on
let nums = document.querySelectorAll(".num");
nums.forEach((num) => {
  // another validate but this time when clicking on any number on the calc
  num.onclick = function () {
    screen.value += num.textContent;
    screen.value = validateNum(screen.value);
  };
});
// Because my Regex not select the operator before any number typed, I bypassed it by check first if there is any thing except number found before it like +, -, *, /  and sliced it by 1 to ensure that only one operator is typed between numbers
function validateNum(value) {
  if (value.match(/[0-9]+/g) != null) {
    return value.match(/(\-|\+|\.)?[0-9(\.)?]+(\*|\-|\+|\.|\/|x)?/g).join("");
  } else {
    return `${value.slice(-1)}`;
  }
}

// select equal button
const equal = document.querySelector(".equal");
// calculating function
equal.onclick = function () {
  if (screen.value != "") {
    let result = screen.value.replaceAll("x", "*");
    screen.value = math.evaluate(result);
  } else {
    screen.value = "";
  }
};

// ? I tried to empty the value of the calc screen after calculating each operation completed when clicking on any number but it not working because it also affected the original numbers when the user click

// Delete and Reset button
let delBtn = document.querySelectorAll(".del__reset")[0];
let resetBtn = document.querySelectorAll(".del__reset")[1];
let specialBtn = document.querySelectorAll(".del__reset")
// A function which remove the last number
function removeNumber() {
  let delArr = screen.value.split("");
  delArr.pop();
  screen.value = delArr.join("");
}

delBtn.onclick = removeNumber;
resetBtn.onclick = function () {
  screen.value = "";
};
// Theme changer
const toggle = document.querySelector(".theme__changer div");
const ball = document.querySelector(".ball");
// save user setting to local storage
if (window.localStorage.getItem("theme") == 2) {
  document.body.classList.add("theme-2");
  ball.style.left = "25px";
} else if (window.localStorage.getItem("theme") == 3) {
  document.body.classList.add("theme-3");
  ball.style.left = "50px";
}

toggle.onclick = function () {
  if (getComputedStyle(ball).left == "5px") {
    ball.style.left = "25px";
    document.body.classList.add("theme-2");
    window.localStorage.setItem("theme", 2);
  } else if (getComputedStyle(ball).left == "25px") {
    ball.style.left = "50px";
    document.body.classList.remove("theme-2");
    document.body.classList.add("theme-3");
    window.localStorage.setItem("theme", 3);
  } else {
    ball.style.left = "5px";
    document.body.classList.remove("theme-3");
    window.localStorage.removeItem("theme");
  }
};

//typing effect when clicking on any button
const tick = new Audio("images/tick.mp3");
nums.forEach((key) => {
  clicked(key);
});

specialBtn.forEach((key) => {
  clicked(key);
});

clicked(equal);

function clicked(key) {
  key.addEventListener("click", () => {
    key.classList.add("clicked");
    tick.currentTime = 0;
    tick.play();
    setTimeout(() => {
      key.classList.remove("clicked");
    }, 100);
  });
}

// when pressing enter the result should be visible
window.addEventListener("keydown", (key) => {
  if (key.key == "Enter") {
    equal.click();
  }
});

// perform a click action when typing in keyboard
window.addEventListener("keydown", (key) => {
  if (key.key === "Backspace") {
    removeNumber();
  }
  nums.forEach((num) => {
    if (key.key == num.innerHTML) {
      num.click();
    }
  });
});
