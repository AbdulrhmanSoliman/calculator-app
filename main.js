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
    let convertX = screen.value.replaceAll("x", "*");
    screen.value = eval(convertX);
  } else {
    screen.value = "";
  }
};
// ? I tried to empty the value of the calc screen after calculating each operation when clicking on any number but it not working because it also affected the original numbers when the user click

// Delete and Reset button
let delReset = document.querySelectorAll(".del__reset");
delReset[0].onclick = function () {
  let delArr = screen.value.split("");
  delArr.pop();
  screen.value = delArr.join("");
};
delReset[1].onclick = function () {
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

delReset.forEach((key) => {
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

window.addEventListener("keydown", (key) => {
  if (key.key == "Enter") {
    equal.click();
  }
});
