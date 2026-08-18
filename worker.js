export default {
  async fetch(request, env) {
    // Serve the static Next.js export (out/) via the Assets binding.
    // This main replaces the default "Hello World" handler that was
    // shadowing the static assets and answering every route.
    return env.ASSETS.fetch(request);
  }
};
