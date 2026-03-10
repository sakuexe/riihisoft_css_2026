# Riihisoft training day materials, March 2026

Topic: CSS is pretty cool nowadays

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
