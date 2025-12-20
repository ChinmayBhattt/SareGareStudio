
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { User, Mail, Globe, Lock, LogOut, Trash2, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user) {
            getProfile();
        }
    }, [user]);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, full_name, website, avatar_url`)
                .eq('id', user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username || '');
                setFullName(data.full_name || '');
                setWebsite(data.website || '');
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            toast.error('Error loading user data!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async () => {
        try {
            setUpdating(true);
            const updates = {
                id: user.id,
                username,
                full_name: fullName,
                website,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUpdating(false);
        }
    };

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            return url
        } catch (error) {
            console.log('Error downloading image: ', error.message)
            return null
        }
    }

    // We need to fetch the actual image URL if it's stored as a path
    const [avatarSrc, setAvatarSrc] = useState(null)

    useEffect(() => {
        if (avatarUrl) {
            // If it starts with http, it's a full URL (e.g. from a social provider or just hardcoded)
            // Otherwise assume it's a path in the avatars bucket
            if (avatarUrl.startsWith('http')) {
                setAvatarSrc(avatarUrl)
            } else {
                downloadImage(avatarUrl).then(url => setAvatarSrc(url))
            }
        } else {
            setAvatarSrc(null)
        }
    }, [avatarUrl])


    const uploadAvatar = async (event) => {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const updates = {
                id: user.id,
                avatar_url: filePath,
                updated_at: new Date(),
            };

            const { error: updateError } = await supabase.from('profiles').upsert(updates);

            if (updateError) {
                throw updateError;
            }

            setAvatarUrl(filePath)
            toast.success('Avatar updated!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-purple border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[100px] -z-10"></div>

            <div className="container mx-auto max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Sidebar / Profile Card */}
                    <div className="md:col-span-1">
                        <div className="glass rounded-xl p-6 text-center transform transition-all hover:scale-[1.02]">
                            <div className="relative w-32 h-32 mx-auto mb-4 group">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-purple/30 group-hover:border-brand-purple transition-all">
                                    {avatarSrc ? (
                                        <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-400">
                                            <User size={48} />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 p-2 bg-brand-purple rounded-full cursor-pointer hover:bg-brand-blue transition-colors shadow-lg">
                                    <Camera size={16} className="text-white" />
                                    <input
                                        type="file"
                                        id="single"
                                        accept="image/*"
                                        onChange={uploadAvatar}
                                        disabled={uploading}
                                        className="hidden"
                                    />
                                </label>
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    </div>
                                )}
                            </div>

                            <h2 className="text-xl font-bold text-white mb-1">{fullName || 'User'}</h2>
                            <p className="text-brand-purple text-sm mb-6">@{username || user.email.split('@')[0]}</p>

                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Profile Details */}
                        <div className="glass rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <User className="text-brand-purple" />
                                Profile Details
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Full Name</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-400 mb-2 text-sm">Username</label>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 mb-2 text-sm">Website</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                            <input
                                                type="text"
                                                value={website}
                                                onChange={(e) => setWebsite(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-brand-purple focus:outline-none"
                                                placeholder="https://"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={updateProfile}
                                    disabled={updating}
                                    className="px-6 py-2 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-lg transition-colors mt-4 disabled:opacity-50"
                                >
                                    {updating ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="glass rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Lock className="text-brand-purple" />
                                Account Settings
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                        <input
                                            type="email"
                                            value={user.email}
                                            disabled
                                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-gray-400 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed directly for security reasons.</p>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                                        <Trash2 size={18} />
                                        Danger Zone
                                    </h4>
                                    <button
                                        onClick={() => confirm('Are you sure you want to delete your account? This action cannot be undone.') && toast.error('This feature is currently disabled for safety.')}
                                        className="text-red-400 text-sm hover:text-red-300 transition-colors"
                                    >
                                        Delete my account permanently
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
