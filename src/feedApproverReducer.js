import _ from 'lodash';

let contentCardSkel = {
  author: '',
  profilePic: '',
  date: '',
  channel: '',
  description: '',
  comments: [],
  status: ''
}

export default function feedApproverReducer(state = [], action) {
  switch(action.type){
    case 'ADD_COMMENT':
      if(action.contentId < 0 || action.contentId >= state.length){
        return state;
      }
      return _.concat(
        [],
        _.slice(state, 0, action.contentId),
        _.assign({}, state[action.contentId], {
          comments: _.concat([], state[action.contentId].comments, action.comment)
        }),
        _.slice(state, action.contentId + 1, state.length)
      );
    case 'APPROVE':
    case 'REJECT':
    case 'UNMARK':
      if(action.contentId < 0 || action.contentId >= state.length){
        return state;
      }
      return _.concat(
        [],
        _.slice(state, 0, action.contentId),
        _.assign({}, state[action.contentId], {
          status: action.status
        }),
        _.slice(state, action.contentId + 1, state.length)
      );
    default:
      return state;
  }
}
