import { useAuth } from "@/contexts/AuthContext";
import { isAdmin } from "@/lib/supabase";
import { Calendar, LogOut, Mail, Shield, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface ProfileDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onSignOut: () => void;
}

const ProfileDropdown = ({ isOpen, onClose, onSignOut }: ProfileDropdownProps) => {
    const { user } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !user) return null;

    const joinDate = user.metadata.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
        : 'Unknown';

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-80 bg-background border-4 border-foreground shadow-hard z-50"
        >
            {/* Header */}
            <div className="bg-neo-green border-b-4 border-foreground p-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-foreground overflow-hidden bg-neo-blue">
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || "User"}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User size={24} />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-black text-sm truncate">
                            {user.displayName || "User"}
                        </p>
                        <p className="font-mono text-xs text-foreground/70 truncate">
                            ID: {user.uid.slice(0, 8)}...
                        </p>
                    </div>
                </div>
            </div>

            {/* User Details */}
            <div className="p-4 space-y-3 bg-card border-b-4 border-foreground">
                <div className="flex items-start gap-3">
                    <Mail size={16} className="mt-1 shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs font-bold mb-1">EMAIL</p>
                        <p className="font-mono text-xs break-all">{user.email}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <User size={16} className="mt-1 shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs font-bold mb-1">DISPLAY NAME</p>
                        <p className="font-mono text-xs">{user.displayName || "Not set"}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Calendar size={16} className="mt-1 shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs font-bold mb-1">JOINED</p>
                        <p className="font-mono text-xs">{joinDate}</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="p-3 space-y-2">
                {isAdmin(user.email) && (
                    <Link
                        to="/admin"
                        onClick={onClose}
                        className="neo-btn w-full bg-neo-red text-foreground border-2 border-foreground px-4 py-2 text-sm shadow-hard hover:bg-neo-yellow hover:text-foreground flex items-center justify-center gap-2 font-bold"
                    >
                        <Shield size={16} />
                        ADMIN PANEL
                    </Link>
                )}

                <Link
                    to="/projects"
                    onClick={onClose}
                    className="neo-btn w-full bg-neo-cyan text-foreground border-2 border-foreground px-4 py-2 text-sm shadow-hard hover:bg-foreground hover:text-background flex items-center justify-center gap-2 font-bold"
                >
                    VIEW ALL PROJECTS
                </Link>

                <button
                    onClick={onSignOut}
                    className="neo-btn w-full bg-neo-red text-foreground border-2 border-foreground px-4 py-2 text-sm shadow-hard hover:bg-foreground hover:text-background flex items-center justify-center gap-2 font-bold"
                >
                    <LogOut size={16} />
                    SIGN OUT
                </button>
            </div>

            {/* Footer */}
            <div className="bg-foreground text-neo-green font-mono text-xs p-2 border-t-2 border-foreground">
                <p>🔒 Session Active</p>
            </div>
        </div>
    );
};

export default ProfileDropdown;
