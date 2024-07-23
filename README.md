#Myth or Truth Backend

-Mongoose DB with 3 Schema(revisit 319SBA): 
1. User: user basic info (username, email, password, isAdmin) and questions taken
2. Question: question, answer, idea, # of taken, # of correct answer, question category or key words.
3. Cart: connect user with questions. It shows a user a list of questions taken.

-Routes:
1. To authenticate/varify user info, user route is subdivided to userLogin and userSignup
2. questions route include showing all questions, id parameter for CRUD function(only registed user/admin should be able to edit). 