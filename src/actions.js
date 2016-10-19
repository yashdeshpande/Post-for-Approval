export function addComment(contentId, comment) {
  return {
    type: 'ADD_COMMENT',
    contentId: contentId,
    comment: comment
  }
}

export function approve(contentId) {
  return {
    type: 'APPROVE',
    contentId: contentId,
    status: 'approved'
  }
}

export function reject(contentId) {
  return {
    type: 'REJECT',
    contentId: contentId,
    status: 'rejected'
  }
}

export function unmark(contentId) {
  return {
    type: 'UNMARK',
    contentId: contentId,
    status: 'new'
  }
}
