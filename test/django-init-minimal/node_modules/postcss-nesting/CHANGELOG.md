# Changes to PostCSS Nesting

### 12.1.2

_April 21, 2024_

- Edition `2024-02`:
  - Do not rewrite selectors for declarations in conditional rules to a form with `:is()`

This will work:
```css
::before, ::after {
	color: blue;

	@media screen { color: cyan; }
}
```

This still **wont** work:
```css
::before, ::after {
	color: blue;

	&:hover { color: cyan; }
}
```

### 12.1.1

_March 31, 2024_

- Updated [`@csstools/selector-specificity`](https://github.com/csstools/postcss-plugins/tree/main/packages/selector-specificity) to [`3.0.3`](https://github.com/csstools/postcss-plugins/tree/main/packages/selector-specificity/CHANGELOG.md#303) (patch)

### 12.1.0

_March 6, 2024_

- Add the `edition` plugin option to control which CSS nesting specification version should be used. The default is `2021` but you can also set it to the newer `2024-02` edition to have more modern behavior.

[Full CHANGELOG](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting/CHANGELOG.md)
