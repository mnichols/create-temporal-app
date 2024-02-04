<script>
    import TwoColumn from "$lib/components/layouts/TwoColumn.svelte";
</script>

<TwoColumn>
    <div slot='left-col'>LEFT COL</div>

    <div slot='main'>
        <slot/>
    </div>
    <div slot='footer'/>
</TwoColumn>
