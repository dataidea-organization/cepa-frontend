'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Send,
  AlertCircle,
  User,
  FileText,
  Scale,
  Share2,
  ExternalLink,
  TrendingUp,
  CheckCircle,
  Users,
  BarChart3,
  Vote,
  HelpCircle,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  submitFeedback,
  type FeedbackSubmission,
  fetchCitizensVoiceFeedbackLinks,
  type CitizensVoiceFeedbackLinks,
} from '@/lib/citizens-voice-service';
import CitizensVoiceHero from '@/components/CitizensVoiceHero';

const MAROON = '#800020';

export default function CitizensVoicePage() {
  const [feedbackForm, setFeedbackForm] = useState<FeedbackSubmission>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [feedbackLinks, setFeedbackLinks] = useState<CitizensVoiceFeedbackLinks | null>(null);

  useEffect(() => {
    fetchCitizensVoiceFeedbackLinks().then(setFeedbackLinks);
  }, []);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !feedbackForm.name.trim() ||
      !feedbackForm.email.trim() ||
      !feedbackForm.message.trim()
    ) {
      setFeedbackStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }
    try {
      setIsSubmittingFeedback(true);
      setFeedbackStatus({ type: null, message: '' });
      await submitFeedback(feedbackForm);
      setFeedbackStatus({
        type: 'success',
        message: 'Thank you for your feedback! We appreciate your input.',
      });
      setFeedbackForm({ name: '', email: '', message: '' });
    } catch (err) {
      setFeedbackStatus({
        type: 'error',
        message:
          err instanceof Error ? err.message : 'Failed to submit feedback. Please try again.',
      });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <main className="relative">
        <CitizensVoiceHero
          title="Engage"
          subtitle="Share your feedback on parliamentary matters and governance issues."
          badge="Your voice matters"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-8">
          {/* Quick links to Polls & Trivia - alternating bg */}
          <section className="mb-10 bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Participate</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/citizens-voice/polls"
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg hover:border-[#800020]/30 flex flex-col group"
              >
                <div
                  className="p-2.5 rounded-lg w-fit mb-4"
                  style={{ backgroundColor: `${MAROON}18` }}
                >
                  <Vote className="w-6 h-6" style={{ color: MAROON }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Polls</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  X (Twitter) polls and platform polls. Have your say on parliamentary and governance issues.
                </p>
                <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: MAROON }}>
                  View polls <ExternalLink className="w-4 h-4" />
                </span>
              </Link>
              <Link
                href="/citizens-voice/trivia"
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg hover:border-[#800020]/30 flex flex-col group"
              >
                <div
                  className="p-2.5 rounded-lg w-fit mb-4"
                  style={{ backgroundColor: `${MAROON}18` }}
                >
                  <HelpCircle className="w-6 h-6" style={{ color: MAROON }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Trivia</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  Test your knowledge with our trivia quizzes on parliamentary and governance topics.
                </p>
                <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: MAROON }}>
                  Play trivia <ExternalLink className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </section>

          {/* Ways to engage - alternating bg */}
          <section id="ways-to-engage" className="mb-10 scroll-mt-6 bg-[#fafaf8] rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ways to engage</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a
                href={feedbackLinks?.ask_mp_form_url || '#'}
                target={feedbackLinks?.ask_mp_form_url ? '_blank' : undefined}
                rel={feedbackLinks?.ask_mp_form_url ? 'noopener noreferrer' : undefined}
                className={`rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg hover:border-[#800020]/30 flex flex-col ${
                  !feedbackLinks?.ask_mp_form_url ? 'pointer-events-none opacity-70' : ''
                }`}
              >
                <div className="p-2.5 rounded-lg w-fit mb-4" style={{ backgroundColor: `${MAROON}18` }}>
                  <User className="w-6 h-6" style={{ color: MAROON }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ask your MP</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  Send a question or message to your Member of Parliament.
                </p>
                {feedbackLinks?.ask_mp_form_url ? (
                  <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: MAROON }}>
                    Open form <ExternalLink className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">Link not configured</span>
                )}
              </a>

              <a
                href={feedbackLinks?.comment_bill_form_url || '#'}
                target={feedbackLinks?.comment_bill_form_url ? '_blank' : undefined}
                rel={feedbackLinks?.comment_bill_form_url ? 'noopener noreferrer' : undefined}
                className={`rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg hover:border-[#800020]/30 flex flex-col ${
                  !feedbackLinks?.comment_bill_form_url ? 'pointer-events-none opacity-70' : ''
                }`}
              >
                <div className="p-2.5 rounded-lg w-fit mb-4" style={{ backgroundColor: `${MAROON}18` }}>
                  <FileText className="w-6 h-6" style={{ color: MAROON }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comment on a bill</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  Share your views on legislation currently before Parliament.
                </p>
                {feedbackLinks?.comment_bill_form_url ? (
                  <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: MAROON }}>
                    Open form <ExternalLink className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">Link not configured</span>
                )}
              </a>

              <a
                href={feedbackLinks?.feedback_law_form_url || '#'}
                target={feedbackLinks?.feedback_law_form_url ? '_blank' : undefined}
                rel={feedbackLinks?.feedback_law_form_url ? 'noopener noreferrer' : undefined}
                className={`rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg hover:border-[#800020]/30 flex flex-col ${
                  !feedbackLinks?.feedback_law_form_url ? 'pointer-events-none opacity-70' : ''
                }`}
              >
                <div className="p-2.5 rounded-lg w-fit mb-4" style={{ backgroundColor: `${MAROON}18` }}>
                  <Scale className="w-6 h-6" style={{ color: MAROON }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback on a law</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  Tell us your experience or views on existing laws and their impact.
                </p>
                {feedbackLinks?.feedback_law_form_url ? (
                  <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: MAROON }}>
                    Open form <ExternalLink className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">Link not configured</span>
                )}
              </a>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md flex flex-col">
                <div className="p-2.5 rounded-lg w-fit mb-4" style={{ backgroundColor: `${MAROON}18` }}>
                  <Share2 className="w-6 h-6" style={{ color: MAROON }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Find us on social media</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  Follow us for updates, discussions, and more ways to engage.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://www.facebook.com/cepaug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#f5f0e8] rounded-lg text-gray-700 hover:bg-[#800020] hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/cepaug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#f5f0e8] rounded-lg text-gray-700 hover:bg-[#800020] hover:text-white transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/cepa-ug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#f5f0e8] rounded-lg text-gray-700 hover:bg-[#800020] hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Feedback form - alternating bg */}
          <section
            id="feedback"
            className="mt-8 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden scroll-mt-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              <div className="lg:col-span-2 p-6 lg:p-8 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg text-white" style={{ backgroundColor: MAROON }}>
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Share Your Feedback</h3>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  Help us improve by sharing your thoughts and suggestions
                </p>

                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  {feedbackStatus.type && (
                    <div
                      className={`p-3 rounded-md flex items-start gap-3 ${
                        feedbackStatus.type === 'success'
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      {feedbackStatus.type === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      )}
                      <p
                        className={`text-sm ${
                          feedbackStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                        }`}
                      >
                        {feedbackStatus.message}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="feedback-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="feedback-name"
                        type="text"
                        required
                        value={feedbackForm.name}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                        disabled={isSubmittingFeedback}
                        className="w-full border-gray-300 focus-visible:ring-[#800020]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="feedback-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="feedback-email"
                        type="email"
                        required
                        value={feedbackForm.email}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                        disabled={isSubmittingFeedback}
                        className="w-full border-gray-300 focus-visible:ring-[#800020]"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="feedback-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="feedback-message"
                      required
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                      disabled={isSubmittingFeedback}
                      rows={4}
                      className="w-full border-gray-300 focus-visible:ring-[#800020] resize-none"
                      placeholder="Share your feedback, suggestions, or concerns..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmittingFeedback}
                    className="rounded-md font-medium px-6 text-white hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: MAROON }}
                  >
                    {isSubmittingFeedback ? (
                      <>
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </form>
              </div>

              <div className="bg-gradient-to-br from-[#fafaf8] to-[#f5f0e8] p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" style={{ color: MAROON }} />
                      Why Your Feedback Matters
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Your input helps us enhance the platform and better serve the community&apos;s needs.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full mt-0.5 text-white" style={{ backgroundColor: MAROON }}>
                        <CheckCircle className="w-3 h-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Quick Response</p>
                        <p className="text-xs text-gray-600">We review all feedback regularly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full mt-0.5 text-white" style={{ backgroundColor: MAROON }}>
                        <Users className="w-3 h-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Community Driven</p>
                        <p className="text-xs text-gray-600">Your voice shapes our improvements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full mt-0.5 text-white" style={{ backgroundColor: MAROON }}>
                        <MessageSquare className="w-3 h-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Open Communication</p>
                        <p className="text-xs text-gray-600">We value every suggestion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About - alternating bg */}
          <section
            id="about"
            className="mt-8 relative bg-[#fafaf8] rounded-xl shadow-md border border-gray-200 p-6 overflow-hidden scroll-mt-6"
          >
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About Citizens Voice</h3>
              <p className="text-gray-600 text-sm mb-3">
                Citizens Voice is a platform for democratic engagement where you can participate in polls on various
                parliamentary and governance topics. Your opinions matter and help shape public discourse.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 mt-0.5" style={{ color: MAROON }} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Real-time Results</h4>
                    <p className="text-gray-600 text-xs">See how others are voting as results update in real-time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 mt-0.5" style={{ color: MAROON }} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Your Voice Matters</h4>
                    <p className="text-gray-600 text-xs">Participate in polls on important governance and policy issues</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 mt-0.5" style={{ color: MAROON }} />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Transparent Process</h4>
                    <p className="text-gray-600 text-xs">View detailed results and statistics for all polls</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
