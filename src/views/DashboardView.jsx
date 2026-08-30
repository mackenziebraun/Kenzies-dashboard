import Header from '../components/layout/Header.jsx'
import DecorativeLayer from '../components/layout/DecorativeLayer.jsx'
import ThoughtInputCard from '../components/dashboard/ThoughtInputCard.jsx'
import DailyReflectionCard from '../components/dashboard/DailyReflectionCard.jsx'
import ThePileCard from '../components/dashboard/ThePileCard.jsx'
import DayPlannerCard from '../components/dashboard/DayPlannerCard.jsx'
import CalendarCard from '../components/dashboard/CalendarCard.jsx'
import AffirmationCard from '../components/dashboard/AffirmationCard.jsx'
import TodayAtGlanceCard from '../components/dashboard/TodayAtGlanceCard.jsx'

/**
 * Layout mirrors the mockup's hierarchy: greeting + quick-thought bar up
 * top, then a 3-column card grid (reflection/pile stacked on the left,
 * planner + quote in the middle, calendar/glance on the right). On
 * narrower screens it collapses to a single column in reading order
 * rather than trying to preserve the desktop arrangement.
 */
export default function DashboardView({ navigate }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Header />

      <div className="mb-6">
        <ThoughtInputCard onViewHistory={() => navigate('thoughts')} />
      </div>

      <div className="relative pb-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-5">
            <DailyReflectionCard onViewHistory={() => navigate('reflections')} />
            <ThePileCard onViewFullPile={() => navigate('pile')} />
          </div>

          <div className="flex flex-col gap-5">
            <DayPlannerCard onOpenPlanner={() => navigate('planner', new Date())} />
            <AffirmationCard slot="affirmation-1" tone="lavender" onManage={() => navigate('affirmations')} />
          </div>

          <div className="flex flex-col gap-5">
            <CalendarCard onViewDay={(date) => navigate('calendar', date)} />
            <TodayAtGlanceCard />
          </div>
        </div>

        <DecorativeLayer />
      </div>
    </div>
  )
}
