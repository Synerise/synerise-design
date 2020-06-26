### Date.jsx

Component for formatting ISO datetime with business profile's  timezone.
 
#### Standard usage:
```javascript
  <ParsedDate
    date={isoDate} // "2019-01-28T09:18:04.022Z"
  />
```

#### Custom format function:
```javascript
  <ParsedDate
    date={isoDate} // "2019-01-28T09:18:04.022Z"
    format={(isoDate, options) => {
          return Intl.DateTimeFormat(options.locale, options)
            .format(new Date(isoDate))
            .replace(',', '')
          }
        }
  />
```