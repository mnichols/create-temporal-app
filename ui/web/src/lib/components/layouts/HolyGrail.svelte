<div class="grid grid-rows-6 grid-cols-12 gap-2 h-screen bg-gray-100">
    <header class="row-auto col-span-12 bg-gray-300">
        <slot name='header'/>
        Header...
    </header>

    <nav class="col-span-2 bg-gray-400 row-span-4">
        <slot name='left-col'/>
        <!-- Navigation -->
        Nav...
    </nav>

    <main class="col-span-7 bg-gray-500 row-span-4">
        <!-- Main content -->
        <slot name='main'/>
        Main...
        Main...

    </main>

    <aside class="col-span-3 bg-gray-600 row-span-4">
        <slot name='right-col'/>
        <!-- Sidebar / Ads -->
        Aside...
    </aside>

    <footer class="row-auto col-span-12 bg-gray-300">
        <slot name='footer'/>
        <!-- Footer content -->
        Footer...
    </footer>
</div>