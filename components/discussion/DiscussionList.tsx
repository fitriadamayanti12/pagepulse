import DiscussionCard from './DiscussionCard';

interface Topic {
  id: string;
  title: string;
  book_title: string;
  content: string;
  views_count: number;
  replies_count: number;
  created_at: string;
  user_id: string;
  user_email?: string;
  username?: string;
}

interface DiscussionListProps {
  topics: Topic[];
  sortBy: string;
  formatDate: (d: string) => string;
  currentUserId: string | null;
  onEdit: (topic: Topic) => void;
  onDelete: (id: string) => void;
}

export default function DiscussionList({ topics, sortBy, formatDate, currentUserId, onEdit, onDelete }: DiscussionListProps) {
  if (topics.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      {topics.map((topic, index) => (
        <DiscussionCard 
          key={topic.id} 
          topic={topic} 
          index={index} 
          sortBy={sortBy} 
          formatDate={formatDate}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}