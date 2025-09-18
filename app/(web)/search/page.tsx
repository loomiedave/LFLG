// app/search/page.tsx
import { Suspense } from "react";
import SearchContent from "./SearchContent";
import Loading from "@/components/ui/Loading";

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchContent />
    </Suspense>
  );
}
