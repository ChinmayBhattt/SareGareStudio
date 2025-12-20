
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { toast } from 'react-hot-toast'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for changes on auth state (sing in, sign out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const signUp = async (email, password, options = {}) => {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options
        })
        setLoading(false)
        if (error) {
            toast.error(error.message)
            throw error
        }
        return data
    }

    const signIn = async (email, password) => {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        setLoading(false)
        if (error) {
            toast.error(error.message)
            throw error
        }
        return data
    }

    const signInWithGoogle = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/account`,
            }
        });
        setLoading(false);
        if (error) {
            toast.error(error.message);
            throw error;
        }
        return data;
    }

    const signOut = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signOut()
        if (error) {
            toast.error(error.message)
        }
        setUser(null)
        setSession(null)
        setLoading(false)
    }

    const updateProfile = async (updates) => {
        try {
            const { error } = await supabase.from('profiles').upsert(updates)
            if (error) {
                throw error
            }
            toast.success('Profile updated successfully!')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        updateProfile,
        user,
        session,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
