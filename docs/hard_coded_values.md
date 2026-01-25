# Hard Coded & Default Values

## Back
- app.ts -> JWT token expires in 365 days 

## Front
- Day.tsx -> 1h stale time for question and answer
- GlobalProvider.tsx -> default currentDay is Today
- useUser.ts -> 5min stale time for /me
- AnswerInput.tsx -> 2sec debounce before saving