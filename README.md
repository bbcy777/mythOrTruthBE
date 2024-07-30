#Myth or Truth Backend

Frontend Repo: https://github.com/bbcy777/mythOrTruthFE.git

-Mongoose DB with 3 Schema(revisit 319SBA): 
1. User: user basic info (username, email, password)
2. Question: question, answer, fact(idea), question category.
3. Cart: connect user with questions. It shows user id and their list of favorite questions.

-Routes:
1. To authenticate/varify user info, user route is divided to userLogin, userSignup 
2. questions route include showing all questions, id parameter for CRUD function(only registed user/admin should be able to edit).
3. I named user's favorite route favCart. It takes user id and question id parameter to post and delete items from the favorite list. 

-Future Update:
1. For the Questions, add most liked number, key words for searching.
2. Separate user to isAdmin or normal user. Normal user can submit change request, but only Admin can edit and delete.
3. Save questions taken for each user other.
