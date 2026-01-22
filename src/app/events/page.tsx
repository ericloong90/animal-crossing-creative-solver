'use client';

import { useState, useMemo } from 'react';
import { Calendar, List, ShoppingBag } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HemisphereSelector } from '@/components/critters/HemisphereSelector';
import {
  EventCard,
  EventCalendar,
  EventFilters,
  EventStatusBadge,
} from '@/components/events';
import { useEventCalendar } from '@/hooks/useEventCalendar';
import type { EventCategory, EventStatus, EventWithStatus } from '@/types/event';

type ViewMode = 'calendar' | 'list';

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | 'all'>('all');
  const [showPassed, setShowPassed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventWithStatus | null>(null);

  const { allEvents, happeningNow, shoppingAvailable, hemisphere } = useEventCalendar({
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    statuses: selectedStatus !== 'all' ? [selectedStatus] : undefined,
    excludePassed: !showPassed,
  });

  // Group events by status for list view
  const groupedEvents = useMemo(() => {
    const groups: Record<string, EventWithStatus[]> = {
      'happening-now': [],
      'today': [],
      'this-week': [],
      'this-month': [],
      'upcoming': [],
      'passed': [],
    };

    allEvents.forEach((event) => {
      groups[event.status].push(event);
    });

    return groups;
  }, [allEvents]);

  const handleEventClick = (event: EventWithStatus) => {
    setSelectedEvent(event);
    // Scroll to event in list view
    const element = document.getElementById(event.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-[var(--font-display)] font-bold text-[var(--foreground)]">
              Events Calendar
            </h1>
            <p className="text-[var(--foreground-muted)] mt-1">
              Track seasonal events, competitions, and Nook Shopping items
            </p>
          </div>
          <HemisphereSelector />
        </div>

        {/* Happening Now Alert */}
        {happeningNow.length > 0 && (
          <Card variant="elevated" padding="md" className="mb-6 border-2 border-[var(--nook-green)]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--nook-green)] flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
                  Happening Now!
                  <EventStatusBadge status="happening-now" size="sm" />
                </h2>
                <div className="mt-2 space-y-1">
                  {happeningNow.map((event) => (
                    <p key={event.id} className="text-[var(--foreground-muted)]">
                      <strong>{event.name}</strong> - {event.description.slice(0, 100)}...
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Shopping Available Alert */}
        {shoppingAvailable.length > 0 && (
          <Card
            variant="default"
            padding="md"
            className="mb-6 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                <ShoppingBag size={20} className="text-purple-600 dark:text-purple-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-purple-700 dark:text-purple-300">
                  Nook Shopping - Seasonal Items Available
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {shoppingAvailable.map((event) => (
                    <span
                      key={event.id}
                      className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 text-sm font-medium"
                    >
                      {event.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* View Toggle and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
              List
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              <Calendar size={16} />
              Calendar
            </Button>
          </div>

          <EventFilters
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            showPassed={showPassed}
            onShowPassedChange={setShowPassed}
          />
        </div>

        {/* Main Content */}
        {viewMode === 'calendar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EventCalendar onEventClick={handleEventClick} />
            </div>
            <div>
              {selectedEvent ? (
                <div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
                    Selected Event
                  </h3>
                  <EventCard event={selectedEvent} variant="full" />
                </div>
              ) : (
                <Card variant="default" padding="md">
                  <p className="text-[var(--foreground-muted)] text-center">
                    Click an event on the calendar to see details
                  </p>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Happening Now */}
            {groupedEvents['happening-now'].length > 0 && (
              <section>
                <h2 className="text-xl font-[var(--font-display)] font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  Happening Now
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedEvents['happening-now'].map((event) => (
                    <div key={event.id} id={event.id}>
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Today */}
            {groupedEvents['today'].length > 0 && (
              <section>
                <h2 className="text-xl font-[var(--font-display)] font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  Today
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedEvents['today'].map((event) => (
                    <div key={event.id} id={event.id}>
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* This Week */}
            {groupedEvents['this-week'].length > 0 && (
              <section>
                <h2 className="text-xl font-[var(--font-display)] font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="text-2xl">📆</span>
                  This Week
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedEvents['this-week'].map((event) => (
                    <div key={event.id} id={event.id}>
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* This Month */}
            {groupedEvents['this-month'].length > 0 && (
              <section>
                <h2 className="text-xl font-[var(--font-display)] font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="text-2xl">🗓️</span>
                  This Month
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedEvents['this-month'].map((event) => (
                    <div key={event.id} id={event.id}>
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming */}
            {groupedEvents['upcoming'].length > 0 && (
              <section>
                <h2 className="text-xl font-[var(--font-display)] font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔮</span>
                  Upcoming
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedEvents['upcoming'].map((event) => (
                    <div key={event.id} id={event.id}>
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Passed */}
            {showPassed && groupedEvents['passed'].length > 0 && (
              <section>
                <h2 className="text-xl font-[var(--font-display)] font-bold text-[var(--foreground)] mb-4 flex items-center gap-2 opacity-60">
                  <span className="text-2xl">📜</span>
                  Passed Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
                  {groupedEvents['passed'].map((event) => (
                    <div key={event.id} id={event.id}>
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {allEvents.length === 0 && (
              <Card variant="default" padding="lg" className="text-center">
                <p className="text-[var(--foreground-muted)]">
                  No events match your current filters. Try adjusting the filters to see more events.
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
