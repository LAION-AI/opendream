import { debounce, leading, throttle } from '@solid-primitives/scheduled';
import { User } from '@supabase/supabase-js';
import { Link, useNavigate } from 'solid-app-router';

import { Component, createEffect, JSX, onCleanup, Show } from 'solid-js';
import { createOnAuthStateChange, createSupabaseAuth } from '../contexts/supabase';
import { atom } from 'solid-use';
import HashAvatar from './avatar';




const DropdownAvatar: Component<{}> = (props) => {
    const auth = createSupabaseAuth();
    const user = atom<User | null | undefined>(null)
    const dropdown = atom(false)

    createOnAuthStateChange((event, session) => {
        if (event == 'SIGNED_OUT') {
            user(null)
        }
        else {
            user(session?.user)
        }
    })

    function onKeyDown(event) {
        if (event.key === 'Escape' || event.key === 'Tab') {
            dropdown(false);
        }
    }

    const closeTimeout = atom(true)
    const closeTimeoutSecondary = atom(true)

    window.addEventListener('keydown', onKeyDown);

    createEffect(() => {
        if (dropdown() && closeTimeout() && closeTimeoutSecondary()) {
            setTimeout(() => {
                if (closeTimeout() && closeTimeoutSecondary()) {
                    dropdown(false)
                }
            }, 3000)
        }
    })

    const activateDropdown = leading(debounce, () => {
        if (!dropdown()) { dropdown(!dropdown()) }
        closeTimeout(false)
    }, 1000)

    const clickAvatar = () => {
        dropdown(!dropdown())
        if (dropdown()) {
            closeTimeout(false)
        }
    }

    const navigate = useNavigate();

    onCleanup(() => window.removeEventListener('keydown', onKeyDown));


    return (
        <Show when={user()}>
            <div class="relative">
            <button onClick={clickAvatar} onMouseEnter={activateDropdown} onMouseLeave={() => {closeTimeout(true); console.log("mouse out")}} class={`overflow-hidden relative z-70 w-48px h-48px rounded-full hover:ring-4px hover:ring-blue/70 ${dropdown() ? "ring-4px border-blue/70" : ""}`}>
                <HashAvatar name={user()!.id} width={48} height={48} radius={14} />
            </button>
            <Show when={dropdown()}>
                <div onMouseEnter={() => closeTimeoutSecondary(true)} onClick={() => dropdown(false)} class="fixed z-50 top-0 left-0 w-screen h-screen bg-none"></div>
                <div onMouseEnter={() => closeTimeoutSecondary(false)} class="flex flex-col  animated elevation-10 animated-slide-in-right animated-duration-400 shadow-op-30 absolute right-0px top-86px bg-white w-284px h-auto rounded-8px z-50">
                    <div class="color-blue font-mono text-0.9rem p-20px">{user().email}</div>
                    <button onClick={()=> navigate("/space/create", {replace: true})} class="hover:bg-dark/10 elevation-4 shadow-op-20 py-16px pl-28px text-left w-full group"><div class="i-carbon:dashboard color-teal hover:color-text text-1.7rem -translate-y-px -translate-x-8px" /><span class="hover:color-teal/80">Dashboard</span> </button>
                    <button onClick={async () => await auth.signOut()} class="hover:bg-dark/10 elevation-4 shadow-op-20 py-16px pl-28px w-full text-left mb-2px"><div class="i-clarity:logout-solid color-red  hover:color-text text-1.7rem -translate-y-px -translate-x-8px" /><span class="hover:color-red/80">Log Out</span></button>
                </div>
            </Show>
            </div>
        </Show>
    )
}

export default DropdownAvatar;