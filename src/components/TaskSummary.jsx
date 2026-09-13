
export default function TaskSummary({summaryObj}) {
  return (
    <div className="flex-style">

      <div className="summary-card bg-summary-1">
        <p className="font-semibold">Total</p>
        <p className="font-extrabold">{summaryObj.allCount}</p>
      </div>

      <div className="summary-card bg-summary-2">
        <p className="hidden md:block font-semibold">Completed</p>
        <p className="block md:hidden font-semibold">Done</p>
        <p className="font-extrabold">{summaryObj.completedCount}</p>
      </div>

      <div className="summary-card bg-summary-3">
        <p className="font-semibold">Pending</p>
        <p className="font-extrabold">{summaryObj.pendingCount}</p>
      </div>
    </div>
  )
}
