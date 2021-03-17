import TYPE from '../storeType'

const state = {
  EXPERT: [],
  LAST_TIME_TITLE: [],
  NOW_TIME_TITLE: [],
  APPROVAL_TIME_TITLE: []
}

const actions = {
  //
  [TYPE.ReliabilityCommitteeManage_LastTimeTitle_Add] ({commit}, msg) {
    commit(TYPE.ReliabilityCommitteeManage_LastTimeTitle_Add, msg) // 提交到mutations中处理
  },
  [TYPE.ReliabilityCommitteeManage_LastTimeTitle_INFO] ({commit}, msg) {
    commit(TYPE.ReliabilityCommitteeManage_LastTimeTitle_INFO, msg) // 提交到mutations中处理
  },
  [TYPE.ReliabilityCommitteeManage_LastTimeTitle_EDIT] ({commit, state}, msg) {
    commit(TYPE.ReliabilityCommitteeManage_LastTimeTitle_EDIT, msg)
  },
  [TYPE.ReliabilityCommitteeManage_LastTimeTitle_DELETE] ({commit}, msg) {
    commit(TYPE.ReliabilityCommitteeManage_LastTimeTitle_DELETE, msg) // 提交到mutations中处理
  },

  [TYPE.ReliabilityCommitteeManage_NowTitle_Add] ({commit}, msg) {
    commit(TYPE.ReliabilityCommitteeManage_NowTitle_Add, msg) // 提交到mutations中处理
  },
  [TYPE.ReliabilityCommitteeManage_NowTitle_INFO] ({commit}, msg) {
    commit(TYPE.ReliabilityCommitteeManage_NowTitle_INFO, msg) // 提交到mutations中处理
  },
  [TYPE.ReliabilityCommitteeManage_NowTitle_DELETE] ({commit}, msg) {
    commit(TYPE.ReliabilityCommitteeManage_NowTitle_DELETE, msg) // 提交到mutations中处理
  },
  [TYPE.ReliabilityCommitteeManage_ApprovalTitle_Add] ({commit}, msg) {
    commit(TYPE.ReliabilityCommitteeManage_ApprovalTitle_Add, msg) // 提交到mutations中处理
  },
  [TYPE.ReliabilityCommitteeManage_ApprovalTitle_INFO] ({commit}, msg) {
    commit(TYPE.ReliabilityCommitteeManage_ApprovalTitle_INFO, msg) // 提交到mutations中处理
  },
  [TYPE.ReliabilityCommitteeManage_ApprovalTitle_DELETE] ({commit}, msg) {
    commit(TYPE.ReliabilityCommitteeManage_ApprovalTitle_DELETE, msg) // 提交到mutations中处理
  }

}

const mutations = {

  [TYPE.ReliabilityCommitteeManage_LastTimeTitle_Add] (state, msg) {
    state.LAST_TIME_TITLE.push(msg)
  },
  [TYPE.ReliabilityCommitteeManage_LastTimeTitle_INFO] (state, msg) {
    state.LAST_TIME_TITLE = msg
  },
  [TYPE.ReliabilityCommitteeManage_LastTimeTitle_EDIT] (state, msg) {
    let arr = state.LAST_TIME_TITLE
    arr.forEach(ms => {
      if (ms.PKID == msg.PKID) {
        let index = arr.indexOf(ms)
        if (index != -1) {
          arr.splice(index, 1, msg)
        }
      }
    })
  },
  [TYPE.ReliabilityCommitteeManage_LastTimeTitle_DELETE] (state, msg) {
    state.LAST_TIME_TITLE.splice(state.LAST_TIME_TITLE.indexOf(msg), 1)
  },
  [TYPE.ReliabilityCommitteeManage_NowTitle_Add] (state, msg) {
    state.NOW_TIME_TITLE.push(msg)
  },
  [TYPE.ReliabilityCommitteeManage_NowTitle_INFO] (state, msg) {
    state.NOW_TIME_TITLE = msg
  },
  [TYPE.ReliabilityCommitteeManage_NowTitle_DELETE] (state, msg) {
    state.NOW_TIME_TITLE.splice(state.NOW_TIME_TITLE.indexOf(msg), 1)
  },
  [TYPE.ReliabilityCommitteeManage_ApprovalTitle_Add] (state, msg) {
    state.APPROVAL_TIME_TITLE.push(msg)
  },
  [TYPE.ReliabilityCommitteeManage_ApprovalTitle_INFO] (state, msg) {
    state.APPROVAL_TIME_TITLE = msg
  },
  [TYPE.ReliabilityCommitteeManage_ApprovalTitle_DELETE] (state, msg) {
    state.APPROVAL_TIME_TITLE.splice(state.APPROVAL_TIME_TITLE.indexOf(msg), 1)
  }
}

const getters = {}

export default {
  state,
  getters,
  actions,
  mutations
}
