import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Comment, ContactSubmission, isAdmin, Newsletter, Notification, supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { Bell, Mail, MessageSquare, Send, Shield, Trash2, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [comments, setComments] = useState<Comment[]>([]);
    const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    // Notification form state
    const [notificationForm, setNotificationForm] = useState({
        title: '',
        message: '',
        type: 'info' as 'info' | 'success' | 'warning' | 'error',
        expiresIn: '7' // days
    });
    const [sending, setSending] = useState(false);
    const [testingConnection, setTestingConnection] = useState(false);

    // Test database connection and policies
    const testDatabaseConnection = async () => {
        setTestingConnection(true);
        try {
            // Test 1: Can we read from notifications table?
            const { data: readTest, error: readError } = await supabase
                .from('notifications')
                .select('count')
                .limit(1);

            if (readError) {
                throw new Error(`Read test failed: ${readError.message}`);
            }

            // Test 2: Can we insert a test notification?
            const testNotification = {
                title: 'Test Notification',
                message: 'This is a test notification to verify database access',
                type: 'info',
                created_by: user?.email || 'test@test.com',
                expires_at: new Date(Date.now() + 1000).toISOString() // Expires in 1 second
            };

            const { data: insertData, error: insertError } = await supabase
                .from('notifications')
                .insert(testNotification)
                .select();

            if (insertError) {
                throw new Error(`Insert test failed: ${insertError.message}. This likely means the RLS policies need to be updated. Run the supabase-fix-admin-policies.sql file.`);
            }

            // Clean up test notification
            if (insertData && insertData[0]) {
                await supabase
                    .from('notifications')
                    .delete()
                    .eq('id', insertData[0].id);
            }

            toast({
                title: "✓ Database Connection Test Passed!",
                description: "All database operations are working correctly. You can send notifications.",
            });

        } catch (error: any) {
            toast({
                title: "❌ Database Connection Test Failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setTestingConnection(false);
        }
    };

    useEffect(() => {
        // Check if user is admin
        if (!user || !isAdmin(user.email)) {
            toast({
                title: "Access Denied",
                description: "You don't have permission to access this page.",
                variant: "destructive",
            });
            navigate('/');
            return;
        }

        fetchAllData();
    }, [user, navigate]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            // Fetch comments
            const { data: commentsData, error: commentsError } = await supabase
                .from('comments')
                .select('*')
                .order('created_at', { ascending: false });

            if (commentsError) {
                // Comments table does not exist yet
                setComments([]);
            } else {
                setComments(commentsData || []);
            }

            // Fetch newsletters
            const { data: newslettersData, error: newslettersError } = await supabase
                .from('newsletter')
                .select('*')
                .order('created_at', { ascending: false });

            if (newslettersError) {
                // Newsletter table does not exist yet
                setNewsletters([]);
            } else {
                setNewsletters(newslettersData || []);
            }

            // Fetch notifications
            const { data: notificationsData, error: notificationsError } = await supabase
                .from('notifications')
                .select('*')
                .order('created_at', { ascending: false });

            if (notificationsError) {
                // Notifications table does not exist yet
                setNotifications([]);
            } else {
                setNotifications(notificationsData || []);
            }

            // Fetch contact submissions
            const { data: contactsData, error: contactsError } = await supabase
                .from('contact_submissions')
                .select('*')
                .order('created_at', { ascending: false });

            if (contactsError) {
                // Contact submissions table does not exist yet
                setContacts([]);
            } else {
                setContacts(contactsData || []);
            }

        } catch (error) {
            toast({
                title: "Database Error",
                description: "Failed to fetch data. Make sure all database tables are created.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSendNotification = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!notificationForm.title || !notificationForm.message) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return;
        }

        setSending(true);
        try {
            const expiresAt = notificationForm.expiresIn && notificationForm.expiresIn !== 'never'
                ? new Date(Date.now() + parseInt(notificationForm.expiresIn) * 24 * 60 * 60 * 1000).toISOString()
                : null;

            const { data, error } = await supabase
                .from('notifications')
                .insert({
                    title: notificationForm.title,
                    message: notificationForm.message,
                    type: notificationForm.type,
                    created_by: user?.email || '',
                    expires_at: expiresAt
                })
                .select();

            if (error) {
                throw new Error(error.message || 'Database error occurred');
            }

            toast({
                title: "✓ Success!",
                description: "Notification sent to all users successfully",
            });

            // Reset form
            setNotificationForm({
                title: '',
                message: '',
                type: 'info',
                expiresIn: '7'
            });

            // Refresh notifications list
            fetchAllData();
        } catch (error: any) {
            toast({
                title: "Error Sending Notification",
                description: error.message || "Failed to send notification. Make sure the database tables are created.",
                variant: "destructive",
            });
        } finally {
            setSending(false);
        }
    };

    const handleDeleteComment = async (id: string) => {
        try {
            const { error } = await supabase
                .from('comments')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast({
                title: "Success",
                description: "Comment deleted successfully",
            });

            fetchAllData();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete comment",
                variant: "destructive",
            });
        }
    };

    const handleDeleteNotification = async (id: string) => {
        try {
            const { error } = await supabase
                .from('notifications')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast({
                title: "Success",
                description: "Notification deleted successfully",
            });

            fetchAllData();
        } catch (error) {

            toast({
                title: "Error",
                description: "Failed to delete notification",
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Shield className="w-16 h-16 mx-auto mb-4 animate-pulse text-neo-cyan" />
                    <p className="text-xl font-mono">Loading Admin Panel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-20 px-2 sm:px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-4xl font-bold font-mono mb-2 flex items-center gap-2">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-neo-cyan" />
                        <span>Admin Dashboard</span>
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground">Manage comments, newsletters, contacts, and notifications</p>
                </div>

                {/* Setup Instructions Banner */}
                {(notifications.length === 0 && contacts.length === 0) && (
                    <div className="mb-6 p-4 border-2 border-neo-yellow bg-neo-yellow/10 rounded-lg">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            Database Setup Required
                        </h3>
                        <p className="text-sm mb-3">
                            To use the notification system and contact form tracking, you need to execute the SQL schema files in your Supabase dashboard:
                        </p>
                        <ol className="text-sm space-y-1 mb-3 ml-4 list-decimal">
                            <li><code className="bg-muted px-1 py-0.5 rounded">supabase-notifications.sql</code> - For notification system</li>
                            <li><code className="bg-muted px-1 py-0.5 rounded">supabase-contact.sql</code> - For contact form tracking</li>
                        </ol>
                        <p className="text-xs text-muted-foreground">
                            Go to Supabase Dashboard → SQL Editor → Copy file contents → Run
                        </p>
                    </div>
                )}

                <Tabs defaultValue="notifications" className="space-y-6">
                    <TabsList className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-5 w-full gap-2 h-auto p-2">
                        <TabsTrigger value="notifications" className="gap-2 justify-start">
                            <Bell className="w-4 h-4" />
                            <span className="hidden sm:inline">Notifications</span>
                            <span className="sm:hidden">Notify</span>
                        </TabsTrigger>
                        <TabsTrigger value="comments" className="gap-2 justify-start">
                            <MessageSquare className="w-4 h-4" />
                            <span>Comments ({comments.length})</span>
                        </TabsTrigger>
                        <TabsTrigger value="newsletters" className="gap-2 justify-start">
                            <Mail className="w-4 h-4" />
                            <span className="hidden sm:inline">Newsletters ({newsletters.length})</span>
                            <span className="sm:hidden">News ({newsletters.length})</span>
                        </TabsTrigger>
                        <TabsTrigger value="contacts" className="gap-2 justify-start">
                            <UserRound className="w-4 h-4" />
                            <span>Contacts ({contacts.length})</span>
                        </TabsTrigger>
                        <TabsTrigger value="send" className="gap-2 justify-start">
                            <Send className="w-4 h-4" />
                            <span className="hidden sm:inline">Send Notification</span>
                            <span className="sm:hidden">Send</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Send Notification Tab */}
                    <TabsContent value="send">
                        <Card className="border-2 border-border shadow-hard">
                            <CardHeader>
                                <CardTitle>Send Notification to All Users</CardTitle>
                                <CardDescription>
                                    Create a new notification that will be displayed to all users in the notification bell
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Test Connection Button */}
                                <div className="mb-6 p-4 border-2 border-neo-cyan bg-neo-cyan/10 rounded-lg">
                                    <h3 className="font-bold mb-2 flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        Troubleshooting
                                    </h3>
                                    <p className="text-sm mb-3 text-muted-foreground">
                                        If the send button isn't working, click below to test your database connection and RLS policies:
                                    </p>
                                    <Button
                                        type="button"
                                        onClick={testDatabaseConnection}
                                        disabled={testingConnection}
                                        variant="outline"
                                        className="w-full border-2"
                                    >
                                        {testingConnection ? 'Testing Connection...' : '🔍 Test Database Connection'}
                                    </Button>
                                    <p className="text-xs mt-2 text-muted-foreground">
                                        💡 If test fails, run <code className="bg-muted px-1 rounded">supabase-fix-admin-policies.sql</code> in Supabase SQL Editor
                                    </p>
                                </div>

                                <form onSubmit={handleSendNotification} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            value={notificationForm.title}
                                            onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                                            placeholder="Enter notification title"
                                            className="border-2"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            value={notificationForm.message}
                                            onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                                            placeholder="Enter notification message"
                                            className="border-2 min-h-[100px]"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Type</Label>
                                            <Select
                                                value={notificationForm.type}
                                                onValueChange={(value: any) => setNotificationForm({ ...notificationForm, type: value })}
                                            >
                                                <SelectTrigger className="border-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="info">Info</SelectItem>
                                                    <SelectItem value="success">Success</SelectItem>
                                                    <SelectItem value="warning">Warning</SelectItem>
                                                    <SelectItem value="error">Error</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="expires">Expires In</Label>
                                            <Select
                                                value={notificationForm.expiresIn}
                                                onValueChange={(value) => setNotificationForm({ ...notificationForm, expiresIn: value })}
                                            >
                                                <SelectTrigger className="border-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1 Day</SelectItem>
                                                    <SelectItem value="3">3 Days</SelectItem>
                                                    <SelectItem value="7">7 Days</SelectItem>
                                                    <SelectItem value="14">14 Days</SelectItem>
                                                    <SelectItem value="30">30 Days</SelectItem>
                                                    <SelectItem value="never">Never</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={sending} className="w-full">
                                        {sending ? 'Sending...' : 'Send Notification'}
                                        <Send className="ml-2 w-4 h-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications History Tab */}
                    <TabsContent value="notifications">
                        <Card className="border-2 border-border shadow-hard">
                            <CardHeader>
                                <CardTitle>Notification History</CardTitle>
                                <CardDescription>View and manage all sent notifications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {notifications.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">No notifications sent yet</p>
                                ) : (
                                    <div className="space-y-4">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="border-2 border-border p-4 rounded-lg hover:shadow-hard transition-shadow"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Badge variant={
                                                                notification.type === 'success' ? 'default' :
                                                                    notification.type === 'error' ? 'destructive' :
                                                                        notification.type === 'warning' ? 'outline' : 'secondary'
                                                            }>
                                                                {notification.type}
                                                            </Badge>
                                                            <h3 className="font-semibold">{notification.title}</h3>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                                                        <div className="text-xs text-muted-foreground">
                                                            <p>Created: {format(new Date(notification.created_at), 'PPp')}</p>
                                                            {notification.expires_at && (
                                                                <p>Expires: {format(new Date(notification.expires_at), 'PPp')}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="text-destructive">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete Notification</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This will remove the notification for all users. This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteNotification(notification.id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Comments Tab */}
                    <TabsContent value="comments">
                        <Card className="border-2 border-border shadow-hard">
                            <CardHeader>
                                <CardTitle>All Comments</CardTitle>
                                <CardDescription>Manage user comments from the website</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {comments.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">No comments yet</p>
                                ) : (
                                    <div className="space-y-4">
                                        {comments.map((comment) => (
                                            <div
                                                key={comment.id}
                                                className="border-2 border-border p-4 rounded-lg hover:shadow-hard transition-shadow"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="font-semibold">{comment.user_name || 'Anonymous'}</span>
                                                            <span className="text-xs text-muted-foreground">
                                                                {format(new Date(comment.created_at), 'PPp')}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm">{comment.text}</p>
                                                        {comment.user_id && (
                                                            <p className="text-xs text-muted-foreground mt-1">User ID: {comment.user_id}</p>
                                                        )}
                                                    </div>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="text-destructive">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This will permanently delete this comment. This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteComment(comment.id)}>
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Newsletters Tab */}
                    <TabsContent value="newsletters">
                        <Card className="border-2 border-border shadow-hard">
                            <CardHeader>
                                <CardTitle>Newsletter Subscribers</CardTitle>
                                <CardDescription>All newsletter subscriptions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {newsletters.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">No newsletter subscribers yet</p>
                                ) : (
                                    <div className="space-y-2">
                                        {newsletters.map((newsletter) => (
                                            <div
                                                key={newsletter.id}
                                                className="border-2 border-border p-3 rounded-lg hover:shadow-hard transition-shadow flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="font-mono">{newsletter.email}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Subscribed: {format(new Date(newsletter.created_at), 'PPp')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Contacts Tab */}
                    <TabsContent value="contacts">
                        <Card className="border-2 border-border shadow-hard">
                            <CardHeader>
                                <CardTitle>Contact Form Submissions</CardTitle>
                                <CardDescription>All contact form messages from users</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {contacts.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">No contact submissions yet</p>
                                ) : (
                                    <div className="space-y-4">
                                        {contacts.map((contact) => (
                                            <div
                                                key={contact.id}
                                                className="border-2 border-border p-4 rounded-lg hover:shadow-hard transition-shadow"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                                                        <a href={`mailto:${contact.email}`} className="text-neo-cyan hover:underline text-sm">
                                                            {contact.email}
                                                        </a>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {format(new Date(contact.created_at), 'PPp')}
                                                    </span>
                                                </div>
                                                <p className="text-sm bg-muted p-3 rounded border border-border">
                                                    {contact.message}
                                                </p>
                                                {contact.user_id && (
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        User ID: {contact.user_id}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Admin;
