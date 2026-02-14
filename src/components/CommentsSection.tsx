import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Comment, supabase } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

const MAX_COMMENT_LENGTH = 300;

export function CommentsSection() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // Fetch comments on mount
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            setIsFetching(true);
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setComments(data || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
            toast({
                title: 'Error',
                description: 'Failed to load comments. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsFetching(false);
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!commentText.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Comment cannot be empty.',
                variant: 'destructive',
            });
            return;
        }

        if (commentText.length > MAX_COMMENT_LENGTH) {
            toast({
                title: 'Validation Error',
                description: `Comment must be ${MAX_COMMENT_LENGTH} characters or less.`,
                variant: 'destructive',
            });
            return;
        }

        try {
            setIsLoading(true);

            const commentData = {
                text: commentText.trim(),
                user_id: user?.uid || null,
                user_name: user?.displayName || 'Anonymous',
            };

            const { data, error } = await supabase
                .from('comments')
                .insert([commentData])
                .select()
                .single();

            if (error) throw error;

            // Add the new comment to the top of the list
            setComments([data, ...comments]);
            setCommentText('');

            toast({
                title: 'Success',
                description: 'Your comment has been posted!',
            });
        } catch (error) {
            console.error('Error posting comment:', error);
            toast({
                title: 'Error',
                description: 'Failed to post comment. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_COMMENT_LENGTH) {
            setCommentText(value);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Comment Form */}
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmitComment} className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Leave a Comment
                                </h3>
                                <span className="text-sm text-muted-foreground">
                                    {user ? `Commenting as ${user.displayName}` : 'Commenting as Anonymous'}
                                </span>
                            </div>
                            <Textarea
                                placeholder="Share your thoughts..."
                                value={commentText}
                                onChange={handleTextChange}
                                className="min-h-[100px] resize-none"
                                disabled={isLoading}
                            />
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span className={commentText.length > MAX_COMMENT_LENGTH ? 'text-destructive' : ''}>
                                    {commentText.length} / {MAX_COMMENT_LENGTH}
                                </span>
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading || !commentText.trim()}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                'Post Comment'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                    Comments ({comments.length})
                </h3>

                {isFetching ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : comments.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6 text-center text-muted-foreground">
                            No comments yet. Be the first to comment!
                        </CardContent>
                    </Card>
                ) : (
                    comments.map((comment) => (
                        <Card key={comment.id}>
                            <CardContent className="pt-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">
                                            {comment.user_name || 'Anonymous'}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {formatDistanceToNow(new Date(comment.created_at), {
                                                addSuffix: true,
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground whitespace-pre-wrap break-words">
                                        {comment.text}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
