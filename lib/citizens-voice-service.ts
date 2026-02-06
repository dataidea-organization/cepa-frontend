const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/"

// Feedback
export interface FeedbackSubmission {
  name: string;
  email: string;
  message: string;
}

export interface FeedbackSubmissionResponse {
  success: boolean;
  message: string;
  id?: number;
}

export async function submitFeedback(
  data: FeedbackSubmission
): Promise<FeedbackSubmissionResponse> {
  const response = await fetch(`${API_BASE}/contact/feedback/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      (error as { message?: string }).message ||
        (error as { detail?: string }).detail ||
        "Failed to submit feedback"
    );
  }
  return response.json();
}

// Citizens Voice feedback links (admin-configured form URLs)
export interface CitizensVoiceFeedbackLinks {
  ask_mp_form_url: string;
  comment_bill_form_url: string;
  feedback_law_form_url: string;
}

export async function fetchCitizensVoiceFeedbackLinks(): Promise<CitizensVoiceFeedbackLinks | null> {
  try {
    const response = await fetch(`${API_BASE}/settings/citizens-voice-feedback/`);
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

// Page hero image
export interface PageHeroImage {
  id: number;
  page_slug: string;
  image: string;
  alt_text: string;
  is_active: boolean;
}

export async function fetchPageHeroImage(
  pageSlug: string
): Promise<PageHeroImage | null> {
  try {
    const response = await fetch(
      `${API_BASE}/settings/page-hero-images/${pageSlug}/`
    );
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

// Polls
export interface PollOption {
  id: number;
  text: string;
  order: number;
  vote_count: number;
  vote_percentage: number;
  created_at: string;
}

export interface Poll {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "draft" | "active" | "closed";
  status_display: string;
  start_date: string | null;
  end_date: string | null;
  allow_multiple_votes: boolean;
  show_results_before_voting: boolean;
  featured: boolean;
  options: PollOption[];
  total_votes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PollResults {
  poll_id: number;
  poll_title: string;
  total_votes: number;
  results: {
    option_id: number;
    text: string;
    vote_count: number;
    percentage: number;
  }[];
}

export async function fetchPolls(
  page: number = 1,
  pageSize: number = 100
): Promise<{ results: Poll[]; next: string | null }> {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  });
  const response = await fetch(`${API_BASE}/multimedia/polls/?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch polls");
  return response.json();
}

export async function voteOnPoll(
  pollId: number,
  optionId: number
): Promise<unknown> {
  const response = await fetch(
    `${API_BASE}/multimedia/polls/${pollId}/vote/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      body: JSON.stringify({ option_id: optionId }),
    }
  );
  if (!response.ok) {
    let message = "Failed to submit vote";
    try {
      const error = await response.json();
      message =
        (error as { error?: string }).error ??
        (error as { detail?: string }).detail ??
        message;
    } catch {
      message =
        response.status === 403
          ? "Session expired or permission denied. Try refreshing."
          : message;
    }
    throw new Error(message);
  }
  return response.json();
}

export async function fetchPollResults(pollId: number): Promise<PollResults> {
  const response = await fetch(
    `${API_BASE}/multimedia/polls/${pollId}/results/`
  );
  if (!response.ok) throw new Error("Failed to fetch poll results");
  return response.json();
}

// X Poll Embeds
export interface XPollEmbed {
  id: number;
  title: string;
  embed_html: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export async function fetchXPollEmbeds(): Promise<XPollEmbed[]> {
  const response = await fetch(`${API_BASE}/multimedia/x-poll-embeds/`);
  if (!response.ok) throw new Error("Failed to fetch X poll embeds");
  const data = await response.json();
  return Array.isArray(data) ? data : data.results ?? [];
}

// Trivia
export interface TriviaOption {
  id: number;
  text: string;
  is_correct: boolean;
  order: number;
  created_at: string;
}

export interface TriviaQuestion {
  id: number;
  question_text: string;
  answer_text: string;
  options: TriviaOption[];
  order: number;
  created_at: string;
}

export interface Trivia {
  id: number;
  title: string;
  description: string;
  image: string | null;
  order: number;
  question_count?: number;
  questions?: TriviaQuestion[];
  created_at: string;
  updated_at: string;
}

export async function fetchTrivias(): Promise<Trivia[]> {
  const response = await fetch(`${API_BASE}/multimedia/trivia/`);
  if (!response.ok) throw new Error("Failed to fetch trivia");
  const data = await response.json();
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function fetchTrivia(id: string): Promise<Trivia> {
  const response = await fetch(`${API_BASE}/multimedia/trivia/${id}/`);
  if (!response.ok) throw new Error("Failed to fetch trivia");
  return response.json();
}
