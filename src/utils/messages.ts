

class Messages{

   static DB = {
      INVALID_ID : 'Invalid Id'
   }

    static SERVER = {
        NOT_FOUND: "Oops..! It's 404",
        FORBIDDEN: "Oops..! It's 403",
        BAD_REQUEST: "Bad Request",
        SERVER_ERROR: "Oops..! Something went wrong",
        UNAUTORIZED_ACCESS: "Unautorized Access"
     }

     static AUTH = {
        PASSWORD_INVALID : 'Invalid Password',
        AUTH_SUCCESS : 'Succesfully Authenticated',
        REGISTER_FAILED : 'Oops..! Failed to Register You',
        REGISTER_SUCCESS : 'Successfully Registered',
        LOGIN_FAILED : 'Oops..! Failed to Authenticate You',
        LOGIN_SUCCESS : 'Logged In',
        TOKEN_EXPIRED : 'Oops..! Seems your access been expired.'

     }
     
     static USER = {
        NOT_FOUND : 'User Not Found',
        FOUND : 'User Found',
        FOLLOW_ALREADY : 'You are already following',
        FOLLOW_SELF : "You can't follow your self"
     }

     static POST = {
      POST_CREATED: 'Post Created Successfully',
      POST_CREATION_FAILED: 'Failed To Create Post',
      POST_FOUND: 'Post Found',
      POST_NOT_FOUND: 'No Post Found',
      POST_UPDATED: 'Post Updated',
      POST_UPDATE_FAILED: 'Failed To Updated Post',
      POST_DELATED: 'Post Deleted',
      POST_DELETE_FAILED: 'Failed To Delete Post',

      LIKE_ALREADY:'You Already Liked This Post',
      LIKE_SUCCESS:'Post Liked Successfully',
      LIKE_FAILED : 'Oops..! Failed To Like This Post',

      UNLIKE_ALREADY:'You Already Unliked This Post',
      UNLIKE_SUCCESS:'Post Unliked Successfully',
      UNLIKE_FAILED : 'Oops..! Failed To Unlike This Post',
      
      COMMENT_SUCCESS:'Comment Posted',
      COMMENT_FAILED : 'Oops..! Failed To Post Your Comment'
    }
    
    static FOLLOW = {
      FOLLOW_CREATED: 'Followed Successfully',
      FOLLOW_CREATION_FAILED: 'Failed To Follow',
      FOLLOW_FOUND: 'Followers Found',
      FOLLOW_NOT_FOUND: 'No Followers Found',
      FOLLOW_DELETED: 'UnFollowed Successfully',
      FOLLOW_DELETE_FAILED: 'Already UnFollowed',
    }

}

export default Messages