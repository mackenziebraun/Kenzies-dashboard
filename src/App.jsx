import { useState } from 'react'
import DashboardView from './views/DashboardView.jsx'
import ThoughtsHistoryView from './views/ThoughtsHistoryView.jsx'
import ReflectionsHistoryView from './views/ReflectionsHistoryView.jsx'
import PileFullView from './views/PileFullView.jsx'
import PlannerDayView from './views/PlannerDayView.jsx'
import CalendarView from './views/CalendarView.jsx'
import AffirmationsManageView from './views/AffirmationsManageView.jsx'

/**
 * Lightweight view switcher — intentionally not react-router. The app is a
 * handful of views hung off one dashboard, and this keeps the dependency
 * surface small. If deep-linkable URLs become important later, swapping
 * this for react-router is a contained change: every view already takes
 * its params as props and calls `navigate(view, param)` to move on.
 */
export default function App() {
  const [route, setRoute] = useState({ view: 'dashboard', param: null })

  function navigate(view, param = null) {
    setRoute({ view, param })
    window.scrollTo({ top: 0 })
  }

  const back = () => navigate('dashboard')

  switch (route.view) {
    case 'thoughts':
      return <ThoughtsHistoryView onBack={back} />
    case 'reflections':
      return <ReflectionsHistoryView onBack={back} />
    case 'pile':
      return <PileFullView onBack={back} />
    case 'planner':
      return <PlannerDayView initialDate={route.param} onBack={back} />
    case 'calendar':
      return <CalendarView initialDate={route.param} onBack={back} />
    case 'affirmations':
      return <AffirmationsManageView onBack={back} />
    case 'dashboard':
    default:
      return <DashboardView navigate={navigate} />
  }
}
