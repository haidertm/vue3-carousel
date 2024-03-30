# Introduction 
Carousel component for Vue 3.
 
Built this simple carousel that is based on gsap

https://gsap.com/


### Props

| Name    | Type   | Default | Description                                               |
|---------|--------|---------|-----------------------------------------------------------|
| slides  | Number | 1       | Number of Slides Per Carousel                             |
| space-x | Number | 3       | Tailwind space-x-* class, works only if more than 1 slide |
| loop    | Boolean| false   | Loop the Carousel                                         |
| autoplay| Boolean| false   | Autoplay the Carousel                                     |
| interval| Number | 5000    | Autoplay Interval                                         |
| speed   | Number | 0.3     | Animation Speed                                           |
| show-navigation-arrows     | Boolean| true    | Show Navigation Arrows                                    |
| dots    | Boolean| true    | Show Dots - only works if Number of slides is 1           |
| pauseOnHover | Boolean | false   | Pause Autoplay on Hover                                   |

### Events

TODO: Need to work on events (In Progress)

| Name    | Description                                               |
|---------|-----------------------------------------------------------|
| slideChange  | Emitted when the slide changes                           |
| slideClick   | Emitted when a slide is clicked                          |
 | slideHover   | Emitted when a slide is hovered                          |
| slideEnter   | Emitted when a slide enters the viewport                 |
| slideLeave   | Emitted when a slide leaves the viewport                 |
| slideBeforeEnter   | Emitted before a slide enters the viewport               |
| slideBeforeLeave   | Emitted before a slide leaves the viewport               |
| slideBeforeChange  | Emitted before the slide changes                         |
| slideAfterChange   | Emitted after the slide changes                          |
|

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup**

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
