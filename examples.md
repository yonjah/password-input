# Examples using password-input

The `password-input` web component will create a password input with two accessible controllers to allow hearing or seeing the password  -
<style markdown="0">
@font-face {
    font-family: 'fontello';
    src: url('font/fontello.eot?57271051');
    src: url('font/fontello.eot?57271051#iefix') format('embedded-opentype'),
    url('font/fontello.woff2?57271051') format('woff2'),
    url('font/fontello.woff?57271051') format('woff'),
    url('font/fontello.ttf?57271051') format('truetype'),
    url('font/fontello.svg?57271051#fontello') format('svg');
    font-weight: normal;
    font-style: normal;
}
</style>
<script type="text/javascript" src="./password-input.js" markdown="0"></script>

<form method="post" action="" markdown="0">
    <legend>Example Form</legend>
    <label for="password">password</label>
    <input is="password-input" name="password" id="password" value="more test"/>
    <input type="submit"/>
</form>

## Basic Usage

### Include the component js file
```html5
<script src="./password-input.js"></script>
```

### Add the icon fonts
```html5
<style>
    @font-face {
      font-family: 'fontello';
      src: url('font/fontello.eot?57271051');
      src: url('font/fontello.eot?57271051#iefix') format('embedded-opentype'),
           url('font/fontello.woff2?57271051') format('woff2'),
           url('font/fontello.woff?57271051') format('woff'),
           url('font/fontello.ttf?57271051') format('truetype'),
           url('font/fontello.svg?57271051#fontello') format('svg');
      font-weight: normal;
      font-style: normal;
    }
</style>
```

### Add a form using the component
```html5
<form method="post" action="">
    <legend>Example Form</legend>
    <label for="password">password</label>
    <input is="password-input" name="password" id="password" value="more test"/>
    <input type="submit"/>
</form>
````
