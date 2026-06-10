/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ExternalLink, 
  Lock, 
  LogOut, 
  RefreshCw, 
  Search, 
  Mail, 
  Smartphone, 
  ChevronRight, 
  Check, 
  AlertCircle,
  Video
} from 'lucide-react';
import { 
  googleSignIn, 
  logout, 
  subscribeLeads, 
  updateLead, 
  deleteLead, 
  getAccessToken, 
  initAuth,
  LeadDoc 
} from '../lib/firebase';
import { User } from 'firebase/auth';

interface SystemsHubProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  htmlLink?: string;
}

export default function SystemsHub({ isOpen, onClose }: SystemsHubProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadDoc[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedLead, setSelectedLead] = useState<LeadDoc | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  
  // Scheduling state
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('14:00');
  
  // UI states
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, cachedToken) => {
        setCurrentUser(user);
        setToken(cachedToken);
      },
      () => {
        setCurrentUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch Firestore Leads (real-time active subscription)
  useEffect(() => {
    if (!currentUser) {
      setLeads([]);
      setIsLoadingLeads(false);
      return;
    }

    setIsLoadingLeads(true);
    const unsubscribe = subscribeLeads(
      (updatedLeads) => {
        setLeads(updatedLeads);
        setIsLoadingLeads(false);
      },
      (error) => {
        console.error('Leads subscription error:', error);
        setIsLoadingLeads(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Fetch Google Calendar events when token changes
  useEffect(() => {
    if (token) {
      fetchCalendarEvents(token);
    } else {
      setCalendarEvents([]);
    }
  }, [token]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setToken(result.accessToken);
      }
    } catch (err) {
      console.error('Google authorization failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to log out from the Secure Terminal?');
    if (!confirmLogout) return;
    try {
      await logout();
      setCurrentUser(null);
      setToken(null);
      setSelectedLead(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Google Calendar integration
  const fetchCalendarEvents = async (accessToken: string) => {
    setIsLoadingCalendar(true);
    setCalendarError(null);
    try {
      const timeMin = new Date().toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&maxResults=10&orderBy=startTime&singleEvents=true`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Google Calendar API error: ${response.status} - ${errText}`);
      }

      const data = await response.json();
      setCalendarEvents(data.items || []);
    } catch (err: any) {
      console.error('Error fetching calendar events:', err);
      // If token expired, or unauthorized occurred
      if (err.message.includes('401') || err.message.includes('expired')) {
        setCalendarError('OAuth token expired. Please re-authenticate your Google Calendar.');
      } else {
        setCalendarError('Failed to fetch calendar. Ensure Google Calendar API is active.');
      }
    } finally {
      setIsLoadingCalendar(false);
    }
  };

  const handleCreateCalendarEvent = async () => {
    if (!selectedLead || !token) return;
    if (!scheduleDate) {
      alert('Please specify a calendar date.');
      return;
    }

    const startDateTime = new Date(`${scheduleDate}T${scheduleTime}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000); // 30 minutes duration

    // User confirmation dialog before mutation (MANDATORY)
    const confirmed = window.confirm(
      `Sync with Google Calendar?\n\nSetting Audit Session for: ${selectedLead.name}\nSchedule: ${startDateTime.toLocaleDateString()} at ${scheduleTime}\nAttendee: ${selectedLead.email}\n\nDo you want to write this to your official google calendar?`
    );
    if (!confirmed) return;

    setIsBooking(true);
    try {
      const meetId = `meet-${Math.random().toString(36).substring(2, 11)}`;
      
      const eventPayload = {
        summary: `AI Systems Audit: ${selectedLead.name}`,
        description: `High-priority audit to analyze manual frictions, Shopify architectures, and workflow automations.\n\nLead Brief:\n${selectedLead.message}\n\nClient Email: ${selectedLead.email}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Nairobi'
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Nairobi'
        },
        attendees: [{ email: selectedLead.email }],
        conferenceData: {
          createRequest: {
            requestId: meetId,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        }
      };

      const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventPayload)
      });

      if (!response.ok) {
        throw new Error(`Calendar booking failed with HTTP status ${response.status}`);
      }

      const createdEvent = await response.json();
      
      // Update Firestore record
      await updateLead(selectedLead.id, {
        status: 'ACCEPTED',
        scheduledTime: startDateTime.toISOString(),
        calendarEventId: createdEvent.id
      });

      // Update local state 
      setSelectedLead(prev => prev ? {
        ...prev,
        status: 'ACCEPTED',
        scheduledTime: startDateTime.toISOString(),
        calendarEventId: createdEvent.id
      } : null);

      alert(`Successfully synchronized! Meeting slot is saved on Google Calendar.`);
      
      // Refresh events list
      fetchCalendarEvents(token);
    } catch (err: any) {
      console.error('Error booking event:', err);
      alert(`Booking operation failed: ${err.message || err}`);
    } finally {
      setIsBooking(false);
    }
  };

  const handleUpdateStatus = async (leadId: string, newStatus: LeadDoc['status']) => {
    // User confirmation dialog before mutation (MANDATORY)
    const confirmed = window.confirm(`Update Lead status to [${newStatus}]?`);
    if (!confirmed) return;

    try {
      await updateLead(leadId, { status: newStatus });
      setSelectedLead(prev => prev && prev.id === leadId ? { ...prev, status: newStatus } : prev);
    } catch (err) {
      console.error('Update operation failed:', err);
    }
  };

  const handleDeleteLeadEntry = async (leadId: string) => {
    // User confirmation dialog before mutation (MANDATORY)
    const confirmed = window.confirm('DANGER: Are you sure you want to permanently delete this lead from Firestore database? This action cannot be undone.');
    if (!confirmed) return;

    try {
      await deleteLead(leadId);
      setSelectedLead(null);
    } catch (err) {
      console.error('Delete operation failed:', err);
    }
  };

  // Filter leads list
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lead.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" id="systems-hub-wrapper">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/50 backdrop-blur-md"
            id="systems-backdrop"
          />

          {/* Secure Panel */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="relative w-full max-w-6xl h-[90vh] bg-brand-bg border border-brand-dark/20 text-brand-dark flex flex-col z-10 shadow-2xl overflow-hidden sharp-edge mx-4"
            id="systems-admin-panel"
          >
            {/* System Header bar */}
            <div className="flex justify-between items-center bg-brand-dark text-white p-4 font-mono text-xs uppercase tracking-widest border-b border-brand-dark">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="font-bold">SYSTEMS CONTROL CENTER // SECURE ENVIRONMENT</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:text-brand-accent transition-colors cursor-pointer"
                id="systems-close-btn"
                aria-label="Close panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Unauthenticated Terminal state */}
            {!currentUser ? (
              <div className="flex-1 flex flex-col justify-center items-center text-center p-8 bg-brand-bg">
                <div className="h-14 w-14 border border-brand-dark/15 flex items-center justify-center mb-6 rounded-none bg-brand-dark/5">
                  <Lock size={24} className="text-brand-dark" />
                </div>
                <h3 className="font-serif text-2xl font-bold tracking-tight mb-2">Secure Operator Access</h3>
                <p className="font-sans text-xs text-brand-muted max-w-md leading-relaxed mb-8">
                  This interface provides live pipeline indexing, Firestore state control, and Google Calendar sync loops. Unauthorized parameters will be denied.
                </p>

                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button text-xs font-semibold px-6 py-3 border border-brand-dark bg-brand-dark text-white hover:bg-brand-accent hover:border-brand-accent transition-all cursor-pointer sharp-edge active:scale-95 flex items-center gap-3"
                  id="google-signin-btn"
                >
                  <div className="gsi-material-button-icon bg-white p-1 flex items-center justify-center h-5 w-5 rounded-sm">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents font-sans tracking-wide">Sign in with Google Account</span>
                </button>
              </div>
            ) : (
              /* Authenticated Control Console */
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden division bg-brand-bg">
                
                {/* PART 1: LEADS DIRECTORY LISTING */}
                <div className="w-full md:w-5/12 border-r border-brand-dark/10 flex flex-col h-full bg-brand-bg">
                  
                  {/* Search and Filters */}
                  <div className="p-4 border-b border-brand-dark/15 space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-brand-muted" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Leads database..."
                        className="w-full text-xs pl-9 pr-3 py-2 bg-brand-dark/5 border border-brand-dark/10 focus:outline-none focus:border-brand-accent text-brand-dark font-sans sharp-edge"
                      />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-1 font-sans text-[10px]">
                      {['ALL', 'HIGH_QUEUE_PRIORITY', 'IN_PROGRESS', 'ACCEPTED', 'ARCHIVED'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setStatusFilter(filter)}
                          className={`transition-colors px-2 py-0.5 border font-semibold cursor-pointer ${
                            statusFilter === filter 
                              ? 'bg-brand-dark text-white border-brand-dark' 
                              : 'bg-brand-surface border-brand-dark/15 text-brand-muted hover:border-brand-dark'
                          }`}
                        >
                          {filter === 'HIGH_QUEUE_PRIORITY' ? 'QUEUED' : filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Leads List Flow */}
                  <div className="flex-1 overflow-y-auto divide-y divide-brand-dark/5">
                    {isLoadingLeads ? (
                      <div className="p-8 flex justify-center items-center gap-3 font-mono text-[11px] text-brand-muted">
                        <RefreshCw size={12} className="animate-spin text-brand-accent" />
                        <span>QUERIED SECURE LEAD INDEX...</span>
                      </div>
                    ) : filteredLeads.length === 0 ? (
                      <div className="p-8 text-center font-sans text-xs text-brand-muted">
                        No lead submissions exist for the selected filters.
                      </div>
                    ) : (
                      filteredLeads.map((lead) => (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`p-4 text-left cursor-pointer transition-all border-l-2 text-brand-dark hover:bg-brand-dark/5 ${
                            selectedLead?.id === lead.id 
                              ? 'bg-brand-dark/5 border-brand-accent' 
                              : 'border-transparent'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1 font-mono text-[10px]">
                            <span className="font-bold tracking-wider">{lead.id}</span>
                            <span className={`px-1.5 py-0.5 font-bold ${
                              lead.status === 'HIGH_QUEUE_PRIORITY' ? 'bg-red-100 text-red-800' :
                              lead.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800' :
                              lead.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {lead.status === 'HIGH_QUEUE_PRIORITY' ? 'QUEUED' : lead.status}
                            </span>
                          </div>

                          <h4 className="font-serif text-sm font-bold truncate">{lead.name}</h4>
                          <p className="font-sans text-[11px] text-brand-muted truncate mb-2">{lead.email}</p>
                          <p className="font-sans text-[11px] text-[#27272a] line-clamp-1 mb-1 font-light italic">
                            "{lead.message.split('\n\n').pop()}"
                          </p>

                          <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#71717a] mt-2">
                            <Clock size={10} />
                            <span>{new Date(lead.timestamp).toLocaleDateString()} at {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Auth status footer */}
                  <div className="p-4 border-t border-brand-dark/15 bg-brand-dark/5 flex justify-between items-center font-mono text-[10px]">
                    <div className="flex items-center gap-2 truncate">
                      {currentUser.photoURL && (
                        <img 
                          src={currentUser.photoURL} 
                          alt="avatar" 
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full border border-brand-dark/25" 
                        />
                      )}
                      <span className="font-bold truncate text-brand-dark">{currentUser.email}</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1 text-red-700 hover:text-red-900 transition-colors font-bold cursor-pointer"
                    >
                      <LogOut size={11} />
                      <span>LOGOUT</span>
                    </button>
                  </div>
                </div>

                {/* PART 2: SELECTED LEAD DETAILS & GOOGLE CALENDAR ACTIONS */}
                <div className="flex-1 flex flex-col h-full bg-brand-bg overflow-y-auto">
                  {selectedLead ? (
                    <div className="p-6 md:p-8 space-y-8">
                      {/* Close detail section / Title banner */}
                      <div className="flex justify-between items-start border-b border-brand-dark/10 pb-5">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-brand-accent font-extrabold block mb-1">
                            LEAD RECORD CONTROL / FIRESTORE ACTIVE
                          </span>
                          <h3 className="font-serif text-2xl md:text-3xl font-black text-brand-dark leading-none">
                            {selectedLead.name}
                          </h3>
                        </div>

                        {/* Leads Actions toolbar */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDeleteLeadEntry(selectedLead.id)}
                            className="p-1 px-2.5 py-1 text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50 transition-colors font-mono text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer sharp-edge"
                            title="Delete Lead permanently"
                          >
                            <Trash2 size={12} />
                            <span>DELETE</span>
                          </button>
                        </div>
                      </div>

                      {/* Lead Details card */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-dark/5 border border-brand-dark/10 p-4 sharp-edge">
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">Email Coordinate</span>
                            <a 
                              href={`mailto:${selectedLead.email}`} 
                              className="font-sans text-xs font-bold text-brand-dark hover:text-brand-accent transition-colors flex items-center gap-1.5"
                            >
                              <Mail size={12} className="text-brand-accent" />
                              {selectedLead.email}
                            </a>
                          </div>

                          <div className="space-y-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">Captured Chronos</span>
                            <span className="font-sans text-xs text-brand-dark">
                              {new Date(selectedLead.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1.5 select-wrapper">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">Triage Status flag</span>
                            <select
                              value={selectedLead.status}
                              onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as LeadDoc['status'])}
                              className="font-mono text-[11px] py-1 px-2 bg-brand-bg border border-brand-dark/20 text-brand-dark focus:outline-none sharp-edge cursor-pointer font-bold"
                            >
                              <option value="HIGH_QUEUE_PRIORITY">HIGH_QUEUE_PRIORITY</option>
                              <option value="IN_PROGRESS">IN_PROGRESS</option>
                              <option value="ACCEPTED">ACCEPTED (SYNCED)</option>
                              <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">Owner Ref Token</span>
                            <span className="font-mono text-[10px] text-brand-muted truncate block max-w-[200px]" title={selectedLead.ownerId}>
                              {selectedLead.ownerId || 'anonymous'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Requirement Brief details */}
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">Requirement Brief and Context</span>
                        <div className="bg-brand-surface p-5 border border-brand-dark/15 font-sans text-sm text-[#27272a] leading-relaxed sharp-edge whitespace-pre-line font-light">
                          {selectedLead.message}
                        </div>
                      </div>

                      {/* Google Calendar sync and Scheduling */}
                      <div className="border-t border-brand-dark/10 pt-6 space-y-4">
                        <h4 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
                          <Calendar className="text-brand-accent" size={18} />
                          <span>Google Calendar Integration</span>
                        </h4>

                        {selectedLead.status === 'ACCEPTED' && selectedLead.scheduledTime ? (
                          /* Scheduled Meeting Details */
                          <div className="bg-green-50 border border-green-200 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sharp-edge">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="text-green-700 shrink-0 mt-0.5" size={18} />
                              <div>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-green-800 block font-bold">
                                  MEETING SYNCED ALONG LIVE STREAM
                                </span>
                                <p className="font-sans text-xs font-bold text-green-950 mt-1">
                                  Audit Slot Reserved: {new Date(selectedLead.scheduledTime).toLocaleString()}
                                </p>
                                <p className="font-sans text-[11px] text-green-800 mt-1 font-light">
                                  Automatically updated state and notified client. Calendar reference tag is set.
                                </p>
                              </div>
                            </div>

                            <a 
                              href="https://calendar.google.com" 
                              target="_blank" 
                              rel="noreferrer"
                              className="font-mono text-[10px] font-extrabold uppercase bg-green-700 text-white border border-green-800 px-4 py-2 hover:bg-green-800 transition-colors flex items-center gap-1.5 cursor-pointer sharp-edge justify-center text-center shrink-0"
                            >
                              <ExternalLink size={11} />
                              <span>VIEW MY CALENDAR</span>
                            </a>
                          </div>
                        ) : (
                          /* Book Meeting Flow */
                          <div className="border border-brand-dark/15 p-5 bg-brand-surface space-y-5 sharp-edge">
                            <div>
                              <p className="font-sans text-xs text-[#52525b] leading-relaxed">
                                Pick a slot to schedule a 30-minute free systems audit with <strong>{selectedLead.name}</strong>. Writing this path triggers a real invite created on Google Calendar.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="block font-mono text-[9px] uppercase tracking-widest text-[#71717a] font-bold">
                                  Audit Date
                                </label>
                                <input
                                  type="date"
                                  min={new Date().toISOString().split('T')[0]}
                                  value={scheduleDate}
                                  onChange={(e) => setScheduleDate(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-brand-bg border border-brand-dark/20 text-brand-dark focus:outline-none focus:border-brand-accent font-sans sharp-edge"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="block font-mono text-[9px] uppercase tracking-widest text-[#71717a] font-bold">
                                  Audit Start Time
                                </label>
                                <input
                                  type="time"
                                  value={scheduleTime}
                                  onChange={(e) => setScheduleTime(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-brand-bg border border-brand-dark/20 text-brand-dark focus:outline-none focus:border-brand-accent font-sans sharp-edge"
                                />
                              </div>
                            </div>

                            <button
                              onClick={handleCreateCalendarEvent}
                              disabled={isBooking || !scheduleDate}
                              className="w-full bg-brand-dark hover:bg-brand-accent disabled:opacity-40 text-white font-sans text-xs uppercase font-extrabold tracking-widest py-3 hover:text-brand-bg transition-all active:scale-95 sharp-edge flex justify-center items-center gap-2 cursor-pointer"
                            >
                              {isBooking ? (
                                <>
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    className="w-3.5 h-3.5 border-2 border-white border-t-transparent inline-block rounded-full"
                                  />
                                  <span>WRITING GOOGLE CALENDAR SLOT...</span>
                                </>
                              ) : (
                                <>
                                  <Video size={13} />
                                  <span>SYNC SLOT & CREATE GOOGLE CALENDAR EVENT</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Default state with Google Calendar agendas overview for active operator */
                    <div className="p-6 md:p-8 space-y-8 flex-1 flex flex-col justify-between h-full bg-brand-surface/20">
                      <div>
                        <div className="border-b border-brand-dark/10 pb-4 mb-6">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-brand-accent font-extrabold block mb-1">
                            ACTIVE SYSTEM SESSION
                          </span>
                          <h3 className="font-serif text-2xl font-bold text-brand-dark">
                            Operational Dashboard
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                          <div className="border border-brand-dark/15 p-4 bg-brand-bg sharp-edge flex items-center gap-3">
                            <Users className="text-brand-accent shrink-0" size={20} />
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted block font-extrabold">TOTAL LEADS</span>
                              <span className="font-serif text-2xl font-black">{leads.length}</span>
                            </div>
                          </div>

                          <div className="border border-brand-dark/15 p-4 bg-brand-bg sharp-edge flex items-center gap-3">
                            <Clock className="text-brand-accent shrink-0" size={20} />
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted block font-extrabold">NEW QUEUED</span>
                              <span className="font-serif text-2xl font-black text-red-700">
                                {leads.filter(l => l.status === 'HIGH_QUEUE_PRIORITY').length}
                              </span>
                            </div>
                          </div>

                          <div className="border border-brand-dark/15 p-4 bg-brand-bg sharp-edge flex items-center gap-3">
                            <CheckCircle2 className="text-brand-accent shrink-0" size={20} />
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted block font-extrabold">SYNCED CLOUD</span>
                              <span className="font-serif text-2xl font-black text-green-700">
                                {leads.filter(l => l.status === 'ACCEPTED').length}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Google Calendar Agendas list */}
                        <div className="space-y-4 pt-4 border-t border-brand-dark/10">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-serif text-base font-bold text-brand-dark flex items-center gap-2">
                              <Calendar size={16} className="text-brand-accent" />
                              <span>Live Calendar Events</span>
                            </h4>
                            <button
                              onClick={() => fetchCalendarEvents(token)}
                              disabled={isLoadingCalendar}
                              className="p-1 hover:text-brand-accent transition-colors cursor-pointer text-brand-muted hover:bg-brand-dark/5 border border-transparent hover:border-brand-dark/10"
                            >
                              <RefreshCw size={12} className={isLoadingCalendar ? 'animate-spin' : ''} />
                            </button>
                          </div>

                          {calendarError ? (
                            <div className="p-4 border border-red-200 bg-red-50 text-red-800 text-xs flex items-start gap-2.5 sharp-edge">
                              <AlertCircle size={14} className="shrink-0 mt-0.5" />
                              <p className="leading-relaxed font-sans">{calendarError}</p>
                            </div>
                          ) : isLoadingCalendar ? (
                            <div className="p-8 text-center text-xs font-mono text-brand-muted animate-pulse">
                              REFRESHING GOOGLE CALENDAR PIPELINES...
                            </div>
                          ) : calendarEvents.length === 0 ? (
                            <p className="p-8 border border-dashed border-brand-dark/15 text-center text-xs font-sans text-brand-muted sharp-edge bg-brand-surface/20">
                              No upcoming audit sessions found on primary Google Calendar starting from today.
                            </p>
                          ) : (
                            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                              {calendarEvents.map((event) => (
                                <div 
                                  key={event.id}
                                  className="p-3 bg-brand-bg border border-brand-dark/10 flex items-center justify-between gap-4 transition-colors hover:border-brand-dark/20 sharp-edge"
                                >
                                  <div className="min-w-0 flex-1">
                                    <h5 className="font-serif text-xs font-bold text-brand-dark truncate">
                                      {event.summary}
                                    </h5>
                                    <p className="font-sans text-[10px] text-brand-muted mt-1">
                                      {event.start?.dateTime 
                                        ? new Date(event.start.dateTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) 
                                        : event.start?.date 
                                          ? `All day: ${new Date(event.start.date).toLocaleDateString()}`
                                          : 'No time specified'
                                      }
                                    </p>
                                  </div>

                                  {event.htmlLink && (
                                    <a 
                                      href={event.htmlLink}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="p-1 px-2 border border-brand-dark/15 hover:border-brand-accent text-brand-muted hover:text-brand-dark transition-colors font-mono text-[9px] tracking-wider uppercase font-bold text-center shrink-0 flex items-center gap-1 sharp-edge"
                                    >
                                      <span>OPEN</span>
                                      <ExternalLink size={9} />
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-brand-dark/10 text-center font-mono text-[9px] text-brand-muted leading-relaxed">
                        SECURE SYNC TERMINAL WRITING AT EUROPE-WEST2 CORE. ZACHDEVWORK CONTROL.
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
