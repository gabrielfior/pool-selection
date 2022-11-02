# Take home challenge

## How to

For purchasing LP tokens:
- Navigate to https://pool-selection.herokuapp.com/
- Fill in an e-mail and a pool address (select one from the pool addresses displayed in the table)
- Press Buy

For visualizing the leaderboard:
- Either click on the button "Leaderboard" on the previous page or
- Navigate to https://pool-selection.herokuapp.com/user-holdings/email/<email-you-previously-entered>/leaderboard
  - If a non-existent e-mail is provided as path parameter above, the endpoint still works but without any highlighting.


## Further work if given enough time

- Design
  - Overall very simple HTML-based design, rendered by the serve-static package from NestJS. Having a separete front-end (possibly based on React) would have made the page a lot more beautiful and easy to implement, instead of using clumsy scripts embedded in HTML. Error-handling would also be improved vs. the naive implementation of toast messages in the HTML. The trade-off here is complexity.

- Data model
  - I did not have enough time to consider better options for the case that a user register the same e-mail multiple times. Currently the entry gets updated in the DB, however the system could be made more robust/transparent if entries got invalidated (valid_from, valid_to). 

- API
  - The API is being called too often - once every time the index page loads (for displaying the pools), every time an user purchases LP tokens using the original 100k USD (for calculating the token price) and again for displaying the leaderboard (for fetching the current LP token price). 
  It would be more efficient to make the API call once and store it in a DB, and have a separate async job that continously queried the API for new information (e.g., every 1h), and updated the DB with new data.   
  Another solution would be to use a state-management tool (like Zustand for React), which allows us to have a global state store. This would have to be updated async as well (same case above), but would have allowed us to reduce the API calls.

- Local storage
  - I didn't have the time to keep a copy of the e-mail that the user entered in local storage.

- Tests
  - I would have written tests, specially around leaderboard calculation and adding users to the DB.

- UX
  - In the leaderboard, one information that is missing is the datetime of the last update on the price.
  