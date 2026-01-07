export const validTestCases = [
  '```one```',
  '```one, two```',
  '```three four, five six```,seven,eight,```nine```',
  '```three four,``` five six ten eleven, twelve thirteen```,seven,eight,```nine```',
  '```three four,``` five six ten eleven, twelve thirteen``,seven,eight,```nine```',
  '``three four,``` five six ten eleven, twelve thirteen``,seven,eight,```nine```',
  '```fifteen```sixteen```,seventeen```',
  'one,two,seventeen',
  '```eighteen, nineteen```,```twenty, twentyone```',
  '``three four,``` five six ten eleven, twelve thirteen``,seven,eight,```,nine``',
  'one```two```seventeen',
  'one```two```',
];

export const invalidTestCases = [
  '```one`',
  '```one``',
  '```one``` ,extra space',
  '``three four,``` five six ten eleven, twelve thirteen``,seven,eight,```nine``',
];

export const splitWithCommaEscapeTestCases = [
  // Case 1: Single item, no commas
  {
    input: 'one',
    expected: ['one'],
  },
  // Case 2: Simple comma-separated items
  {
    input: 'apple,banana,cherry',
    expected: ['apple', 'banana', 'cherry'],
  },
  // Case 3: Single escaped item with comma
  {
    input: '```one, two```',
    expected: ['one, two'],
  },
  // Case 4: Multiple items with one escaped
  {
    input: '```three four, five six```,seven,eight,```nine```',
    expected: ['three four, five six', 'seven', 'eight', 'nine'],
  },
  // Case 5: Escaped item with nested backticks (not triple)
  {
    input:
      '```three four,``` five six ten eleven, twelve thirteen```,seven,eight,```nine```',
    expected: [
      'three four,``` five six ten eleven, twelve thirteen',
      'seven',
      'eight',
      'nine',
    ],
  },
  // Case 6: Escaped item with single and double backticks not forming closing sequence
  {
    input:
      '```three four,``` five six ten eleven, twelve thirteen``,seven,eight,```nine```',
    expected: [
      'three four,``` five six ten eleven, twelve thirteen``,seven,eight,```nine',
    ],
  },
  // Case 7: Two backticks not forming escape sequence
  {
    input:
      '``three four,``` five six ten eleven, twelve thirteen``,seven,eight,```nine```',
    expected: [
      '``three four',
      ' five six ten eleven, twelve thirteen``,seven,eight,```nine',
    ],
  },
  // Case 8: Trailing triple backticks with nested triple backticks
  {
    input: '```fifteen```sixteen```,seventeen```',
    expected: ['fifteen```sixteen', 'seventeen```'],
  },
  // Case 9: Multiple escaped items
  {
    input: '```alpha, beta```,```gamma, delta```,```epsilon, zeta```',
    expected: ['alpha, beta', 'gamma, delta', 'epsilon, zeta'],
  },
  // Case 10: Mix of escaped and unescaped items
  {
    input: 'simple,```with, comma```,another',
    expected: ['simple', 'with, comma', 'another'],
  },
  // Case 11: Empty escaped item
  {
    input: 'one,``````, two',
    expected: ['one', '', ' two'],
  },
  // Case 12: Item with only spaces
  {
    input: '```   ```,test',
    expected: ['   ', 'test'],
  },
  // Case 13: Five items
  {
    input: 'a,b,c,d,e',
    expected: ['a', 'b', 'c', 'd', 'e'],
  },
  // Case 14: Escaped item at beginning and end
  {
    input: '```start, here```,middle,```end, now```',
    expected: ['start, here', 'middle', 'end, now'],
  },
  // Case 15: Consecutive commas with escaped items
  {
    input: 'x,```y, z```,a',
    expected: ['x', 'y, z', 'a'],
  },
  // Case 16: Long escaped string with multiple commas
  {
    input: '```a, b, c, d```,e',
    expected: ['a, b, c, d', 'e'],
  },
  // Case 17: Triple backticks in content not at boundaries
  {
    input: '```before```after```,test',
    expected: ['before```after', 'test'],
  },
  // Case 18: Multiple escaped items with special characters
  {
    input: '```one@two, three!```,```four#five, six$```',
    expected: ['one@two, three!', 'four#five, six$'],
  },
  // Case 19: Six items with one escaped
  {
    input: 'a,b,```c, d```,e,f,g',
    expected: ['a', 'b', 'c, d', 'e', 'f', 'g'],
  },
  // Case 20: Complex nested scenario
  {
    input:
      '```one, with comma```,normal,```two, also comma```,```and, another, one```,end',
    expected: [
      'one, with comma',
      'normal',
      'two, also comma',
      'and, another, one',
      'end',
    ],
  },
  // Case 21: backticks as part of the value
  {
    input:
      '``````one, with comma`````,normal,```two, also comma`````,``````and, another, one```,end',
    expected: [
      '```one, with comma``',
      'normal',
      'two, also comma``',
      '```and, another, one',
      'end',
    ],
  },
];
