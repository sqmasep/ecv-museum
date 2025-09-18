import TransitionLink from "@/components/animations/TransitionLink";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <span className="text-4xl">:(</span>
      <span className="text-9xl font-bold text-zinc-900">404</span>
      <span>Page not found</span>
      <Button asChild>
        <TransitionLink href="/paintings">See all paintings</TransitionLink>
      </Button>
    </div>
  );
}
