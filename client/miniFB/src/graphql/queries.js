import gql from 'graphql-tag';

const FETCH_STATUSES = gql`
  query fetch_statuses{
    statuses {
      _id
      status
      likes {
			name
      }
      comments {
        _id
        comment
        user {
          _id
          email
          name
          photo_profile
        }
      }
      user {
        _id
        email
        name
        photo_profile
      }
    }
  }
`;

const FETCH_STATUS = gql`
  query fetch_status($statusId:String!){
    status(statusId:$statusId){
      _id
      comments{
        comment
        user{
          name
        }
      }
      user{
        name
      }
      likes{
        name
      }
    }
  }
`;

const FETCH_ME = gql`
  query fetch_status{
    me {
      _id
      name
      email
      photo_profile
      statuses {
        _id
        status
      }
      likes {
        status
      }
      comments {
        status {
          status
        }
      }
    }
	}
`;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      token
    }
  }
`;

const REGISTER_USER = gql`
  mutation registerUser($name: String!, $email: String!, $password: String!) {
    registerUser(
      name: $name
      email: $email
      password: $password
    ) {
      _id,
      name,
      email
    }
  }
`;

const ADD_STATUS = gql`
  mutation addStatus ($status: String!){
    addStatus(status: $status) {
      _id
      status
    }
  }
`;

const DELETE_STATUS = gql`
  mutation deleteStatus ($_id:String, $userId:String!){
    deleteStatus(
      _id:$_id, 
      userId:$userId
      ) {
      _id,
      status
    }
  }
`;

const EDIT_STATUS = gql`
  mutation editStatus($_id: String, $status:String, $userId:String){
    editStatus(
      _id:$_id
      status:$status
      userId:$userId
    ){
      _id,
      status
    }
  }
`;

const ADD_COMMENT = gql`
  mutation addComment($comment: String, $status: String){
    addComment(
      status:$status
      comment:$comment
    ){
      _id,
      comment
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment ($_id:String, $userId:String!){
    deleteComment(
      _id:$_id, 
      userId:$userId
      ) {
      _id,
      comment
    }
  }
`;

const EDIT_COMMENT = gql`
  mutation editComment($_id: String, $comment:String, $userId:String){
    editComment(
      _id:$_id
      comment:$comment
      userId:$userId
    ){
      _id,
      comment
    }
  }
`;

const LIKE = gql`
  mutation like($status: String){
    like(status:$status){
      status {
        _id
      }
    }
  }
`;

const DISLIKE = gql`
  mutation dislike($status: String){
    dislike(status:$status){
      status {
        _id
      }
    }
  }
`;

export {
  REGISTER_USER,
  LOGIN_USER,
  FETCH_STATUSES,
  ADD_STATUS,
  DELETE_STATUS,
  EDIT_STATUS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  FETCH_STATUS,
  FETCH_ME,
  LIKE,
  DISLIKE
}