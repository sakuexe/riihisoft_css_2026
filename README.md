# Riihisoft training day materials, March 2026

Topic: CSS is pretty cool nowadays

Repositories:

- [Github mirror](https://github.com/sakuexe/riihisoft_css_2026)
- [Tangled mirror](https://tangled.org/saku.tngl.sh/riihisoft-css-training-2026)

## Basics

### OKLCH

Human readable and easier color settings

### Variables and `@property`

Type safe css with `@property`, for turbo charging your css variables.

```css
@property --such-color {
    syntax: "<color>";
    inherits: false;
    initial-value: #decade;
}
```

## Parts

### Container queries

```css
.card-grid {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### `:has()` for selecting parents

In css you cannot move backwards. This is because it was chosen due to css being
parsed sequentially, to decrease content shifts

```css
form:has(input:invalid) {
  border: 2px solid red;
}

.card:has(img) {
  grid-template-columns: 200px 1fr;
}
```

**Use cases**:

- Form validation styling
- dynamic layouts
- conditional styling

```css
button:has(svg) {
  padding-left: 0.5rem;
}
```

### Native CSS nesting

Sass style nesting is now native and well supported

```css
.card {
  padding: 1rem;

  & h2 {
    font-size: 1.5rem;
  }

  &:hover {
    box-shadow: 0 4px 10px;
  }
}
```

### Cascade layers with `@layer`

Solving css specificity hell

```css
@layer reset, base, components, utilities;

@layer components {
  .btn {
    background: blue;
  }
}

@layer utilities {
  .text-center {
    text-align: center;
  }
}
```

Great for:

- predictable css overrides
- design systems
- utility classes that always win
- no more `!important`

### Modern CSS functions

No more JS calculations

`clamp()`

```css
font-size: clamp(1rem, 3vw, 2rem);
```

`color-mix()`

```css
--primary-light: color-mix(in srgb, var(--primary), white 30%);
```

`min()` and `max()`

```css
width: min(100%, 800px);
```

### View transitions

```js
document.startViewTransition(() => {
  document.body.classList.toggle("grid");
});
```

example: list to grid animation


### Color scheme with `color-scheme`

Toggle light / dark page, inputs and custom components

```css
:root {
    color-scheme: light dark;
}
```

### Scroll driven animation

Animate on scroll or on viewport intersection

```css
.animate-on-viewport-intersection {
    animation: something-cool linear both;
    animation-timeline: view();
}

.animate-on-scroll {
    animation: cool-animation linear both;
    animation-timeline: scroll();
}
```

### Relative colors

Colorscheme that changes dynamically!


## UI/UX improvements

`accent-color`

```css
input[type="checkbox"] {
  accent-color: #4f46e5;
}
```

`:focus-visible`

`content-visibility`

```css
.section {
  content-visibility: auto;
}
```

### Improved form validation

`:user-invalid` vs `:invalid`

- lazy vs eager validation

### Native accordion

done with `summary` and `details`

### `@starting-style`

easier entry events

## Ideas

- button that plays a noise like "this guy has his audio on!" to deter people from having audio on.

- greppable comments, so that people can look for where I have used the things I talk about
