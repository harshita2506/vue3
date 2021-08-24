import { State } from '../Modals/State'

export const getters={
    upcomingLeaves(state:State):string{
    const pending_leaves=state.leave_status.filter((item)=>((item.status=="Pending" || item.status=="Accepted" ) && new Date(item.start_date).getTime()>new Date().getTime()))
    if(pending_leaves.length>1)
      return `${pending_leaves[0].start_date} to ${pending_leaves[pending_leaves.length-1].start_date}`
      else if(pending_leaves.length==1) return `${pending_leaves[0].start_date}`
      else return ''
    },
    pendingLeaves(state:State): number{
      return (state.leave_status.filter((item)=>item.status=="Pending")).length
    },
  }