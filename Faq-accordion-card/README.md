# Frontend Mentor - FAQ accordion card solution

This is a solution to the [FAQ accordion card challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/faq-accordion-card-XlyjD0Oam). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the component depending on their device's screen size
- See hover states for all interactive elements on the page
- Hide/Show the answer to a question when the question is clicked

### Screenshot

![Mobile](screenshot\Screenshot_mobile.png)
![Desktop](screenshot\Screenshot_desktop.png)

### Links

- Solution URL: [github](https://github.com/PiterMobile/Challenge/tree/master/Faq-accordion-card)
- Live Site URL: [Order-summary](https://pitermobile.github.io/Challenge/Faq-accordion-card/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

I used two ways to add arrows.

The first way using HTML (currently commented):

```html
<details>
  <summary>
    How many team members can I invite?
    <img src="images/icon-arrow-down.svg" alt="Arrow" />
  </summary>
  <p>
    You can invite up to 2 additional users on the Free plan. There is no limit
    on team members for the Premium plan.
  </p>
</details>
```

Way two pseudo element ::after (in use):

```html
<details>
  <summary>How many team members can I invite?</summary>
  <p>
    You can invite up to 2 additional users on the Free plan. There is no limit
    on team members for the Premium plan.
  </p>
</details>
```

```css
details summary::after {
  display: block;
  float: right;
  content: "";
  background: url("images/icon-arrow-down.svg") no-repeat;
  width: 10px;
  height: 10px;
}

details[open] summary::after {
  transform: rotate(180deg);
}
```

## Author

- Frontend Mentor - [@PiterMobile](https://www.frontendmentor.io/profile/PiterMobile)
