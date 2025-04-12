import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { PlayerProvider } from "./context/PlayerContext";
import { ThemeProvider } from "./context/ThemeContext";
import NotFound from "@/pages/not-found";

// New pages
import NowPlaying from "@/pages/NowPlaying";
import Songs from "@/pages/Songs";
import Albums from "@/pages/Albums";
import AlbumDetail from "@/pages/AlbumDetail";
import Favorites from "@/pages/Favorites";

function Router() {
  return (
    <Switch>
      <Route path="/" component={NowPlaying} />
      <Route path="/songs" component={Songs} />
      <Route path="/albums" component={Albums} />
      <Route path="/album/:id" component={AlbumDetail} />
      <Route path="/favorites" component={Favorites} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PlayerProvider>
          <Router />
          <Toaster />
        </PlayerProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
