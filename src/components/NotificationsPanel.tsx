import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { Notification, supabase, UserNotification } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, AlertTriangle, Bell, CheckCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NotificationsPanelProps {
    onClose: () => void;
}

const NotificationsPanel = ({ onClose }: NotificationsPanelProps) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [userNotificationStatus, setUserNotificationStatus] = useState<Map<string, UserNotification>>(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, [user]);

    const fetchNotifications = async () => {
        try {
            // Fetch all active notifications
            const { data: notificationsData, error: notificationsError } = await supabase
                .from('notifications')
                .select('*')
                .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
                .order('created_at', { ascending: false });

            if (notificationsError) throw notificationsError;
            setNotifications(notificationsData || []);

            // If user is logged in, fetch their read status
            if (user?.email) {
                const { data: userNotificationsData, error: userNotificationsError } = await supabase
                    .from('user_notifications')
                    .select('*')
                    .eq('user_email', user.email);

                if (userNotificationsError) throw userNotificationsError;

                const statusMap = new Map<string, UserNotification>();
                userNotificationsData?.forEach((un) => {
                    statusMap.set(un.notification_id, un);
                });
                setUserNotificationStatus(statusMap);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId: string) => {
        if (!user?.email) return;

        try {
            const existingStatus = userNotificationStatus.get(notificationId);

            if (existingStatus) {
                // Update existing record
                const { error } = await supabase
                    .from('user_notifications')
                    .update({
                        is_read: true,
                        read_at: new Date().toISOString()
                    })
                    .eq('id', existingStatus.id);

                if (error) throw error;
            } else {
                // Insert new record
                const { error } = await supabase
                    .from('user_notifications')
                    .insert({
                        notification_id: notificationId,
                        user_email: user.email,
                        is_read: true,
                        read_at: new Date().toISOString()
                    });

                if (error) throw error;
            }

            // Refresh notifications
            fetchNotifications();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        if (!user?.email) return;

        try {
            for (const notification of notifications) {
                await markAsRead(notification.id);
            }
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Info className="w-5 h-5 text-neo-cyan" />;
        }
    };

    const unreadCount = notifications.filter(
        (n) => !userNotificationStatus.get(n.id)?.is_read
    ).length;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l-2 border-border shadow-hard animate-in slide-in-from-right"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b-2 border-border">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Bell className="w-5 h-5" />
                                <h2 className="text-xl font-bold font-mono">Notifications</h2>
                                {unreadCount > 0 && (
                                    <Badge variant="destructive" className="ml-2">
                                        {unreadCount}
                                    </Badge>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="hover:bg-muted"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        {unreadCount > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={markAllAsRead}
                                className="w-full"
                            >
                                Mark All as Read
                            </Button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <ScrollArea className="flex-1">
                        {loading ? (
                            <div className="p-8 text-center">
                                <div className="animate-pulse">
                                    <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                    <p className="text-muted-foreground">Loading notifications...</p>
                                </div>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center">
                                <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-muted-foreground">No notifications yet</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    You'll see important updates here
                                </p>
                            </div>
                        ) : (
                            <div className="p-4 space-y-3">
                                {notifications.map((notification) => {
                                    const isRead = userNotificationStatus.get(notification.id)?.is_read || false;

                                    return (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-2 border-border rounded-lg cursor-pointer transition-all hover:shadow-hard ${isRead ? 'bg-muted/50' : 'bg-background'
                                                }`}
                                            onClick={() => !isRead && markAsRead(notification.id)}
                                        >
                                            <div className="flex items-start gap-3">
                                                {getIcon(notification.type)}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-1">
                                                        <h3 className={`font-semibold text-sm ${!isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                            {notification.title}
                                                        </h3>
                                                        {!isRead && (
                                                            <div className="w-2 h-2 rounded-full bg-neo-cyan flex-shrink-0 mt-1" />
                                                        )}
                                                    </div>
                                                    <p className={`text-sm ${!isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPanel;
