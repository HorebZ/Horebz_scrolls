<script lang="ts">
    import { theme } from '$lib/stores/theme.svelte';
    import onRingLight from '$lib/assets/on-ring-light.svg';
    import onRingDark from '$lib/assets/on-ring-dark.svg';

    function toggle() {
        theme.toggle();
    }
</script>

<button
    onclick={toggle}
    class="relative p-2 rounded-full hover:bg-surface-elevated transition-colors duration-200"
    aria-label="Changer de thème"
>
    {#if theme.current === 'dark'}
        <img src={onRingLight} alt="On ring light" width="20" height="20" />
    {:else}
        <img src={onRingDark} alt="On ring dark" width="20" height="20" />
    {/if}
</button>
