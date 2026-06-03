import DiscussionCard from './DiscussionCard';

interface Topic {
  id: string;
  title: string;
  book_title: string;
  content: string;
  views_count: number;
  replies_count: number;
  created_at: string;
  user_email?: string;
}

interface DiscussionListProps {
  topics: Topic[];
  sortBy: string;
  formatDate: (d: string) => string;
}

export default function DiscussionList({ topics, sortBy, formatDate }: DiscussionListProps) {
  if (topics.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      {topics.map((topic, index) => (
        <DiscussionCard key={topic.id} topic={topic} index={index} sortBy={sortBy} formatDate={formatDate} />
      ))}
    </div>
  );
}